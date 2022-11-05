import assert from 'node:assert/strict';
import errors from './errors.js';

const testErrorsWrap = ({
  previous,
  next,
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
