import errors from './errors.js';
import assert from 'node:assert/strict';

const testErrorsWrap = ({
  next,
  previous,
  result,
}) => {
  assert.deepEqual(errors.wrap(previous, next), result);
};

const testsErrorsWrap = [
  {
    next: 'next',
    previous: 'previous',
    result: [
      undefined,
      'previous: next',
    ],
  },
];

for (const test of testsErrorsWrap) {
  testErrorsWrap(test);
}
