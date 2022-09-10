import assert from 'node:assert/strict';
import lintFs from './lintFs.js';

const testLintFs = ({
  config,
  matcher,
  paths,
  result,
}) => {
  assert.deepEqual(lintFs({
    config,
  }, {
    matcher,
  })({
    paths,
  }), result);
};

const tests = [
  {
    config: {
      ignores: [],
      rules: [],
    },
    matcher: {
      isCorrect (testConfig, path) {
        assert.deepEqual(testConfig, {
          ignores: [],
          rules: [],
        });

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
