import type { ExcludeDate, ScheduleValue } from "../types.mjs";
import { DBAdapter } from "./db-adapter.mjs";
interface RecentTrashDate {
    key: string;
    schedules: ScheduleValue[];
    excludes: ExcludeDate[];
    list: Date[];
    recent: Date;
}
export * from "./text-creator.mjs";
export * from "./trash-schedule-service.mjs";
export { RecentTrashDate, DBAdapter };
