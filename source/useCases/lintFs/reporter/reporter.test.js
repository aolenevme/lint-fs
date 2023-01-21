import assert from 'node:assert/strict';
import reporter from './reporter.js';

const testReporter = ({
  info,
  logger,
  result,
}) => {
  assert.deepEqual(reporter.print(logger, info), result);
};

const tests = [
  {
    info: {
      correct: [
        'correct.js',
      ],
      excessives: [
        '/.\\/excessivesPath.js/u',
      ],
      incorrect: [
        'incorrect.js',
      ],
      mode: 'verbose',
    },
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
          '\nExcessive Rules',
        ];

        assert.ok(formats.includes(format));
        assert.ok(texts.includes(text));

        return [];
      },
      logBatch (format) {
        assert.ok([
          '\u001B[32m%s\u001B[0m',
          '\u001B[31m%s\u001B[0m',
        ].includes(format));

        return [];
      },
    },
    result: [],
  },
  {
    info: {},
    logger: {
      log () {
        return [
          undefined,
          'logger.log.title',
        ];
      },
    },
    result: [
      undefined,
      'reporter: logger.log.title',
    ],
  },
  {
    info: {
      correct: [
        'correct.js',
      ],
      mode: 'verbose',
    },
    logger: {
      log (_, text) {
        if (text === 'Correct Files') {
          return [
            undefined,
            'logger.log.correctTitle',
          ];
        }

        return [];
      },
    },
    result: [
      undefined,
      'reporter: logger.log.correctTitle',
    ],
  },
  {
    info: {
      correct: [
        'correct.js',
      ],
      mode: 'verbose',
    },
    logger: {
      log () {
        return [];
      },
      logBatch () {
        return [
          undefined,
          'logger.logBatch.correct',
        ];
      },
    },
    result: [
      undefined,
      'reporter: logger.logBatch.correct',
    ],
  },
  {
    info: {
      correct: [],
      incorrect: [
        'incorrect.js',
      ],
    },
    logger: {
      log (_, text) {
        if (text === '\nIncorrect Files') {
          return [
            undefined,
            'logger.log.incorrectTitle',
          ];
        }

        return [];
      },
    },
    result: [
      undefined,
      'reporter: logger.log.incorrectTitle',
    ],
  },
  {
    info: {
      correct: [],
      incorrect: [
        'incorrect.js',
      ],
    },
    logger: {
      log () {
        return [];
      },
      logBatch () {
        return [
          undefined,
          'logger.logBatch.incorrect',
        ];
      },
    },
    result: [
      undefined,
      'reporter: logger.logBatch.incorrect',
    ],
  },
  {
    info: {
      correct: [],
      excessives: [
        '/.\\/excessivesPath.js/u',
      ],
      incorrect: [],
    },
    logger: {
      log (_, text) {
        if (text === '\nExcessive Rules') {
          return [
            undefined,
            'logger.log.excessivesTitleError',
          ];
        }

        return [];
      },
    },
    result: [
      undefined,
      'reporter: logger.log.excessivesTitleError',
    ],
  },
  {
    info: {
      correct: [],
      excessives: [
        '/.\\/excessivesPath.js/u',
      ],
      incorrect: [],
    },
    logger: {
      log () {
        return [];
      },
      logBatch () {
        return [
          undefined,
          'logger.logBatch.excessivesError',
        ];
      },
    },
    result: [
      undefined,
      'reporter: logger.logBatch.excessivesError',
    ],
  },
];

for (const test of tests) {
  testReporter(test);
}
