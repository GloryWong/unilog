# Unilog

Log everywhere with unified title and symbol.

> Support *CommonJS* and *ESModule*.

# Install

```sh
npm install @glorywong/unilog
```
or
```sh
yarn add @glorywong/unilog
```

# Usage

## Constructor

```javascript
import { Unilog } from '@glorywong/unilog';

const unilog = new Unilog('Play balls');
unilog.warn('Balls became worse', 3); // PRINT ⚠ Warn: Play balls. Balls become worse - 3
unilog.fail('Something wrong', { a: 1 }); // PRINT ✖ Fail: Play balls. Something wrong - { a: 1 }
```

## Standalone

```javascript
import unilog from '@glorywong/unilog';

function playBalls() {
  // Init log with a Title
  unilog('Play balls');
  try {
    unilog.info('Children are happy'); // PRINT ℹ Info: Play balls. Children are happy
    // Change title in midway temporarily (Will be consumed only once at next log action)
    unilog.mid('Break balls').warn('Balls became worse', 3); // PRINT ⚠ Warn: Break balls. Balls become worse - 3
    const sure = true;
    unilog.succeed('Balls are back to the basket.', sure); // PRINT ✔ Succeed: Play balls. Balls are back to the basket. - true
  } catch (error) {
    unilog.fail('Something wrong', error); // PRINT ✖ Fail: Play balls. Something wrong - Error...
  }
}

playBalls();
// Modify title permenantly
unilog('Finished');
unilog.info('All entertainments were closed'); // PRINT ℹ Info: Finished. All entertainments were closed
```

# API

## Constructor: new Unilog(title?) or Standalone: unilog(title?)
Create a unilog instance with or without `title`, which will be used as a unified title for log actions

## Instance

### Log actions
`.info(...data?)`, `.succeed(...data?)`, `.warn(...data?)`, `.fail(...data?)`, `.debug(...data?)`.

`data`: multiple *printed data* passed to log actions.

Logs with a unified title and [symbol](https://github.com/sindresorhus/log-symbols) will be printed in the console of Browser or Node. If wanna use different `title` temporarily for a log action, use method `.mid` to set a `midwayTitle` before the log action. The `midwayTitle` will be consumed only once, which means rest log actions will still use the initialized `title`.

> `.debug` won't print log if `process.env.NODE_ENV === 'production'`.

### getTitle

Get the present unified title

### setTitle

Set the unified title

### getMidwayTitle

Get the midway title, which temporary for next log action.

### setMidewayTitle

Set the midway title, which temporary for next log action.

### mid

Shortcut to setMidewayTitle.

