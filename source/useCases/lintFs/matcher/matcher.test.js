import assert from 'node:assert/strict';
import matcher from './matcher.js';

const testMatcher = ({
  path,
  regExps,
  result,
}) => {
  assert.deepEqual(matcher.isCorrect(path, regExps), result);
};

const tests = [
  {
    path: 'node_modules/browserslist',
    regExps: [
      /^node_modules/u,
    ],
    result: [
      true,
    ],
  },
  {
    path: 'wrong_node_modules/browserslist',
    regExps: [
      /^node_moduless/u,
    ],
    result: [
      false,
    ],
  },
  {
    path: 'node_modules/browserslist',
    regExps: [
      null,
    ],
    result: [
      undefined,
      'isCorrect: TypeError: Cannot read properties of null (reading \'test\')',
    ],
  },
];

for (const test of tests) {
  testMatcher(test);
}
