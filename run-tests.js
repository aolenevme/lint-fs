/* c8 ignore start */
import childProcess from 'node:child_process';

childProcess.exec(
  'find ./source -name \'*.test.js\'',
  (error, stdout, stderr) => {
    if (error) {
      throw error;
    }

    if (stderr) {
      throw new Error(stderr);
    }

    const testPathes = stdout.trim().split('\n');

    for (const path of testPathes) {
      childProcess.exec(`node ${path}`, (testError, testStdout, testStderr) => {
        if (testError) {
          throw testError;
        }

        if (testStderr) {
          throw new Error(testStderr);
        }
      });
    }
  },
);
/* c8 ignore stop */
