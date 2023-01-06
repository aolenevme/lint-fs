/* c8 ignore start */
import childProcess from 'node:child_process';
import util from 'node:util';

const exec = util.promisify(childProcess.exec);

const runTests = async () => {
  const {
    stdout: findStdOut,
    stderr: findStdError,
  } = await exec('find ./source -name \'*.test.js\'');

  if (findStdError) {
    throw new Error(findStdError);
  }

  const testPathes = findStdOut.trim().split('\n');

  for (const path of testPathes) {
    const {
      stderr: testStderr,
    } = await exec(`node ${path}`);

    if (testStderr) {
      throw new Error(testStderr);
    }
  }
};

await runTests();

/* c8 ignore stop */
