import type {TrashTypeValue,TrashData,EvweekValue} from "../types.js";

const enUSWordData = {
  "trashname": {
    "burn": "Combustible",
    "unburn": "Incombustible",
    "resource": "Recyclable",
    "plastic": "plastic",
    "can": "Can",
    "bin": "Bin",
    "petbottle": "plastic bottle",
    "paper": "Paper"
  },
  "weekday": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  "month": ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  "pointday": {
    "today": "Today",
    "tomorrow": "Tomorrow",
    "day after tomorrow": "Day after tomorrow",
    "next week": "Next week"
  },
  "schedule": {
    "weekday": "Every %s",
    "biweek": "%s-%s",
    "month": "%s-th",
    "evweek": "Every %s weeks %s"
  }
};

const enUSTextData = {
  "ERROR_GENERAL": "Failed to get the information. Please contact the developer.",
  "ERROR_ID_NOT_FOUND": "User ID not found. Please log in again.",
  "ERROR_UNKNOWN": "Unknown error has occurred.",
  "HELP_ACCOUNT": "We help you to check your trash day with Amazon Alexa. To use this skill, please register your garbage collection schedule first. After registering, you can ask us \"What's the trash today?\" or \"When is the next plastic garbage day?\". For more information, please check the card in Alexa app.",
  "HELP_DESCRIBE": "We help you to check your trash day with Amazon Alexa.",
  "HELP_BYE": "Bye bye!",
  "HELP_NEXT_PREVIOUS": "You can say \"Next\" to the next help, or \"Stop\" to exit the help.",
  "NOTICE_CONTINUE": "Please say \"Next\" to hear the next.",
  "ASK_A_DAY": "Do you want me to tell you what trash is available on a specific day? If so, please specify the day.",
  "NOTICE_SEND_SCHEDULE": "I'll send you a list of your scheduled trash days.",
  "NOTICE_NOT_CORRESPOND": "The trash you are asking for is not in your registered list. I'll try to find the most similar one for you.",
  "ANSWER_LAUNCH": "Today's trash is %s.",
  "ANSWER_NOTHING": "Today there is no trash.",
  "ANSWER_A_DAY": "%s's trash is %s2.",
  "ANSWER_NOTHING_A_DAY": "%s there is no trash.",
  "ANSWER_BY_TRASH": "Next trash day is %s.",
  "ANSWER_A_TRASH": "%s1 is %s2",
  "ANSWER_DATE": "%m %d, %w",
  "ANSWER_NOTHING_TRASH": "The %s is not registered.",
  "REMINDER_PERMISSION": "To remind the trash day, we need your permission to send notifications. Would you like to receive reminders?",
  "REMINDER_WEEK": "Which day of the week would you like to be notified?",
  "REMINDER_TIME": "What time would you like to be reminded?",
  "REMINDER_COMPLETE": "I've set a reminder for trash day.",
  "REMINDER_CONFIRM": "You'll be reminded %s1 at %s2. Is that okay?",
  "REMINDER_DEFINE": "I'll remind you %s1 at %s2.",
  "REMINDER_CANCEL": "I've canceled your reminder setting.",
  "CARD_TITLE": "Your trash schedule",
  "PURCHASE_THANKS": "Thank you for your purchase! Would you like to listen to your trash collection schedule?",
  "PURCHASE_ALREADY_PURCHASED": "You've already purchased this product! We appreciate your support.",
  "PURCHASE_REPROMPT": "Would you like to make a purchase? Please answer with yes or no.",
  "PURCHASE_CANCEL": "Purchase has been canceled.",
  "PURCHASE_OK": "It seems like you're interested in purchasing! I'll proceed with the purchase process.",
  "PURCHASE_UPSELL": "Would you like to unlock the premium features such as reminders and notifications?",
  "SEPARATOR": ", ",
  "CHECK_MULTIPLE": true,
  "END_SEP": " and "
};

