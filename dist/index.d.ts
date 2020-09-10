import { Logger } from "./logger";
import MESSAGES from "./messages";
export * from "./logger";
export declare function isNotEmpty(value: string | number | undefined | null): boolean;
export declare function isNumber(value: string | number): boolean;
export declare function isNotLessMin(value: number, min?: number): boolean;
export declare function isNotOverMax(value: number, max?: number): boolean;
export declare function isNotOverLength(value: string, max?: number): boolean;
export declare function isValidTrashVal(value: string): boolean;
export declare function isValidMonthValue(month_val: string | number): boolean;
export declare function isValidTrashType(trash: TrashData, maxlength: number): boolean;
export declare function existSchedule(schedules: TrashSchedule[]): boolean;
export declare function checkTrashes(trashes: TrashData[]): boolean;
export declare function generateUUID(separator?: string): string;
export declare function generateRandomCode(length?: number): string;
export declare function getLogger(): Logger;
export interface EvweekValue {
    weekday: string;
    start: string;
}
export interface TrashTypeValue {
    type: string;
    name: string;
}
export interface TrashSchedule {
    type: string;
    value: string | EvweekValue;
}
export interface TrashData {
    type: string;
    trash_val?: string;
    schedules: Array<TrashSchedule>;
}
export * as client from "./client";
export { MESSAGES };
