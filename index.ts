import logSymbols from 'log-symbols';
import chalk from 'chalk';

const chalkMap: { [key: string]: Function } = {
  info: chalk.blue,
  succeed: chalk.green,
  warn: chalk.yellow,
  fail: chalk.red,
  debug: chalk.gray
}

const symbolsMap: { [key: string]: string } = {
  info: logSymbols['info'],
  succeed: logSymbols['success'],
  warn: logSymbols['warning'],
  fail: logSymbols['error'],
  debug: chalkMap.debug('*')
};

type LogType = 'info' | 'succeed' | 'warn' | 'fail' | 'debug';

class Unilog {
  #title = '';
  #midwayTitle = '';

  constructor(title?: string) {
    this.#title = title || '';
  }

  getTitle(): string {
    return this.#title;
  }

  setTitle(value: string) {
    this.#title = value;
    return this;
  }

  getMidwayTitle(): string {
    return this.#midwayTitle;
  }

  setMidewayTitle(value: string) {
    this.#midwayTitle = value;
    return this;
  }

  print(type: LogType, data: any[]) {
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

    const title = this.#midwayTitle || this.#title;
    // print log
    console.log(`${symbol} ${typeDisplay}: ${title}${ title ? '. ' : ''}${tmpl}`, ...data);
    
    // reset midwayTitle
    this.#midwayTitle = '';

    return this;
  }

  info(...data: any[]) {
    return this.print('info', data);
  }

  succeed(...data: any[]) {
    return this.print('succeed', data);
  }

  warn(...data: any[]) {
    return this.print('warn', data);
  }

  fail(...data: any[]) {
    return this.print('fail', data);
  }

  debug(...data: any[]) {
    if (process.env.NODE_ENV !== 'production') {
      return this.print('debug', data);
    }
    return this;
  }
}

// Standalone
let standaloneInst: Unilog;

interface Standalone {
  (title?: string): Unilog;
  info: (...data: any[]) => Unilog;
  succeed: (...data: any[]) => Unilog;
  warn: (...data: any[]) => Unilog;
  fail: (...data: any[]) => Unilog;
  debug: (...data: any[]) => Unilog;
  mid: (title: string) => Unilog;
};

const unilog: Standalone = function(title): Unilog {
  if (!standaloneInst) {
    standaloneInst = new Unilog(title);
  } else {
    standaloneInst.setTitle(title || '');
  }
  return standaloneInst;
}

unilog.info = (...data) => {
  if (!standaloneInst) {
    unilog();
  }
  return standaloneInst.info(...data);
};
unilog.succeed = (...data) => {
  if (!standaloneInst) {
    unilog();
  }
  return standaloneInst.succeed(...data);
};
unilog.warn = (...data) => {
  if (!standaloneInst) {
    unilog();
  }
  return standaloneInst.warn(...data);
};
unilog.fail = (...data) => {
  if (!standaloneInst) {
    unilog();
  }
  return standaloneInst.fail(...data);
};
unilog.debug = (...data) => {
  if (!standaloneInst) {
    unilog();
  }
  return standaloneInst.debug(...data);
};
unilog.mid = (...data) => {
  if (!standaloneInst) {
    unilog();
  }
  return standaloneInst.setMidewayTitle(...data);
};

export {
  Unilog,
  unilog as default
};