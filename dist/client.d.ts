import { TrashSchedule } from "./index";
import { TrashScheduleService, GetTrashDataResult } from "./client/trash-schedule-service";
import { DBAdapter } from "./client/db-adapter";
import { TextCreator } from "./client/text-creator";
interface TrashDataText {
    type: string;
    typeText: string;
    schedules: string[];
}
interface RecentTrashDate {
    key: string;
    schedules: TrashSchedule[];
    list: Date[];
    recent: Date;
}
interface CompareResult {
    score: Number;
    match: String;
}
export { TrashScheduleService, TrashDataText, CompareResult, RecentTrashDate, DBAdapter, TextCreator, GetTrashDataResult };
