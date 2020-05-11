const logger = require('../logger.js');

describe('logger test',()=>{
    it('change level',()=>{
        logger.LEVEL = logger.WARN;
        expect(logger.LEVEL).toBe(logger.WARN);

        logger.LEVEL = logger.DEBUG;
        expect(logger.LEVEL).toBe(logger.DEBUG);

        logger.LEVEL = logger.ERROR;
        expect(logger.LEVEL).toBe(logger.ERROR);
    })
    it('error level',()=>{
        logger.LEVEL = logger.ERROR;
        expect(logger.error('test')).toBeTruthy();
        expect(logger.warn('test')).toBeFalsy();
    });
    it('warn level',()=>{
        logger.LEVEL = logger.WARN;
        expect(logger.error('test')).toBeTruthy();
        expect(logger.warn('test')).toBeTruthy();
        expect(logger.info('info')).toBeFalsy();
    });
    it('info level',()=>{
        logger.LEVEL = logger.INFO;
        expect(logger.error('test')).toBeTruthy();
        expect(logger.warn('test')).toBeTruthy();
        expect(logger.info('info')).toBeTruthy();
        expect(logger.debug('debug')).toBeFalsy();
    });
    it('debug level',()=>{
        logger.LEVEL = logger.DEBUG;
        expect(logger.error('test')).toBeTruthy();
        expect(logger.warn('test')).toBeTruthy();
        expect(logger.info('info')).toBeTruthy();
        expect(logger.debug('debug')).toBeTruthy();
    });
})