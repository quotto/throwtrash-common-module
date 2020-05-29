import * as  common from "../index" ;
import {loggerTest} from "./logger.sub";
const logger: common.Logger = common.getLogger();


describe('logger test',()=>{
    it('error level',()=>{
        logger.setLevel_ERROR();
        expect(logger.error('test')).toBeTruthy();
        expect(logger.warn('test')).toBeFalsy();
    });
    it('warn level',()=>{
        logger.setLevel_WARN();
        expect(logger.error('test')).toBeTruthy();
        expect(logger.warn('test')).toBeTruthy();
        expect(logger.info('info')).toBeFalsy();
    });
    it('info level',()=>{
        logger.setLevel_INFO();
        expect(logger.error('test')).toBeTruthy();
        expect(logger.warn('test')).toBeTruthy();
        expect(logger.info('info')).toBeTruthy();
        expect(logger.debug('debug')).toBeFalsy();
    });
    it('debug level',()=>{
        logger.setLevel_DEBUG();
        expect(logger.error('test')).toBeTruthy();
        expect(logger.warn('test')).toBeTruthy();
        expect(logger.info('info')).toBeTruthy();
        expect(logger.debug('debug')).toBeTruthy();
    });
    it("logger on another module", ()=>{
        logger.setLevel_DEBUG();
        expect(loggerTest());
    })
})