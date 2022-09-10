import assert from 'node:assert/strict';
import matcher from './matcher.js';

const testMatcher = ({
  config,
  path,
  result,
}) => {
  assert.deepEqual(matcher.isCorrect(config, path), result);
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
  {
    config: {
      ignores: [],
      rules: [
        /^node_modules/u,
      ],
    },
    path: 'node_modules/browserslist',
    result: [],
  },
  {
    config: {
      ignores: [],
      rules: [
        /^node_moduless/u,
      ],
    },
    path: 'wrong_node_modules/browserslist',
    result: [
      'isCorrect: isOk',
    ],
  },
];

for (const test of tests) {
  testMatcher(test);
}
