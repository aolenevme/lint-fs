import assert from 'node:assert/strict';
import logger from './logger.js';

const testLogger = async ({
  format,
  method,
  result,
  std,
}) => {
  logger({
    std,
  })[method](format, result);
};

const tests = [
  {
    format: '\u001B[32m%s\u001B[0m',

    method: 'log',

    result: 'text',

    std: {
      log (format, text) {
        assert.deepEqual(format, '\u001B[32m%s\u001B[0m');
        assert.deepEqual(text, 'text');
      },
    },
  },
  {
    format: '\u001B[32m%s\u001B[0m',

    method: 'logBatch',

    result: [
      'text1',
    ],

    std: {
      log (format, text) {
        assert.deepEqual(format, '\u001B[32m%s\u001B[0m');
        assert.ok([
          'text1',
        ].includes(text));
      },
    },
  },
];

for (const test of tests) {
  testLogger(test);
}
