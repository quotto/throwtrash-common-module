import moment = require('moment-timezone');
import {encode,decode} from '@msgpack/msgpack';
import rp = require('request-promise');
import {RecentTrashDate,CompareResult} from "../client";
import {DBAdapter} from "./db-adapter";
import {TextCreator} from "./text-creator";
import {TrashSchedule,TrashData,TrashTypeValue,EvweekValue,getLogger, ExcludeDate} from "../index"
import {LocaleText} from "./template_text/locale-text"
const logger = getLogger();

export interface GetTrashDataResult {
    status: string,
    response?: TrashData[],
    msgId?: keyof LocaleText
}

export class TrashScheduleService {
    private dbAdapter: DBAdapter;
    private timezone: string;
    private textCreator: TextCreator;
    constructor(_timezone:string, _text_creator: TextCreator, _dbAdapter: DBAdapter){
        this.timezone = _timezone || 'utc';
        this.textCreator = _text_creator;
        this.dbAdapter = _dbAdapter;
    }

    /**
     * access_tokenが一致するゴミ出し予定を取得する
     * @param access_token アクセストークン
     * @returns 全ゴミ出し予定とエラーがあった場合のステータスコードおよびメッセージID
     */
    async getTrashData(access_token: string):Promise<GetTrashDataResult> {
        try {
            let user_id:string = access_token;
            // 非互換用のチェック条件,access_tokenが36桁の場合はuser_idとみなして直接TrashScheduleを検索する
            if(access_token.length != 36) {
                user_id = await this.dbAdapter.getUserIDByAccessToken(access_token);
            }

            if(user_id) {
                const scheduleData: TrashData[] = await this.dbAdapter.getTrashSchedule(user_id);
                if (scheduleData && scheduleData.length > 0) {
                    return {
                        status: 'success',
                        response: scheduleData
                    };
                }
            }
            logger.error(`User Not Found(AccessToken: ${access_token})`);
            return {
                status: 'error',
                msgId: "ERROR_ID_NOT_FOUND"
            };
        } catch(err) {
            logger.error(err);
            return {
                    status:'error',
                    msgId: "ERROR_GENERAL"
            };
        }
    }

   /**
    * 引数で指定されたn日後を示すDateインスタンスを返す。
    * このインスタンスはgetXXXが返す値rユーザーロケールとなるようにオフセットが設定される。
    * @param target_day 今日を基準としたn日後を示す。0なら今日、1なら明日……という感じ
    * @returns Dateインスタンス
    */
    calculateLocalTime(target_day: number): Date {
        logger.debug(`Timezone: ${this.timezone}`)
        const utcTime:number = Date.now(); //UTC時刻
        logger.debug(`utctime: ${utcTime}`)
        const timeZoneMoment = moment.tz.zone(this.timezone);
        if(timeZoneMoment) {
            const localeoffset:number = timeZoneMoment.utcOffset(utcTime);
            // UTCからこのプログラムが稼働するコンピュータ時刻のオフセットを差し引き（オフセットはUTC+ ならマイナス, UTC- ならプラス）、求めたいロケール（ユーザーのロケール）のオフセットを追加することで、new Date(localtime)でのgetXX系がすべてユーザーロケールでの状態になる
            const localtime:number = utcTime + (new Date().getTimezoneOffset() * 60 * 1000) + ((-1 * localeoffset) * 60 * 1000) + (60 * 24 * 60 * 1000 * target_day);
            logger.debug(`LocaleTime: ${localtime}`)
            return new Date(localtime);
        }
        throw new Error("calculateLocalTime Failed -> timeZoneMoment is null");
    }

   /**
    * 指定された曜日が現時点から何日後かを返す
    * @param target_weekday 対象の曜日
    * @returns 対象曜日が今日から何日後かを示す値
    */
    getTargetDayByWeekday(target_weekday: number): number {
        const dt:Date = this.calculateLocalTime(0);
        const now_weekday:number = dt.getDay();
        let target_day = target_weekday - now_weekday;
        //1より小さい場合は翌週分
        if(target_day < 1) {
            target_day += 7;
        }
        return target_day;
    }

