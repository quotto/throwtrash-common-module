import * as common from "../index";
const logger = common.getLogger();
export const loggerTest = ()=>{
    return logger.debug("debug");
}