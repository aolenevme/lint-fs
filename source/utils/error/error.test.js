import assert from 'node:assert/strict';
import error from './error.js';

const testErrorWrap = ({
  previous,
  next,
  result,
}) => {
  assert.deepEqual(error.wrap(previous, next), result);
};

const testsErrorWrap = [
  {
    next: 'next',
    previous: 'previous',
    result: [
      undefined,
      'previous: next',
    ],
  },
];

for (const test of testsErrorWrap) {
  testErrorWrap(test);
}