    /**
     * 指定された日付で指定されたゴミが出せるかをチェックする
     * @param trash 対象のゴミ
     * @param dt 指定日
     * @returns ゴミ出し可能ならゴミの名称を,不可能ならundefinedを返す
     */
    async getEnableTrashData(trash: TrashData,dt:Date): Promise<TrashTypeValue | undefined> {
        const trash_name: string = trash.type ==='other' && trash.trash_val ? trash.trash_val : this.textCreator.getTrashName(trash.type);
        const trash_data:TrashTypeValue = {
            type: trash.type,
            name: trash_name
        };

        const check = (schedule: {type: string, value: string | EvweekValue}): boolean =>{
            // 例外日に設定されているならゴミ出しは不可能
            // (excludesがundefinedの場合everyが失敗するため、someの否定で判定する)
            if(!trash.excludes?.some(exclude=>exclude.month === dt.getMonth()+1 && exclude.date === dt.getDate())) {
                if(schedule.type === 'weekday') {
                    // 毎週
                    return Number(schedule.value) === dt.getDay();
                } else if(schedule.type === 'biweek') {
                    // 第x○曜日
                    const matches: RegExpMatchArray | null = (schedule.value as string).match(/(\d)-(\d)/);
                    if(matches) {
                        const weekday = Number(matches[1]);
                        const turn = Number(matches[2]);

                        // 現在何週目かを求める
                        let nowturn = 0;
                        let targetdate:number = dt.getDate();
                        while (targetdate > 0) {
                            nowturn += 1;
                            targetdate -= 7;
                        }

                        return weekday === dt.getDay() && turn === nowturn;
                    }
                } else if(schedule.type === 'month') {
                    // 毎月何日 
                    return dt.getDate() === Number(schedule.value);
                } else if(schedule.type === 'evweek') {
                    // 隔週
                    const schedule_value: EvweekValue = schedule.value as EvweekValue;
                    // インターバルの設定がない場合はデフォルト2（週）で算出する
                    schedule_value.interval = schedule_value.interval || 2;
                    if(Number(schedule_value.weekday) === dt.getDay()) {
                        const start_dt:Date = new Date(schedule_value.start);
                        start_dt.setHours(0);
                        start_dt.setMinutes(0);
                        start_dt.setSeconds(0);
                        start_dt.setMilliseconds(0);

                        // 今週の日曜日を求める
                        const current_dt:Date = new Date(dt.toISOString());
                        current_dt.setHours(0);
                        current_dt.setMinutes(0);
                        current_dt.setSeconds(0);
                        current_dt.setMilliseconds(0);
                        current_dt.setDate(current_dt.getDate() - current_dt.getDay());

                        // 登録されている日付からの経過日数を求める
                        const past_date = (current_dt.getTime() - start_dt.getTime()) / 1000 / 60 / 60 / 24;

                        // 差が0またはあまりが0であれば隔週に該当
                        // trash_data.schedule = [];
                        return past_date === 0 || (past_date / 7) % schedule_value.interval === 0;
                    }
                }
            }
            return false;
        }
        if(trash.schedules.some(check)) {
            // 一つでもゴミ捨て可能なスケジュールがあればそのゴミ（typeとname）を返す
            return trash_data;
        }
        return undefined;
    }

