"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Unilog_title, _Unilog_midwayTitle;
Object.defineProperty(exports, "__esModule", { value: true });
exports.unilog = exports.Unilog = void 0;
const log_symbols_1 = __importDefault(require("log-symbols"));
const chalk_1 = __importDefault(require("chalk"));
const chalkMap = {
    info: chalk_1.default.blue,
    succeed: chalk_1.default.green,
    warn: chalk_1.default.yellow,
    fail: chalk_1.default.red,
    debug: chalk_1.default.gray
};
const symbolsMap = {
    info: log_symbols_1.default['info'],
    succeed: log_symbols_1.default['success'],
    warn: log_symbols_1.default['warning'],
    fail: log_symbols_1.default['error'],
    debug: chalkMap.debug('*')
};
class Unilog {
    constructor(title) {
        _Unilog_title.set(this, '');
        _Unilog_midwayTitle.set(this, '');
        __classPrivateFieldSet(this, _Unilog_title, title || '', "f");
    }
    getTitle() {
        return __classPrivateFieldGet(this, _Unilog_title, "f");
    }
    setTitle(value) {
        __classPrivateFieldSet(this, _Unilog_title, value, "f");
        return this;
    }
    getMidwayTitle() {
        return __classPrivateFieldGet(this, _Unilog_midwayTitle, "f");
    }
    setMidewayTitle(value) {
        __classPrivateFieldSet(this, _Unilog_midwayTitle, value, "f");
        return this;
    }
    print(type, data) {
        const symbol = symbolsMap[type];
        const typeDisplay = chalkMap[type](type.substr(0, 1).toUpperCase() + type.substr(1));
        const tmpl = data.map(v => {
            if (typeof v === 'string') {
                return '%s';
            }
            if (typeof v === 'number') {
                return '%d';
            }
            return '%o';
        }).join(' - ');
        const title = __classPrivateFieldGet(this, _Unilog_midwayTitle, "f") || __classPrivateFieldGet(this, _Unilog_title, "f");
        console.log(`${symbol} ${typeDisplay}: ${title}${title ? '. ' : ''}${tmpl}`, ...data);
        __classPrivateFieldSet(this, _Unilog_midwayTitle, '', "f");
        return this;
    }
    info(...data) {
        return this.print('info', data);
    }
    succeed(...data) {
        return this.print('succeed', data);
    }
    warn(...data) {
        return this.print('warn', data);
    }
    fail(...data) {
        return this.print('fail', data);
    }
    debug(...data) {
        if (process.env.NODE_ENV !== 'production') {
            return this.print('debug', data);
        }
        return this;
    }
}
exports.Unilog = Unilog;
_Unilog_title = new WeakMap(), _Unilog_midwayTitle = new WeakMap();
let singletonInst;
;
const unilog = function (title) {
    if (!singletonInst) {
        singletonInst = new Unilog(title);
    }
    else {
        singletonInst.setTitle(title || '');
    }
    return singletonInst;
};
exports.unilog = unilog;
unilog.info = (...data) => {
    if (!singletonInst) {
        unilog();
    }
    return singletonInst.info(...data);
};
unilog.succeed = (...data) => {
    if (!singletonInst) {
        unilog();
    }
    return singletonInst.succeed(...data);
};
unilog.warn = (...data) => {
    if (!singletonInst) {
        unilog();
    }
    return singletonInst.warn(...data);
};
unilog.fail = (...data) => {
    if (!singletonInst) {
        unilog();
    }
    return singletonInst.fail(...data);
};
unilog.debug = (...data) => {
    if (!singletonInst) {
        unilog();
    }
    return singletonInst.debug(...data);
};
unilog.mid = (...data) => {
    if (!singletonInst) {
        unilog();
    }
    return singletonInst.setMidewayTitle(...data);
};
