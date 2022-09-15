import assert from 'node:assert/strict';
import fail from './fail.js';

const testFail = ({
  message,
  result,
}) => {
  try {
    fail(message);
  } catch (error) {
    assert.deepEqual(error.message, result);
  }
};

const tests = [
  {
    message: 'errorMessage',
    result: 'errorMessage',
  },
];

for (const test of tests) {
  testFail(test);
}