const jaJPWordData = {
  "trashname": {
    "burn": "もえるゴミ",
    "unburn": "もえないゴミ",
    "resource": "資源ゴミ",
    "plastic": "プラスチック",
    "can": "カン",
    "bin": "ビン",
    "petbottle": "ペットボトル",
    "paper": "古紙"
  },
  "weekday": ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
  "pointday": {
    "today": "今日",
    "tomorrow": "明日",
    "day after tomorrow": "明後日",
    "next week": "来週"
  },
  "schedule": {
    "weekday": "毎週%s",
    "biweek": "第%s1%s2",
    "month": "毎月%s日",
    "evweek": "%s2週に1度の%s1"
  }
};

const jaJPTextData = {
  "ERROR_GENERAL": "情報の取得に失敗しました。開発者にお問い合わせください。",
  "ERROR_ID_NOT_FOUND": "ユーザーIDが見つかりません。再度ログインしてください。",
  "ERROR_UNKNOWN": "不明なエラーが発生しました。",
  "HELP_ACCOUNT": "Alexaでごみの日を簡単に確認できます。スキルをご利用になるには、まずごみの収集スケジュールを登録してください。登録後は「今日のごみは何」「次のプラスチックごみの日はいつ」などと質問できます。詳しくはAlexaアプリのカードを確認してください。",
  "HELP_DESCRIBE": "私はAlexaであなたのゴミ出し日を確認するお手伝いをします。",
  "HELP_BYE": "さようなら！",
  "HELP_NEXT_PREVIOUS": "「次へ」と言うと次のヘルプを聞けます。「ストップ」と言うとヘルプを終了します。",
  "NOTICE_CONTINUE": "続きを聞くには「次へ」と言ってください。",
  "ASK_A_DAY": "特定の日のゴミを知りたい場合は、日付を指定してください。",
  "NOTICE_SEND_SCHEDULE": "登録されているゴミ出し予定の一覧をお送りします。",
  "NOTICE_NOT_CORRESPOND": "お尋ねのごみは登録されていません。似ているごみを検索します。",
  "ANSWER_LAUNCH": "今日のゴミは%sです。",
  "ANSWER_NOTHING": "今日出せるゴミはありません。",
  "ANSWER_A_DAY": "%s1のゴミは%s2です。",
  "ANSWER_NOTHING_A_DAY": "%sに出せるゴミはありません。",
  "ANSWER_BY_TRASH": "次のゴミの日は%sです。",
  "ANSWER_A_TRASH": "%s1は%s2",
  "ANSWER_DATE": "%m月%d日（%w）",
  "ANSWER_NOTHING_TRASH": "%sの収集は登録されていません。",
  "REMINDER_PERMISSION": "ごみ出しをリマインドするには、通知を送信するための許可が必要です。リマインダーを受け取りますか？",
  "REMINDER_WEEK": "今週と来週、どちらのリマインダーを設定しますか？",
  "REMINDER_TIME": "何時に通知を受け取りたいですか？",
  "REMINDER_COMPLETE": "ごみの日のリマインダーを設定しました。",
  "REMINDER_CONFIRM": "%s1の%s2にリマインドします。よろしいですか？",
  "REMINDER_DEFINE": "%s1の%s2にリマインドします。",
  "REMINDER_CANCEL": "リマインダーの設定をキャンセルしました。",
  "CARD_TITLE": "あなたのごみ収集スケジュール",
  "PURCHASE_THANKS": "ご購入ありがとうございます！ごみ収集スケジュールを聞きますか？",
  "PURCHASE_ALREADY_PURCHASED": "既にこの商品を購入済みです！ご支援ありがとうございます。",
  "PURCHASE_REPROMPT": "購入しますか？はいかいいえでお答えください。",
  "PURCHASE_CANCEL": "購入がキャンセルされました。",
  "PURCHASE_OK": "ご購入に興味をお持ちいただき、ありがとうございます！購入手続きを進めます。",
  "PURCHASE_UPSELL": "リマインダーや通知などのプレミアム機能をご利用いただけるようにしますか？",
  "SEPARATOR": "、",
  "CHECK_MULTIPLE": true,
  "END_SEP": "と"
};

const defaultData = {
  "en-US": {
    "word": enUSWordData,
    "message": enUSTextData
  },
  "ja-JP": {
    "word": jaJPWordData,
    "message": jaJPTextData
  }
};

