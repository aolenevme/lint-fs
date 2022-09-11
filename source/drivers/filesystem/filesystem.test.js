import assert from 'node:assert/strict';
import filesystem from './filesystem.js';

const testFilesystem = async ({
  fs,
  result,
  root,
}) => {
  assert.deepEqual(await filesystem({
    fs,
  }).paths(root), result);
};

const tests = [
  {
    fs: {
      stat (candidate) {
        assert.deepEqual(candidate, './');

        return {
          isDirectory () {
            return true;
          },
        };
      },
    },
    result: [
      [
        './',
      ],
    ],
    root: './',
  },
];

for (const test of tests) {
  testFilesystem(test);
}

