import assert from 'node:assert/strict';
import lintFs from './lintFs.js';

const testLintFs = async ({
  config,
  matcher,
  filesystem,
  result,
}) => {
  assert.deepEqual(await lintFs({
    config,
    filesystem,
  }, {
    matcher,
  })(), result);
};

const tests = [
  {
    config: {
      read (options) {
        assert.deepEqual(options, {
          encoding: 'utf8',
          fileName: './lint-fs.yaml',
        });

        return [
          {
            ignores: [],
            rules: [
              './correctPath.js',
            ],
          },
        ];
      },
    },
    filesystem: {
      paths (root) {
        assert.deepEqual(root, '.');

        return [
          [
            './correctPath.js',
            './incorrectPath.js',
          ],
        ];
      },
    },
    matcher: {
      isCorrect (testConfig, path) {
        assert.deepEqual(testConfig, {
          ignores: [],
          rules: [
            './correctPath.js',
          ],
        });

        const ok = path === './correctPath.js';

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
          './correctPath.js',
        ],
        incorrect: [
          './incorrectPath.js',
        ],
      },
    ],
  },
  {
    config: {
      read () {
        return [
          {
            ignores: [],
            rules: [
              './correctPath\\d.js',
            ],
          },
        ];
      },
    },
    filesystem: {
      paths () {
        return [
          [
            './correctPath1.js',
            './correctPath2.js',
          ],
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
          './correctPath1.js',
          './correctPath2.js',
        ],
        incorrect: [],
      },
    ],
  },
  {
    config: {
      read () {
        return [
          {
            ignores: [],
            rules: [],
          },
        ];
      },
    },
    filesystem: {
      paths () {
        return [
          undefined,
          'filesystem.paths',
        ];
      },
    },
    matcher: {},
    result: [
      undefined,
      'lintFs: filesystem.paths',
    ],
  },
  {
    config: {
      read () {
        return [
          undefined,
          'config.read',
        ];
      },
    },
    filesystem: {
      paths () {
        return [
          [],
        ];
      },
    },
    matcher: {},
    result: [
      undefined,
      'lintFs: config.read',
    ],
  },

];

for (const test of tests) {
  testLintFs(test);
}
