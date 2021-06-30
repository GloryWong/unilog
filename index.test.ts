import { Unilog, unilog } from './index';

xdescribe.each([
  ['one param'],
  ['first param', 'second param'],
  ['string', 123, true, { a: 'object' }, ['array'], undefined, null, Symbol('symbol')]
])('Constructor usage', (...data: any[]) => {
  test('info', () => {
    expect(() => {
      const log = new Unilog('info test');
      log.info(...data);
    }).not.toThrow();
  });

  test('succeed', () => {
    expect(() => {
      const log = new Unilog('succeed test');
      log.succeed(...data);
    }).not.toThrow();
  });

  test('warn', () => {
    expect(() => {
      const log = new Unilog('warn test');
      log.warn(...data);
    }).not.toThrow();
  });

  test('fail', () => {
    expect(() => {
      const log = new Unilog('fail test');
      log.fail(...data);
    }).not.toThrow();
  });

  test('debug', () => {
    expect(() => {
      const log = new Unilog('debug test');
      log.debug(...data);
    }).not.toThrow();
  });

  test('debug in production', () => {
    const nodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    expect(() => {
      const log = unilog('debug in production test');
      log.debug(...data);
    }).not.toThrow();
    process.env.NODE_ENV = nodeEnv;
  });
});

describe('Standalone usage', () => {
  test('Basic usage', () => {
    expect(() => {
      unilog('Block');
      unilog.info('hello world', { a: 2 });
      unilog.succeed('really', 123);
      unilog.warn('forget love potion', 'forget me');
      unilog.fail('You suck', false, true, false, null, undefined);
      unilog.debug('Catch and clear it', 'sure?', true, Symbol('bug'), function () { console.log('function print') });
    }).not.toThrow();
  });

  test('Change title in midway', () => {
    expect(() => {
      unilog('Init title');
      unilog.mid('Title changed in midway').info('<- New title', { a: 2}, false);
      unilog.warn('<- Title recovered', 1, 2, 3, 4, true, { b: { c: { d: undefined } } });
    }).not.toThrow();
  });

  test('Change title permernantly', () => {
    expect(() => {
      unilog('Init title');
      unilog.succeed('<- Original title', true, 123);
      unilog('New title');
      unilog.succeed('<- new title setted', 'sure', [1,2,3]);
      unilog.succeed('<- look at the new title');
    }).not.toThrow();
  });
});