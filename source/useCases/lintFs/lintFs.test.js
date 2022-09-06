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
  {
    matcher: {
      isCorrect () {
        return [
          'matcherError',
        ];
      },
    },
    paths: [
      '/test-path.js',
    ],
    result: [
      [
        '/test-path.js',
      ],
      'matcherError',
    ],
  },
];

for (const test of tests) {
  testLintFs(test);
}
