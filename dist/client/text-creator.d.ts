import { TrashTypeValue, TrashData } from "../index";
import { TrashDataText } from "../client";
import { LocaleText } from "./template_text/locale-text";
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
    getMessage(message_id: keyof LocaleText): string;
    getReminderConfirm(week_type: string, time: string): string;
    getReminderComplete(week_type: string, time: string): string;
    getTrashName(trash_type: string): string;
    getAllSchedule(trashes: TrashData[]): TrashDataText[];
    get registerd_card_title(): string;
    getRegisterdContentForCard(schedule_data: TrashDataText[]): string;
}
