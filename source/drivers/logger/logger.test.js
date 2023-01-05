import assert from 'node:assert/strict';
import logger from './logger.js';

const testLogger = async ({
  content,
  format,
  method,
  std,
  result,
}) => {
  assert.deepEqual(
    await logger({
      std,
    })[method](format, content),
    result,
  );
};

const tests = [
  {
    content: 'text',

    format: '\u001B[32m%s\u001B[0m',

    method: 'log',

    result: [],

    std: {
      log (format, text) {
        assert.deepEqual(format, '\u001B[32m%s\u001B[0m');
        assert.deepEqual(text, 'text');
      },
    },
  },
  {
    method: 'log',

    result: [
      undefined,
      'log: std.log',
    ],

    std: {
      log () {
        throw new Error('std.log');
      },
    },
  },
  {
    content: [
      'text1',
    ],

    format: '\u001B[32m%s\u001B[0m',

    method: 'logBatch',

    result: [],

    std: {
      log (format, text) {
        assert.deepEqual(format, '\u001B[32m%s\u001B[0m');
        assert.ok([
          'text1',
        ].includes(text));

        return [];
      },
    },
  },
  {
    content: [
      'text1',
    ],

    method: 'logBatch',

    result: [
      undefined,
      'logBatch: std.log',
    ],

    std: {
      log () {
        throw new Error('std.log');
      },
    },
  },
];

for (const test of tests) {
  testLogger(test);
}
