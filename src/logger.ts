export const ERROR = '0'
export const WARN = '1'
export const INFO = '2'
export const DEBUG = '3'
// eslint-disable-next-line prefer-const
export let LEVEL = INFO;

exports.error = (message: string)=>{
    if(LEVEL >= ERROR) {
        console.error(message);
        return true;
    }
    return false;
}
exports.warn = (message: string)=>{
    if(LEVEL >= WARN) {
        console.warn(message);
        return true;
    }
    return false;
}
exports.info = (message: string)=>{
    if(LEVEL >= INFO) {
        console.info(message);
        return true;
    }
    return false;
}
exports.debug = (message: string)=>{
    if(LEVEL >= DEBUG) {
        console.debug(message);
        return true;
    }
    return false;
}