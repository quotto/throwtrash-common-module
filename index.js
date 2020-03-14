const isNotEmpty = (value) => {
    return (typeof(value) != "undefined") && String(value).length > 0;
};

const isNumber = value => {
    return !isNaN(Number(value));
};

const isNotLessMin = (value,min=1) => {
    return value && value >= min;
};

const isNotOverMax = (value,max=31) => {
    return value && value <= max;
};

const isNotOverLength = (value,max=10) => {
    return value.length <= max;
};

const isValidTrashVal = (value) =>{
    const re = /^[A-z0-9Ａ-ｚ０-９ぁ-んァ-ヶー一-龠\s]+$/;
    return value && re.exec(value);
};

const isValidMonthValue = (month_val) => {
    const date = Number(month_val)
    return isNotEmpty(date) && isNumber(date) && isNotLessMin(date) && isNotOverMax(date);
};

const isValidTrashType = (trash,maxlength) => {
    if(trash.type === 'other'){

        return isNotEmpty(trash.trash_val) && isValidTrashVal(trash.trash_val) && isNotOverLength(trash.trash_val, maxlength)
    }
    return true;
};

const existSchedule = (schedules) => {
    return schedules && schedules.length > 0 && schedules.every((element)=>{
        return element.type!='none';
    });
};

const checkTrashes = (trashes) => {
    return trashes && (trashes.length > 0) && trashes.every((trash) => {
        return trash.schedules.every((schedule) => {
            if (schedule.type === 'month') {
                return isValidMonthValue(schedule.value);
            }
            return true;
        }) && existSchedule(trash.schedules) && isValidTrashType(trash,10);
    });
};

const generateId = (separator='')=>{
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
    generateId: generateId
};