    /**
     * 全ゴミ出しデータの中から指定された日にちにゴミ捨て可能な一覧を返す
     * @param trashes 全ゴミ出しデータ
     * @param target_day 指定日、現在日からのn日を指す
     * @returns その日にゴミ出し可能なゴミの名称一覧
     */
    async checkEnableTrashes(trashes: Array<TrashData>, target_day: number): Promise<Array<TrashTypeValue>> {
        const dt = this.calculateLocalTime(target_day);
        const promise_list: Promise<TrashTypeValue | undefined>[] = [];
        trashes.forEach((trash) => {
            promise_list.push(
                this.getEnableTrashData(trash,dt)
            );
        });
        const result:Array<TrashTypeValue | undefined> = await Promise.all(promise_list);
        logger.debug('CheckEnableTrashes result:'+JSON.stringify(result));
        // 同名のゴミがあった場合に重複を排除する
        const keys: string[] = [];

        // undefinedはfilter内で除外するためTrashTypeValue[]としてreturnする
        return result.filter((value: TrashTypeValue | undefined) =>{
            // key配列に存在しない場合のみkeyを追加
            if(value && keys.indexOf(value.type + value.name) < 0) {
                const key: string = value.type+value.name;
                keys.push(key);
                return true;
            }
            return false;
        }) as TrashTypeValue[];
    }

