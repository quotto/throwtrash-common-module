import { RecentTrashDate } from "../client";
import { DBAdapter } from "./db-adapter";
import { TextCreator } from "./text-creator";
import { TrashData, TrashTypeValue, EvweekValue } from "../index";
export declare class TrashScheduleService {
    private dbAdapter;
    private timezone;
    private textCreator;
    constructor(_timezone: string, _text_creator: TextCreator, _dbAdapter: DBAdapter);
    /**
    access_token: アクセストークン
    target_day: 0:今日,1:明日
    **/
    getTrashData(access_token: string): Promise<{
        status: string;
        response: TrashData[];
        msgId?: undefined;
    } | {
        status: string;
        msgId: string;
        response?: undefined;
    }>;
    /**
    target_day: 対象とする日を特定するための値。0なら今日、1なら明日……となる。
    **/
    calculateLocalTime(target_day: number): Date;
    /**
     * 計算対象日を求める
     * 指定された曜日が現時点から何日後かを返す
    **/
    getTargetDayByWeekday(target_weekday: number): number;
    getEnableTrashData(trash: TrashData, dt: Date): Promise<TrashTypeValue | undefined>;
    /**
    trashes:   DynamoDBから取得したJSON形式のパラメータ。
    target_day: チェックするn日目。0なら今日、1なら明日......
    **/
    checkEnableTrashes(trashes: Array<TrashData>, target_day: number): Promise<Array<TrashTypeValue>>;
    /**
     * スケジュールの種類と値に従い今日から最も近い 日にちを返す。
     * @param {Date} today タイムゾーンを考慮した今日の日付
     * @param {String} schedule_type スケジュールの種類
     * @param {String} schedule_val スケジュールの値
     * @returns {Date} 条件に合致する直近の日にち
     */
    calculateNextDateBySchedule(today: Date, schedule_type: string, schedule_val: string | EvweekValue): Date;
    /**
     * 指定したごみの種類から直近のゴミ捨て日を求める。
     * trashesの中に同一のゴミ（typeが同じ）があれば一つにまとめる。ただしtypeがotherの場合のみゴミの名前（trash_val）で区別するため、戻り値のkeyは複数になる可能性がある。
     * @param {Array} trashes DynamoDBから取得した登録済みごみ出し予定
     * @param {string}} target_type 検索するゴミの種類
     * @returns {object} target_typeで指定されたゴミの直近の予定日プロパティ。{key:ゴミの種類,schedules:登録されているごみ出し予定,list:登録スケジュールから算出した直近の予定日,recent: listの中で最も近い日}
     */
    getDayByTrashType(trashes: Array<TrashData>, target_type: string): RecentTrashDate[];
    /**
     *
     * @param {Number} target_week  0:今週, 1:来週
     * @returns {Array} {target_day: オブジェクト配列
     */
    getRemindBody(target_week: number, trash_data: Array<TrashData>): Promise<{
        target_day: number;
        body: any;
    }[]>;
    compareTwoText(text1: string, text2: string): Promise<number>;
}
