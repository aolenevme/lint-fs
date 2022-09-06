import assert from 'node:assert/strict';
import lintFs from './lintFs.js';

const testLintFs = ({
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
        const ok = path === '/correctPath.js';

        if (ok) {
          return [];
        }

        return [
          'testError',
        ];
      },
    },
    paths: [
      '/correctPath.js',
      '/incorrectPath.js',
    ],
    result: [
      {
        correct: [
          '/correctPath.js',
        ],
        incorrect: [
          '/incorrectPath.js',
        ],
      },
      'matcher',
    ],
  },
  {
    matcher: {
      isCorrect () {
        return [];
      },
    },
    paths: [
      '/correctPath1.js',
      '/correctPath2.js',
    ],
    result: [
      {
        correct: [
          '/correctPath1.js',
          '/correctPath2.js',
        ],
        incorrect: [],
      },
    ],
  },

];

for (const test of tests) {
  testLintFs(test);
}
