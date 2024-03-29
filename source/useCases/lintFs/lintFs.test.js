import lintFs from './lintFs.js';
import assert from 'node:assert/strict';

const testLintFs = async ({
  config,
  fail,
  filesystem,
  logger,
  matcher,
  reporter,
  result,
}) => {
  assert.deepEqual(
    await lintFs(
      {
        config,
        fail,
        filesystem,
        logger,
      },
      {
        matcher,
        reporter,
      },
    )(),
    result,
  );
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
            mode: 'verbose',
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
            mode: 'verbose',
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
            mode: 'verbose',
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
      'lintFs: validate: ignoresError',
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
            mode: 'verbose',
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
        return this.results.shift();
      },
      results: [
        [
          '',
        ],
        [
          undefined,
          'rulesError',
        ],
      ],
    },
    result: [
      undefined,
      'lintFs: validate: rulesError',
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
            mode: 'verbose',
            rules: [
              /.\/rulesPath1.js/u,
              /.\/rulesPath2.js/u,
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
            './rulesPath1.js',
          ],
        ];
      },
    },
    logger: {},
    matcher: {
      isCorrect () {
        return this.results.shift();
      },
      results: [
        [
          '/.\\/ignoresPath.js/u',
        ],
        [
          '',
        ],
        [
          '/.\\/rulesPath1.js/u',
        ],
      ],
    },
    reporter: {
      print (logger, report) {
        assert.deepEqual(logger, {});
        assert.deepEqual(report, {
          correct: [
            './rulesPath1.js',
          ],
          excessives: [
            '/.\\/rulesPath2.js/u',
          ],
          incorrect: [],
          mode: 'verbose',
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
            mode: 'verbose',
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
            './incorrectPath.js',
          ],
        ];
      },
    },
    logger: {},
    matcher: {
      isCorrect () {
        return [
          '',
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
      'lintFs: File System Structure is Incorrect!',
    ],
  },
  {
    config: {
      read () {
        return [
          {
            ignores: [],
            mode: 'verbose',
            rules: [
              /.\/correctPath\d.js/u,
              /.\/correctPath1.js/u,
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
          ],
        ];
      },
    },
    logger: {},
    matcher: {
      isCorrect () {
        return [
          '/.\\/correctPath\\d.js/u',
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
      'lintFs: Excessive Config!',
    ],
  },
  {
    config: {
      read () {
        return [
          {
            ignores: [],
            mode: 'verbose',
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
