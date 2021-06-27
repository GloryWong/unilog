import logSymbols from 'log-symbols';
import chalk from 'chalk';

const symbolsMap: { [key: string]: string } = {
  info: logSymbols['info'],
  succeed: logSymbols['success'],
  warn: logSymbols['warning'],
  fail: logSymbols['error'],
  debug: ''
};

const chalkMap: { [key: string]: Function } = {
  info: chalk.blue.bold,
  succeed: chalk.green.bold,
  warn: chalk.yellow.bold,
  fail: chalk.red.bold,
  debug: chalk.gray.bold
}

class Unilog {
  #text = '';

  constructor(text: string) {
    //
  }

  get text(): string {
    return this.#text;
  }

  set text(value: string) {
    this.#text = value;
  }

  uni(type: string, data: any = '') {
    const title = type.substr(0, 1).toUpperCase() + type.substr(1);
    console.log(`${symbolsMap[type]}${chalkMap[type](title)}: %s - %o`, this.#text, data);
  }

  info(data: any) {
    this.uni('info', data);
  }

  succeed(data: any) {
    this.uni('succeed', data);
  }

  warn(data: any) {
    this.uni('warn', data);
  }

  fail(data: any) {
    this.uni('fail', data);
  }

  debug(data: any) {
    if (process.env.NODE_ENV !== 'production') {
      this.uni('debug', data);
    }
  }
}

const unilog = function(text: string) {
  return new Unilog(text);
}

export default unilog;