export type LocaleText = {
    ERROR_GENERAL:string,
    ERROR_ID_NOT_FOUND:string,
    ERROR_UNKNOWN:string,
    HELP_ACCOUNT:string,
    HELP_DESCRIBE:string,
    HELP_BYE:string,
    HELP_NEXT_PREVIOUS:string,
    NOTICE_CONTINUE:string,
    ASK_A_DAY:string,
    NOTICE_SEND_SCHEDULE:string,
    NOTICE_NOT_CORRESPOND:string,
    ANSWER_LAUNCH:string,
    ANSWER_NOTHING:string,
    ANSWER_A_DAY:string,
    ANSWER_NOTHING_A_DAY:string,
    ANSWER_BY_TRASH:string,
    ANSWER_A_TRASH:string,
    ANSWER_DATE:string,
    ANSWER_NOTHING_TRASH:string,
    REMINDER_PERMISSION:string,
    REMINDER_WEEK:string,
    REMINDER_TIME:string,
    REMINDER_COMPLETE:string,
    REMINDER_CONFIRM:string,
    REMINDER_DEFINE:string,
    REMINDER_CANCEL:string,
    CARD_TITLE:string,
    PURCHASE_THANKS:string,
    PURCHASE_ALREADY_PURCHASED:string,
    PURCHASE_REPROMPT:string,
    PURCHASE_CANCEL:string,
    PURCHASE_OK:string,
    PURCHASE_UPSELL:string,
    SEPARATOR:string,
    CHECK_MULTIPLE: boolean,
    END_SEP: string
}
export interface TrashDataText {
    type: string,
    typeText: string,
    schedules: string[]
}
type LocaleTextMap = {
    [key: string]: {
        word: unknown
        message: LocaleText,
    }
}

// この変数には常にデータが含まれる（デフォルト値か読み込んだ値）
const Text_Map: LocaleTextMap = defaultData;

const get_num_sufix = (number: number): string => {
    let suffix = "th";
    if (number === 1) {
        suffix = "st";
    } else if (number === 2) {
        suffix = "nd";
    } else if (number === 3) {
        suffix = "rd";
    }
    return String(number) + suffix;
}

export class TextCreator {
    private locale: string;
    private localeText: LocaleText;
    private commonText: any;

    /**
     *
     * @param {string} locale  デバイスから取得できるロケール情報
     */
    constructor(locale: string) {
        this.locale = locale;
        this.localeText = Text_Map[this.locale].message;
        this.commonText = Text_Map[this.locale].word;
    }

    createTrashMessageBody(trash_items: TrashTypeValue[]): string {
        const trash_name_list: string[] = [];
        trash_items.forEach((item) => {
            trash_name_list.push(
                item.type === "other" ? item.name : this.commonText.trashname[item.type]
            );
        });
        const response_trashes = trash_name_list.join(this.localeText.SEPARATOR);
        return response_trashes;
    }

    /**
     * 今日出せるゴミをテキスト化する
     * @param {Array<object>} trash_items typeとnameを要素に持つJSONオブジェクトの配列
     * @return {string} レスポンスに格納するテキスト
     */
    getLaunchResponse(trash_items: TrashTypeValue[]): string {
        if(trash_items.length === 0) {
            return this.localeText.ANSWER_NOTHING;
        } else {
            const body = this.createTrashMessageBody(trash_items);
            return this.localeText.ANSWER_LAUNCH.replace("%s", body);
        }
    }

    getPointdayResponse(target_day: string, trash_items: TrashTypeValue[]): string {
        if(trash_items.length === 0) {
            return this.localeText.ANSWER_NOTHING_A_DAY.replace("%s", this.commonText.pointday[target_day]);
        } else {
            const body = this.createTrashMessageBody(trash_items);
            return this.localeText.ANSWER_A_DAY.replace("%s1", this.commonText.pointday[target_day]).replace("%s2", body);
        }
    }

