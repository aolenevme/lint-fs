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
      log (format, text) {
        const formats = [
          '\u001B[4m\u001B[36m%s\u001B[0m',
          '\u001B[42m%s\u001B[0m',
          '\u001B[37m\u001B[41m%s\u001B[0m',
        ];

        const texts = [
          'File System is Linted!📐\n',
          'Correct Files',
          '\nIncorrect Files',
        ];

        assert.ok(formats.includes(format));
        assert.ok(texts.includes(text));

        return [];
      },
      logBatch (format, texts) {
        assert.ok([
          '\u001B[32m%s\u001B[0m',
          '\u001B[31m%s\u001B[0m',
        ].includes(format));

        const hasCorrect = texts[0] === 'correct.js';
        const hasIncorrect = texts[0] === 'incorrect.js';

        assert.ok(hasCorrect || hasIncorrect);

        return [];
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
      log () {
        return [
          undefined,
          'logger.log.title',
        ];
      },
    },
    paths: {},
    result: [
      undefined,
      'reporter: logger.log.title',
    ],
  },
  {
    logger: {
      log (format, text) {
        if (text === 'Correct Files') {
          return [
            undefined,
            'logger.log.title',
          ];
        }

        return [];
      },
    },
    paths: {
      correct: [
        'correct.js',
      ],
    },
    result: [
      undefined,
      'reporter: logger.log.title',
    ],
  },
];

for (const test of tests) {
  testReporter(test);
}
