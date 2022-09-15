import assert from 'node:assert/strict';
import reporter from './reporter.js';

const testReporter = ({
  logger,
  paths,
  result,
}) => {
  assert.deepEqual(reporter.print(logger, paths), result);
};

const tests = [
  {
    logger: {
      logBatch (format, texts) {
        assert.ok([
          '\u001B[32m%s\u001B[0m',
          '\u001B[31m%s\u001B[0m',
        ].includes(format));

        const hasCorrect = texts[0] === 'correct.js';
        const hasIncorrect = texts[0] === 'incorrect.js';

        assert.ok(hasCorrect || hasIncorrect);
      },
    },
    paths: {
      correct: [
        'correct.js',
      ],
      incorrect: [
        'incorrect.js',
      ],
    },
    result: [],
  },
  {
    logger: {
      logBatch () {
        throw new Error('logger.logBatch');
      },
    },
    paths: {},
    result: [
      'reporter: logger.logBatch',
    ],
  },
];

for (const test of tests) {
  testReporter(test);
}
