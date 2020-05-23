"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEVEL = exports.DEBUG = exports.INFO = exports.WARN = exports.ERROR = void 0;
exports.ERROR = '0';
exports.WARN = '1';
exports.INFO = '2';
exports.DEBUG = '3';
// eslint-disable-next-line prefer-const
exports.LEVEL = exports.INFO;
exports.error = (message) => {
    if (exports.LEVEL >= exports.ERROR) {
        console.error(message);
        return true;
    }
    return false;
};
exports.warn = (message) => {
    if (exports.LEVEL >= exports.WARN) {
        console.warn(message);
        return true;
    }
    return false;
};
exports.info = (message) => {
    if (exports.LEVEL >= exports.INFO) {
        console.info(message);
        return true;
    }
    return false;
};
exports.debug = (message) => {
    if (exports.LEVEL >= exports.DEBUG) {
        console.debug(message);
        return true;
    }
    return false;
};