    /**
     * スケジュールの種類と値に従い今日から最も近い日にちを返す。
     * @param {Date} today タイムゾーンを考慮した今日の日付
     * @param {String} schedule_type スケジュールの種類
     * @param {String} schedule_val スケジュールの値
     * @returns {Date} 条件に合致する直近の日にち
     */
    calculateNextDateBySchedule(today: Date, schedule_type: string, schedule_val: string | EvweekValue, excludes: ExcludeDate[]): Date {
        const recently_dt: Date = new Date(today.getTime());
        if(schedule_type === 'weekday') {
            const exclude_check = (today_dt: Date) => {
                const diff_day: number = Number(schedule_val) - today_dt.getDay();
                const next_date = diff_day < 0 ? today_dt.getDate() + (7 + diff_day) : today_dt.getDate() + diff_day;
                recently_dt.setDate(next_date);
                if(excludes.some(exclude=>recently_dt.getMonth()+1===exclude.month && recently_dt.getDate()===exclude.date)) {
                    // 例外日に該当した場合は算出した日付を1日進めてそこを基準に再起処理する
                    recently_dt.setDate(next_date+1);
                    exclude_check(recently_dt);
                }
            }
             exclude_check(recently_dt);
        } else if (schedule_type === 'month') {
            const exclude_check = (today_dt: Date) => {
                // スケジュールと現在の日にちの差分を取る
                const diff_date = Number(schedule_val) - today_dt.getDate();
                if(diff_date < 0) {
                    // 現在日>設定日の場合は翌月の1日をセットする
                    recently_dt.setMonth(recently_dt.getMonth() + 1);
                    recently_dt.setDate(1);
                } else {
                    // 現在日<設定日の場合は差分の分だけ日にちを進める
                    recently_dt.setDate(recently_dt.getDate() + diff_date);
                }
                if(excludes.some(exclude=>recently_dt.getMonth()+1===exclude.month && recently_dt.getDate()===exclude.date)) {
                    recently_dt.setMonth(recently_dt.getMonth()+1);
                    exclude_check(recently_dt);
                }
            }
            exclude_check(recently_dt);
        } else if(schedule_type === 'biweek') {
            // 設定値
            const matches: RegExpMatchArray | null = (schedule_val as string).match(/(\d)-(\d)/);
            if(matches) {
                const exclude_check = (today_dt: Date) => {
                    const weekday = Number(matches[1]);
                    const turn = Number(matches[2]);

                    // 直近の同じ曜日の日にちを設定
                    const diff_day = weekday - today_dt.getDay();
                    diff_day < 0 ? recently_dt.setDate(today_dt.getDate() + (7 + diff_day)) : recently_dt.setDate(today_dt.getDate() + diff_day);

                    // 何週目かを求める
                    let nowturn = 0;
                    let targetdate: number = recently_dt.getDate();
                    while(targetdate > 0) {
                        nowturn += 1;
                        targetdate -= 7;
                    }

                    let current_month: number = recently_dt.getMonth();
                    while(turn != nowturn) {
                        recently_dt.setDate(recently_dt.getDate()+7);
                        if(current_month != recently_dt.getMonth()) {
                            nowturn = 1;
                            current_month = recently_dt.getMonth();
                        } else {
                            nowturn += 1;
                        }
                    }
                    if(excludes.some(exclude=>recently_dt.getMonth()+1===exclude.month && recently_dt.getDate()===exclude.date)) {
                        // 例外日指定されていたら算出した日付の翌月1日に設定してそこを基準に再起処理する
                        recently_dt.setMonth(recently_dt.getMonth()+1);
                        recently_dt.setDate(1);
                        exclude_check(recently_dt);
                    }
                }
                exclude_check(recently_dt);
            }
        } else if(schedule_type === 'evweek') {
            const evweek_val: EvweekValue = schedule_val as EvweekValue;
            // インターバルが設定されていないデータが存在するためその場合は2に置き換える
            const interval = evweek_val.interval || 2;

            const start_dt: Date = new Date(evweek_val.start);
            start_dt.setHours(0);
            start_dt.setMinutes(0);
            start_dt.setSeconds(0);
            start_dt.setMilliseconds(0);

            const exclude_check = (today_dt: Date) => {
                // 直近の同じ曜日の日にちを設定する
                const diff_date: number = Number(evweek_val.weekday) - today_dt.getDay();
                diff_date < 0 ? recently_dt.setDate(today_dt.getDate() + (7 + diff_date)) : recently_dt.setDate(today_dt.getDate() + diff_date);

                // 直近の同じ曜日の日にちの日曜日を取得
                const recently_sunday_dt: Date = new Date(recently_dt.getTime());
                recently_sunday_dt.setHours(0);
                recently_sunday_dt.setMinutes(0);
                recently_sunday_dt.setSeconds(0);
                recently_sunday_dt.setMilliseconds(0);
                recently_sunday_dt.setDate(recently_sunday_dt.getDate() - recently_sunday_dt.getDay());

                // 登録されている日付からの経過日数を求める
                // 開始日＞判定対象日の場合を考慮して経過日数は絶対値に変換する
                // (経過日数はこの後の日にちを進める週数判定に利用するため、経過日数がマイナスだと計算結果が誤りとなるため)
                const past_date: number = Math.abs(
                    (recently_sunday_dt.getTime() - start_dt.getTime()) / 1000 / 60 / 60 / 24
                );

                // 経過日数≠0かつ開始日からの経過日数/インターバルの余りが≠0であれば直近の同じ曜日は該当週ではないので、そこからインターバル分日にちを進める
                const mod_of_interval = (past_date / 7) % interval;
                if(past_date != 0 && mod_of_interval != 0) {
                    recently_dt.setDate(recently_dt.getDate()+(7*(interval-mod_of_interval)));
                }
                if(excludes.some(exclude=>recently_dt.getMonth()+1===exclude.month && recently_dt.getDate()===exclude.date)) {
                    // 例外日指定されていたら算出した日付を1日進めてそこを基準委再起処理する
                    recently_dt.setDate(recently_dt.getDate()+1);
                    exclude_check(recently_dt);
                }
            }
            exclude_check(recently_dt);
        }
        return recently_dt;
    }

