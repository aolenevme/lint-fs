import assert from 'node:assert/strict';
import lintFs from './lintFs.js';

let counter = 0;

const testLintFs = async ({
  config,
  fail,
  filesystem,
  logger,
  matcher,
  reporter,
  result,
}) => {
  counter = 0;

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
              /.\/ignorePath.js/u,
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
            './ignorePath.js',
          ],
        ];
      },
    },
    matcher: {
      isCorrect (path, regExps) {
        assert.deepEqual(regExps, [
          /.\/ignorePath.js/u,
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
        counter++;

        const ok = counter % 2 === 0;
        const errorMessage = counter % 2 === 1 ? undefined : 'rulesError';

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
];

for (const test of tests) {
  await testLintFs(test);
}
