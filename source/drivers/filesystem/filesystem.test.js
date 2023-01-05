import assert from 'node:assert/strict';
import filesystem from './filesystem.js';

const testFilesystem = async ({
  fs,
  result,
  root,
}) => {
  assert.deepEqual(
    await filesystem({
      fs,
    }).paths(root),
    result,
  );
};

const tests = [
  {
    fs: {
      readdir (candidate) {
        assert.deepEqual(candidate, '.');

        return [
          'test.js',
        ];
      },
      stat (candidate) {
        const result = candidate === '.';

        return {
          isDirectory () {
            return result;
          },
        };
      },
    },
    result: [
      [
        './test.js',
      ],
    ],
    root: '.',
  },
  {
    fs: {
      stat () {
        throw new Error('fs-stat');
      },
    },
    result: [
      undefined,
      'paths: fs-stat',
    ],
    root: '.',
  },
];

for (const test of tests) {
  await testFilesystem(test);
}
