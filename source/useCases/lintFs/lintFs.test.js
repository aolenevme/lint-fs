import assert from 'node:assert/strict';
import lintFs from './lintFs.js';

let isCorrectCounter = 0;

const testLintFs = async ({
  config,
  fail,
  filesystem,
  logger,
  matcher,
  reporter,
  result,
}) => {
  isCorrectCounter = 0;

  assert.deepEqual(await lintFs({
    config,
    fail,
    filesystem,
    logger,
  }, {
    matcher,
    reporter,
  })(), result);
};

const tests = [
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
    result: [
      undefined,
      'lintFs: config.read',
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
    result: [
      undefined,
      'lintFs: filesystem.paths',
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
          [],
        ];
      },
    },
    reporter: {
      print () {
        return [
          undefined,
          'reporter.print',
        ];
      },
    },
    result: [
      undefined,
      'lintFs: reporter.print',
    ],
  },
  {
    config: {
      read (options) {
        assert.deepEqual(options, {
          encoding: 'utf8',
          fileName: './lint-fs.yaml',
        });

        return [
          {
            ignores: [
              /.\/ignoresPath.js/u,
            ],
            rules: [],
          },
        ];
      },
    },
    filesystem: {
      paths (root) {
        assert.deepEqual(root, '.');

        return [
          [
            './ignoresPath.js',
          ],
        ];
      },
    },
    matcher: {
      isCorrect (path, regExps) {
        assert.deepEqual(regExps, [
          /.\/ignoresPath.js/u,
        ]);

        return [
          undefined,
          'ignoresError',
        ];
      },
    },
    result: [
      undefined,
      'lintFs: ignoresError',
    ],
  },
  {
    config: {
      read () {
        return [
          {
            ignores: [
              /.\/ignorePath.js/u,
            ],
            rules: [
              /.\/rulesPath.js/u,
            ],
          },
        ];
      },
    },
    filesystem: {
      paths () {
        return [
          [
            './ignorePath.js',
            './rulesPath.js',
          ],
        ];
      },
    },
    matcher: {
      isCorrect () {
        isCorrectCounter++;

        const ok = isCorrectCounter % 2 === 0;
        const errorMessage = isCorrectCounter % 2 === 1 ? undefined : 'rulesError';

        return [
          ok,
          errorMessage,
        ];
      },
    },
    result: [
      undefined,
      'lintFs: rulesError',
    ],
  },

  {
    config: {
      read () {
        return [
          {
            ignores: [
              /.\/ignoresPath.js/u,
            ],
            rules: [
              /.\/rulesPath.js/u,
            ],
          },
        ];
      },
    },
    filesystem: {
      paths () {
        return [
          [
            './ignoresPath.js',
            './rulesPath.js',
          ],
        ];
      },
    },
    logger: {},
    matcher: {
      isCorrect () {
        isCorrectCounter++;

        return [
          isCorrectCounter % 2 === 1,
        ];
      },
    },
    reporter: {
      print (logger, report) {
        assert.deepEqual(logger, {});
        assert.deepEqual(report, {
          correct: [
            './rulesPath.js',
          ],
          incorrect: [],
        });

        return [
          undefined,
          'reporterError',
        ];
      },
    },
    result: [
      undefined,
      'lintFs: reporterError',
    ],
  },
  {
    config: {
      read () {
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
    filesystem: {
      paths () {
        return [
          [
            './incorretPath.js',
          ],
        ];
      },
    },
    logger: {},
    matcher: {
      isCorrect () {
        return [
          false,
        ];
      },
    },
    reporter: {
      print () {
        return [];
      },
    },
    result: [
      undefined,
      'File System Structure is Incorrect! 💢',
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
          [],
        ];
      },
    },
    logger: {},
    reporter: {
      print () {
        return [];
      },
    },
    result: [],
  },
];

for (const test of tests) {
  await testLintFs(test);
}
