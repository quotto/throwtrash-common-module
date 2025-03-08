import * as common from "../index.js";
const logger = common.getLogger();
export const loggerTest = ()=>{
    return logger.debug("debug");
}