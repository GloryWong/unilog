declare type LogType = 'info' | 'succeed' | 'warn' | 'fail' | 'debug';
declare class Unilog {
    #private;
    constructor(title?: string);
    getTitle(): string;
    setTitle(value: string): this;
    getMidwayTitle(): string;
    setMidewayTitle(value: string): this;
    print(type: LogType, data: any[]): this;
    info(...data: any[]): this;
    succeed(...data: any[]): this;
    warn(...data: any[]): this;
    fail(...data: any[]): this;
    debug(...data: any[]): this;
}
interface Singleton {
    (title?: string): Unilog;
    info: (...data: any[]) => Unilog;
    succeed: (...data: any[]) => Unilog;
    warn: (...data: any[]) => Unilog;
    fail: (...data: any[]) => Unilog;
    debug: (...data: any[]) => Unilog;
    mid: (title: string) => Unilog;
}
declare const unilog: Singleton;
export { Unilog, unilog };
