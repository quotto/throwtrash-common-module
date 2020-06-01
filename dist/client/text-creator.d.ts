import { TrashTypeValue, TrashData } from "../index";
import { TrashDataText } from "../client";
export declare class TextCreator {
    private locale;
    private localeText;
    private commonText;
    /**
     *
     * @param {string} locale  デバイスから取得できるロケール情報
     */
    constructor(locale: string);
    createTrashMessageBody(trash_items: TrashTypeValue[]): string;
    /**
     * 今日出せるゴミをテキスト化する
     * @param {Array<object>} trash_items typeとnameを要素に持つJSONオブジェクトの配列
     * @return {string} レスポンスに格納するテキスト
     */
    getLaunchResponse(trash_items: TrashTypeValue[]): string;
    getPointdayResponse(target_day: string, trash_items: TrashTypeValue[]): string;
    getDayByTrashTypeMessage(slot_value: TrashTypeValue, target_trash: {
        key: string;
        recent: Date;
    }[]): string;
    get all_schedule(): string;
    get launch_reprompt(): string;
    get require_account_link(): string;
    get ask_point_day(): string;
    get ask_trash_type(): string;
    get help(): string;
    get goodbye(): string;
    get next_previous(): string;
    get require_reminder_permission(): string;
    get ask_reminder_week(): string;
    get ask_reminder_time(): string;
    get finish_set_remind(): string;
    get general_error(): string;
    get id_not_found_error(): string;
    get thanks(): string;
    get already(): string;
    get reprompt(): string;
    get cancel(): string;
    get ok(): string;
    get upsell(): string;
    get reminder_cancel(): string;
    get unknown_error(): string;
    getReminderConfirm(week_type: string, time: string): string;
    getReminderComplete(week_type: string, time: string): string;
    getTrashName(trash_type: string): string;
    getAllSchedule(trashes: TrashData[]): TrashDataText[];
    get registerd_card_title(): string;
    getRegisterdContentForCard(schedule_data: TrashDataText[]): string;
}