    /*
    指定したごみの種類から直近のゴミ捨て日を求める
    trashes: DynamoDBから取得したJSON形式のパラメータ
    target_type: ごみの種類
    */
   /**
    * 指定したごみの種類から直近のゴミ捨て日を求める。
    * trashesの中に同一のゴミ（typeが同じ）があれば一つにまとめる。ただしtypeがotherの場合のみゴミの名前（trash_val）で区別するため、戻り値のkeyは複数になる可能性がある。
    * @param {Array} trashes DynamoDBから取得した登録済みごみ出し予定
    * @param {string}} target_type 検索するゴミの種類
    * @returns {object} target_typeで指定されたゴミの直近の予定日プロパティ。{key:ゴミの種類,schedules:登録されているごみ出し予定,list:登録スケジュールから算出した直近の予定日,recent: listの中で最も近い日}
    */
    getDayByTrashType(trashes: Array<TrashData>, target_type: string): RecentTrashDate[] {
        logger.debug('getDayByTrashType'+JSON.stringify(trashes)+',type:'+target_type);
        const match_dates: RecentTrashDate[] = [];
        trashes.forEach((trash)=>{
            if(trash.type === target_type) {
                const key: string = trash.type === 'other' && trash.trash_val ? trash.trash_val : trash.type;

                // 配列にkeyが存在しなければ初期状態で追加
                if(match_dates.filter((recentTrashData)=>{recentTrashData.key === key}).length === 0) {
                    // schedules:登録されているスケジュール,list:登録スケジュールに対応する直近の日にち,recent:listのうち最も近い日にち
                    match_dates.push({
                        key: key,
                        schedules: trash.schedules,
                        excludes: trash.excludes? trash.excludes : [],
                        list: [],
                        recent: new Date() // 最終的には直近のゴミ出し日が入るので初期値は何でも良い
                    });
                }
            }
        });

        const today_dt = this.calculateLocalTime(0);
        match_dates.forEach((recentTrashData)=>{
            let recently = new Date('9999/12/31');
            recentTrashData.schedules.forEach((schedule: TrashSchedule)=>{
                const next_dt: Date = this.calculateNextDateBySchedule(today_dt,schedule.type,schedule.value,recentTrashData.excludes);
                if(recently.getTime() > next_dt.getTime()) {
                    recently =  new Date(next_dt.getTime());
                }
                recentTrashData.list.push(next_dt);
            });
            recentTrashData.recent = recently;
        });
        logger.debug('GetDayFromTrashType result:');
        logger.debug(JSON.stringify(match_dates,null,2));
        return match_dates;
    }

    /**
     * 
     * @param {Number} target_week  0:今週, 1:来週
     * @returns {Array} {target_day: オブジェクト配列
     */
    async getRemindBody(target_week: number, trash_data: Array<TrashData>) {
        const result_list: {target_day: number, body: any}[] = [];
        const today_dt: Date = this.calculateLocalTime(0);
        const weekNum: number = today_dt.getDay()
        if(target_week === 0) {
            // 今週の場合は明日以降の土曜日までの日にちを算出する
            for(let i=0; i<(6 - weekNum); i++) {
                const target_day: number = i+1;
                const result: Array<TrashTypeValue | undefined> = await this.checkEnableTrashes(trash_data, target_day)
                result_list.push({
                    target_day: target_day,
                    body: result
                });
            }
        } else if(target_week === 1) {
            const padding_date: number = 7 - weekNum;
            // 来週の場合は次の日曜日を求める
            for(let i=0; i<7; i++) {
                const target_day: number = i+padding_date
                const result: Array<TrashTypeValue | undefined> = await this.checkEnableTrashes(trash_data, target_day);
                result_list.push({
                    target_day:  target_day,
                    body: result
                });
            }
        }
        return result_list;
    }

    async compareTwoText(text1: string, text2: string): Promise<CompareResult> {
        if(text1 && text2) {
            const option = {
                uri: process.env.MecabAPI_URL + '/compare',
                qs: {
                    word1: text1,
                    word2: text2
                },
                encoding: null
            };
            logger.info('Compare option:'+JSON.stringify(option));
            return rp(option).then((response: any) => {
                return decode(response) as CompareResult;
            }).catch((err: any) => {
                logger.error(err);
                throw err;
            });
        }
        logger.error(`Compare invalid parameter:${text1},${text2}`);
        return Promise.reject('err');
    }
}