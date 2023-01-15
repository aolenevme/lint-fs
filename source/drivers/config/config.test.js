import assert from 'node:assert/strict';
import config from './config.js';

const testConfig = async ({
  fs,
  options,
  result,
  yaml,
}) => {
  assert.deepEqual(
    await config({
      fs,
      yaml,
    }).read(options),
    result,
  );
};

const tests = [
  {
    fs: {
      readFile (fileName, encoding) {
        assert.deepEqual(fileName, './config.yaml');
        assert.deepEqual(encoding, 'utf8');

        return 'file';
      },
    },
    options: {
      encoding: 'utf8',
      fileName: './config.yaml',
    },
    result: [
      {
        ignores: [
          /^node_modules/u,
        ],
        mode: 'verbose',
        rules: [
          /^.\/[A-Z]+.md$/u,
        ],
      },
    ],
    yaml: {
      load (file) {
        assert.deepEqual(file, 'file');

        return {
          ignores: [
            '^node_modules',
          ],
          mode: 'verbose',
          rules: [
            '^./[A-Z]+.md$',
          ],
        };
      },
    },
  },
  {
    fs: {
      readFile () {
        return 'file';
      },
    },
    options: {},
    result: [
      {
        ignores: [],
        mode: 'verbose',
        rules: [],
      },
    ],
    yaml: {
      load () {
        return {
          mode: 'verbose',
        };
      },
    },
  },
  {
    fs: {
      readFile () {
        return 'file';
      },
    },
    options: {},
    result: [
      {
        ignores: [],
        mode: 'verbose',
        rules: [],
      },
    ],
    yaml: {
      load () {
        return {
          mode: 'verbose',
        };
      },
    },
  },
  {
    fs: {
      readFile () {
        return 'file';
      },
    },
    options: {},
    result: [
      undefined,
      'read: parse: createRegExps: Invalid regular expression: /[/: Unterminated character class',
    ],
    yaml: {
      load () {
        return {
          ignores: [
            '[',
          ],
          rules: [],
        };
      },
    },
  },
  {
    fs: {
      readFile () {
        return 'file';
      },
    },
    options: {},
    result: [
      undefined,
      'read: parse: createRegExps: Invalid regular expression: /]/: Lone quantifier brackets',
    ],
    yaml: {
      load () {
        return {
          ignores: [],
          rules: [
            ']',
          ],
        };
      },
    },
  },
  {
    fs: {
      readFile () {
        return 'file';
      },
    },
    options: {},
    result: [
      {
        ignores: [],
        mode: 'silent',
        rules: [],
      },
    ],
    yaml: {
      load () {
        return {
          ignores: [],
          mode: 'silent',
          rules: [],
        };
      },
    },
  },
  {
    fs: {
      readFile () {
        return 'file';
      },
    },
    options: {},
    result: [
      undefined,
      'read: the valid mode configuration is \'silent\' or \'verbose\'',
    ],
    yaml: {
      load () {
        return {
          ignores: [],
          mode: 'wrong-mode',
          rules: [],
        };
      },
    },
  },
  {
    fs: {
      readFile () {
        throw new Error('file');
      },
    },
    options: {
      encoding: 'utf8',
      fileName: './config.yaml',
    },
    result: [
      undefined,
      'read: parse: load: file',
    ],
  },
];

for (const test of tests) {
  await testConfig(test);
}
