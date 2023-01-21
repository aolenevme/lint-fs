import assert from 'node:assert/strict';
import fail from './fail.js';

const testFail = ({
  message,
  result,
}) => {
  const tracker = new assert.CallTracker();
  const deepEqualCalls = 1;
  const callsDeepEqual = tracker.calls(assert.deepEqual, deepEqualCalls);

  try {
    fail(message);
  } catch (error) {
    callsDeepEqual(error.message, result);
  }

  tracker.verify();
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
