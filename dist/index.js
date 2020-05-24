"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = exports.generateRandomCode = exports.generateUUID = exports.checkTrashes = exports.existSchedule = exports.isValidTrashType = exports.isValidMonthValue = exports.isValidTrashVal = exports.isNotOverLength = exports.isNotOverMax = exports.isNotLessMin = exports.isNumber = exports.isNotEmpty = void 0;
const logger_1 = require("./logger");
__exportStar(require("./logger"), exports);
function isNotEmpty(value) {
    return (typeof (value) != "undefined") && value != null && String(value).length > 0;
}
exports.isNotEmpty = isNotEmpty;
function isNumber(value) {
    return !isNaN(Number(value));
}
exports.isNumber = isNumber;
function isNotLessMin(value, min = 1) {
    return value >= min;
}
exports.isNotLessMin = isNotLessMin;
function isNotOverMax(value, max = 31) {
    return value <= max;
}
exports.isNotOverMax = isNotOverMax;
function isNotOverLength(value, max = 10) {
    return value.length <= max;
}
exports.isNotOverLength = isNotOverLength;
function isValidTrashVal(value) {
    const re = /^[A-z0-9Ａ-ｚ０-９ぁ-んァ-ヶー一-龠\s]+$/;
    return isNotEmpty(value) && re.exec(value) != null;
}
exports.isValidTrashVal = isValidTrashVal;
function isValidMonthValue(month_val) {
    const date = Number(month_val);
    return isNotEmpty(date) && isNumber(date) && isNotLessMin(date) && isNotOverMax(date);
}
exports.isValidMonthValue = isValidMonthValue;
function isValidTrashType(trash, maxlength) {
    return trash.type != "other" || (isNotEmpty(trash.trash_val) && isValidTrashVal(trash.trash_val) && isNotOverLength(trash.trash_val, maxlength));
}
exports.isValidTrashType = isValidTrashType;
function existSchedule(schedules) {
    return schedules && schedules.length > 0 && schedules.every((element) => {
        return element.type != 'none';
    });
}
exports.existSchedule = existSchedule;
function checkTrashes(trashes) {
    return trashes && (trashes.length > 0) && trashes.every((trash) => {
        return trash.schedules && trash.schedules.every((schedule) => {
            if (schedule.type === 'month') {
                return isValidMonthValue(schedule.value);
            }
            return true;
        }) && existSchedule(trash.schedules) && isValidTrashType(trash, 10);
    });
}
exports.checkTrashes = checkTrashes;
function generateUUID(separator = '') {
    let uuid = '', i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += separator;
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}
exports.generateUUID = generateUUID;
function generateRandomCode(length = 10) {
    let code = '';
    for (let i = 0; i < length; i++) {
        code += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'[Math.floor(Math.random() * 63)];
    }
    return code;
}
exports.generateRandomCode = generateRandomCode;
function getLogger() {
    return new logger_1.Logger();
}
exports.getLogger = getLogger;
