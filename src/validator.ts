import type { TrashData, ScheduleValue } from "./types";

export function isNotEmpty(value: string | number | undefined | null): boolean {
    return (typeof (value) != "undefined") && value != null && String(value).length > 0;
}

export function isNumber(value: string | number): boolean  {
    return !isNaN(Number(value));
}

export function isNotLessMin(value: number, min = 1): boolean {
    return value >= min;
}

export function isNotOverMax(value: number, max = 31): boolean {
    return value <= max;
}

export function isNotOverLength(value: string, max = 10): boolean {
    return value.length <= max;
}

export function isValidTrashVal(value: string): boolean {
    const re = /^[A-z0-9Ａ-ｚ０-９ぁ-んァ-ヶー一-龠\s]+$/;
    return isNotEmpty(value) && re.exec(value) != null;
}

export function isValidMonthValue(month_val: string | number): boolean {
    const date = Number(month_val)
    return isNotEmpty(date) && isNumber(date) && isNotLessMin(date) && isNotOverMax(date);
}

export function isValidTrashType(trash: TrashData, maxlength: number): boolean {
    return trash.type != "other" || (isNotEmpty(trash.trash_val) && isValidTrashVal(trash.trash_val as string) && isNotOverLength(trash.trash_val as string, maxlength))
}

export function existSchedule(schedules: ScheduleValue[]): boolean {
    return schedules && schedules.length > 0 && schedules.every((element) => {
        return element.type != "none";
    });
}

export function checkTrashes(trashes: TrashData[]): boolean {
    if (!trashes) return false;
    if (trashes.length === 0) return true;
    return trashes.every((trash) => {
        return trash.schedules && trash.schedules.every((schedule) => {
            if (schedule.type === "month") {
                return isValidMonthValue(schedule.value as string);
            }
            return true;
        }) && existSchedule(trash.schedules) && isValidTrashType(trash, 10);
    });
}

export function generateUUID(separator = ""): string {
    let uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;

        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += separator
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}

export function generateRandomCode(length = 10): string {
    let code = "";
    for (let i = 0; i < length; i++) {
        code += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_"[Math.floor(Math.random() * 63)];
    }
    return code;
}
