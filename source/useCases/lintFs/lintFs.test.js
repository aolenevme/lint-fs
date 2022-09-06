import assert from 'node:assert/strict';
import lintFs from './lintFs.js';

const testLintFs = async ({
  matcher,
  paths,
  result,
}) => {
  assert.deepEqual(lintFs({
    matcher,
  })({
    paths,
  }), result);
};

const tests = [
  {
    matcher: {},
    paths: [],
    result: [
      [],
    ],
  },
  {
    matcher: {
      isCorrect (path) {
        assert.deepEqual(path, '/test-path.js');

        return [];
      },
    },
    paths: [
      '/test-path.js',
    ],
    result: [
      [
        '/test-path.js',
      ],
    ],
  },
];

for (const test of tests) {
  testLintFs(test);
}
