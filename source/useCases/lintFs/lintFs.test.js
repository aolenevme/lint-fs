import assert from 'node:assert/strict';
import lintFs from './lintFs.js';

const testLintFs = ({
  config,
  matcher,
  filesystem,
  result,
}) => {
  assert.deepEqual(lintFs({
    config,
    filesystem,
  }, {
    matcher,
  })(), result);
};

const tests = [
  {
    config: {
      ignores: [],
      rules: [],
    },
    filesystem: {
      paths () {
        return [
          '/correctPath.js',
          '/incorrectPath.js',
        ];
      },
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
    filesystem: {
      paths () {
        return [
          '/correctPath1.js',
          '/correctPath2.js',
        ];
      },
    },
    matcher: {
      isCorrect () {
        return [];
      },
    },
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
