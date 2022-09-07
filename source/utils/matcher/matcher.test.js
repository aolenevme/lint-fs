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
      ignores: [
        /^node_modules/u,
      ],
      rules: [],
    },
    path: 'node_modules/browserslist',
    result: [],
  },
];

for (const test of tests) {
  testMatcher(test);
}
