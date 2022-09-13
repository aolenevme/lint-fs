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

    result: 'resultText',

    std: {
      log (text) {
        assert.deepEqual(text, 'resultText');
      },
    },
  },
];

for (const test of tests) {
  testLogger(test);
}
