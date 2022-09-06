import assert from 'node:assert/strict';
import lintFs from './lintFs.js';

const testLintFs = async ({ matcher, paths, result }) => {
  assert.deepEqual(lintFs({ matcher })({ paths }), result);
};

const tests = [
  {
    matcher: {},
    paths: [],
    result: [
      [],
    ],
  },
];

for (const test of tests) {
  testLintFs(test);
}
