import assert from 'node:assert/strict';
import logger from './logger.js';

const testLogger = async ({
  method,
  result,
  std,
}) => {
  logger({
    std,
  })[method](result);
};

const tests = [
  {
    method: 'log',

    result: 'text',

    std: {
      log (text) {
        assert.deepEqual(text, 'text');
      },
    },
  },
  {
    method: 'logBatch',

    result: [
      'text1',
      'text2',
      'text3',
    ],

    std: {
      log (text) {
        assert.ok([
          'text1',
          'text2',
          'text3',
        ].includes(text));
      },
    },
  },
];

for (const test of tests) {
  testLogger(test);
}
