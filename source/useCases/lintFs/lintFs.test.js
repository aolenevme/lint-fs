import assert from 'node:assert/strict';
import lintFs from './lintFs.js';

const testLintFs = async ({
  config,
  fail,
  filesystem,
  matcher,
}) => {
  await lintFs({
    config,
    fail,
    filesystem,
    logger,
  }, {
    matcher,
    reporter,
  })();
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
   reporter: {
     print (testLogger, testPaths) {
       assert.deepEqual 
     }
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