    getDayByTrashTypeMessage(slot_value: TrashTypeValue, target_trash: {key: string,recent: Date}[]): string {
        if (target_trash.length === 0) {
            return this.localeText.ANSWER_NOTHING_TRASH.replace("%s", slot_value.name);
        }
        if (slot_value.type === "other") {
            const part_text: string[] = []
            target_trash.forEach((trash) => {
                part_text.push(
                    this.localeText.ANSWER_A_TRASH.replace("%s1", trash.key)
                        .replace("%s2", this.localeText.ANSWER_DATE
                            .replace("%m", this.commonText.month ? this.commonText.month[trash.recent.getMonth()] : trash.recent.getMonth() + 1)
                            .replace("%d", trash.recent.getDate().toString())
                            .replace("%w", this.commonText.weekday[trash.recent.getDay()]
                            ))
                );
            });
            const body = part_text.join(this.localeText.SEPARATOR);
            return this.localeText.ANSWER_BY_TRASH.replace("%s", body);
        }
        else {
            return this.localeText.ANSWER_BY_TRASH.replace("%s", this.localeText.ANSWER_A_TRASH
                .replace("%s1", slot_value.name)
                .replace("%s2", this.localeText.ANSWER_DATE
                    .replace("%m", this.commonText.month ? this.commonText.month[target_trash[0].recent.getMonth()] : target_trash[0].recent.getMonth() + 1)
                    .replace("%d", target_trash[0].recent.getDate().toString())
                    .replace("%w", this.commonText.weekday[target_trash[0].recent.getDay()])
                ));
        }
    }

    getMessage(message_id: keyof LocaleText): string {
        return this.localeText[message_id] as string;
    }

    getReminderConfirm(week_type: string, time: string): string {
        return this.localeText.REMINDER_CONFIRM.replace("%s1", week_type).replace("%s2", time);
    }

    getReminderComplete(week_type: string, time: string): string {
        return this.localeText.REMINDER_DEFINE.replace("%s1", week_type).replace("%s2", time);
    }

    getTrashName(trash_type: string): string {
        return this.commonText.trashname[trash_type];
    }

    /*
    全てのゴミ出し予定を整形された文書データで返す
    trashes: DynamoDBから取得したJSON形式のパラメータ
    */
    getAllSchedule(trashes: TrashData[]): TrashDataText[] {
        const return_data: TrashDataText[] = [];
        trashes.forEach((trash)=>{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const trash_data: any = {};
            trash_data.type = trash.type;
            trash_data.typeText = trash.type != "other" ? this.getTrashName(trash.type) : trash.trash_val;

            trash_data.schedules = [];
            trash.schedules.forEach((schedule)=>{
                if(schedule.type == "weekday") {
                    const scheduleValue: string = schedule.value as string;
                    trash_data.schedules.push(`${this.commonText.schedule.weekday.replace("%s",this.commonText.weekday[scheduleValue])}`);
                } else if(schedule.type == "biweek") {
                    const scheduleValue: string = schedule.value as string;
                    const matches: RegExpMatchArray | null = scheduleValue.match(/(\d)-(\d)/);
                    if(matches) {
                        const weekday = matches[1];
                        const turn: string = this.locale === "en-US" ? get_num_sufix(Number(matches[2])) : matches[2];
                        trash_data.schedules.push(this.commonText.schedule.biweek.replace("%s1",turn).replace("%s2",this.commonText.weekday[weekday]));
                    }
                } else if(schedule.type == "month") {
                    const scheduleValue: string = schedule.value as string;
                    const day = this.locale === "en-US" ? get_num_sufix(Number(scheduleValue)) : scheduleValue;
                    trash_data.schedules.push(`${this.commonText.schedule.month.replace("%s",day)}`);
                } else if(schedule.type == "evweek") {
                    const scheduleValue: EvweekValue = schedule.value as EvweekValue;
                    trash_data.schedules.push(`${this.commonText.schedule.evweek.replace("%s1",this.commonText.weekday[scheduleValue.weekday]).replace("%s2",scheduleValue.interval)}`);
                }
            });
            return_data.push(trash_data);
        });
        return return_data;
    }

    get registerd_card_title(): string {
        return this.localeText.CARD_TITLE;
    }

    getRegisterdContentForCard(schedule_data: TrashDataText[]): string {
        let card_text = "";
        schedule_data.forEach((data) => {
            card_text += `${data.typeText}: ${data.schedules.join(this.localeText.SEPARATOR)}\n`;
        });
        return card_text;
    }
}