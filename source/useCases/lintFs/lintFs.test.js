import assert from 'node:assert/strict';
import lintFs from './lintFs.js';

const testLintFs = async ({
  config,
  fail,
  filesystem,
  logger,
  matcher,
  reporter,
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
              /.\/correctPath.js/u,
            ],
          },
        ];
      },
    },
    fail (message) {
      assert.deepEqual(message, 'File System Structure is Incorrect! 💢');
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
    logger: {},
    matcher: {
      isCorrect (path, regExps) {
        assert.deepEqual(regExps, [
          /.\/correctPath.js/u,
        ]);

        const ok = 'Path.js';

        if (ok) {
          return [];
        }

        return [
          'testError',
        ];
      },
    },
    reporter: {
      print (testLogger, testPaths) {
        assert.deepEqual(testLogger, {});
        assert.deepEqual(testPaths, {
          correct: [
            './correctPath.js',
          ],
          incorrect: [
            './incorrectPath.js',
          ],
        });

        return [];
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
    reporter: {
      print (testLogger, testPaths) {
        assert.deepEqual(testPaths, {
          correct: [
            './correctPath1.js',
            './correctPath2.js',
          ],
          incorrect: [],
        });

        return [];
      },
    },
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
    fail (message) {
      assert.deepEqual(message, 'lintFs: filesystem.paths');
    },
    filesystem: {
      paths () {
        return [
          undefined,
          'filesystem.paths',
        ];
      },
    },
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
    fail (message) {
      assert.deepEqual(message, 'lintFs: config.read');
    },
    filesystem: {
      paths () {
        return [
          [],
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
            rules: [],
          },
        ];
      },
    },
    fail (message) {
      assert.deepEqual(message, 'lintFs: reporter.print');
    },
    filesystem: {
      paths () {
        return [
          [],
        ];
      },
    },
    reporter: {
      print () {
        return [
          'reporter.print',
        ];
      },
    },
  },
];

for (const test of tests) {
  await testLintFs(test);
}
