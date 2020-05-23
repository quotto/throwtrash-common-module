const logger = require("./logger");

const isNotEmpty = (value: string|number|undefined|null): boolean => {
    return (typeof(value) != "undefined") && value != null && String(value).length > 0;
};

const isNumber = (value: string|number): boolean => {
    return !isNaN(Number(value));
};

const isNotLessMin = (value: number,min=1): boolean => {
    return value >= min;
};

const isNotOverMax = (value: number,max=31): boolean => {
    return value <= max;
};

const isNotOverLength = (value: string,max=10): boolean => {
    return value.length <= max;
};

const isValidTrashVal = (value: string): boolean =>{
    const re = /^[A-z0-9Ａ-ｚ０-９ぁ-んァ-ヶー一-龠\s]+$/;
    return isNotEmpty(value) && re.exec(value) != null;
};

const isValidMonthValue = (month_val: string|number): boolean => {
    const date = Number(month_val)
    return isNotEmpty(date) && isNumber(date) && isNotLessMin(date) && isNotOverMax(date);
};

const isValidTrashType = (trash: TrashData,maxlength: number): boolean => {
    return trash.type != "other" || (isNotEmpty(trash.trash_val) && isValidTrashVal(trash.trash_val!!) && isNotOverLength(trash.trash_val!!, maxlength))
};

const existSchedule = (schedules: TrashSchedule[]): boolean => {
    return schedules && schedules.length > 0 && schedules.every((element)=>{
        return element.type!='none';
    });
};

const checkTrashes = (trashes: TrashData[]): boolean => {
    return trashes && (trashes.length > 0) && trashes.every((trash) => {
        return trash.schedules && trash.schedules.every((schedule) => {
            if (schedule.type === 'month') {
                return isValidMonthValue(schedule.value as string);
            }
            return true;
        }) && existSchedule(trash.schedules) && isValidTrashType(trash,10);
    });
};

const generateUUID = (separator=''): string=>{
    let uuid = '', i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;

        if(i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += separator
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
};

const generateRandomCode = (length=10): string=> {
    let code = '';
    for(let i=0; i<length; i++) {
        code += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'[Math.floor(Math.random()*63)];
    }
    return code;
}

module.exports = {
    isNotEmpty: isNotEmpty,
    isNumber: isNumber,
    isNotLessMin: isNotLessMin,
    isNotOverMax: isNotOverMax,
    existSchedule: existSchedule,
    isValidMonthValue: isValidMonthValue,
    isValidTrashType: isValidTrashType,
    isValidTrashVal: isValidTrashVal,
    checkTrashes: checkTrashes,
    generateUUID: generateUUID,
    generateRandomCode: generateRandomCode,
    getLogger: ()=>{return logger}
};
