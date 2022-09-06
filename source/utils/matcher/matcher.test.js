import assert from 'node:assert/strict';
import matcher from './matcher.js';

const testMatcher = ({
  config,
  path,
  result,
}) => {
  assert.deepEqual(matcher({
    config,
  }).isCorrect(path), result);
};

const tests = [
  {
    config: {
      ignores: [],
      rules: [],
    },
    path: 'test-path',
    result: [],
  },
];

for (const test of tests) {
  testMatcher(test);
}
