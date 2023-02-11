import matcher from './matcher.js';
import assert from 'node:assert/strict';

const testMatcher = ({
  path,
  regs,
  result,
}) => {
  assert.deepEqual(matcher.isCorrect(path, regs), result);
};

const tests = [
  {
    path: 'node_modules/browserslist',
    regs: [
      /^node_modules/u,
    ],
    result: [
      '/^node_modules/u',
    ],
  },
  {
    path: 'wrong_node_modules/browserslist',
    regs: [
      /^node_moduless/u,
    ],
    result: [
      '',
    ],
  },
  {
    path: 'node_modules/browserslist',
    regs: [
      undefined,
    ],
    result: [
      undefined,
      'isCorrect: TypeError: Cannot read properties of undefined (reading \'test\')',
    ],
  },
];

for (const test of tests) {
  testMatcher(test);
}
