import assert from 'node:assert/strict';
import reporter from './reporter.js';

const testReporter = ({
  logger,
  paths,
  result,
}) => {
  const {
    correct,
    excessives,
    incorrect,
  } = paths;

  let correctCounter = 0;
  const correctProxied = correct && new Proxy(correct, {
    get (target, property) {
      if (property === 'length') {
        correctCounter++;
      }

      return target[property];
    },
  });

  let excessivesCounter = 0;
  const excessivesProxied = excessives && new Proxy(excessives, {
    get (target, property) {
      if (property === 'length') {
        excessivesCounter++;
      }

      return target[property];
    },
  });

  let incorrectCounter = 0;
  const incorrectProxied = incorrect && new Proxy(incorrect, {
    get (target, property) {
      if (property === 'length') {
        incorrectCounter++;
      }

      return target[property];
    },
  });

  const pathsProxied = {
    correct: correctProxied,
    excessives: excessivesProxied,
    incorrect: incorrectProxied,
  };

  assert.deepEqual(reporter.print(logger, pathsProxied), result);

  if (correct) {
    assert.deepEqual(correctCounter, 1);
  }

  if (excessives) {
    assert.deepEqual(excessivesCounter, 1);
  }

  if (incorrect) {
    assert.ok(incorrectCounter, 1);
  }
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
    paths: {
      correct: [
        'correct.js',
      ],
      excessives: [
        '/.\\/excessivesPath.js/u',
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
    paths: {
      correct: [
        'correct.js',
      ],
    },
    result: [
      undefined,
      'reporter: logger.log.correctTitle',
    ],
  },
  {
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
    paths: {
      correct: [
        'correct.js',
      ],
    },
    result: [
      undefined,
      'reporter: logger.logBatch.correct',
    ],
  },
  {
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
    paths: {
      correct: [],
      incorrect: [
        'incorrect.js',
      ],
    },
    result: [
      undefined,
      'reporter: logger.log.incorrectTitle',
    ],
  },
  {
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
    paths: {
      correct: [],
      incorrect: [
        'incorrect.js',
      ],
    },
    result: [
      undefined,
      'reporter: logger.logBatch.incorrect',
    ],
  },
  {
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
    paths: {
      correct: [],
      excessives: [
        '/.\\/excessivesPath.js/u',
      ],
      incorrect: [],
    },
    result: [
      undefined,
      'reporter: logger.log.excessivesTitleError',
    ],
  },
  {
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
    paths: {
      correct: [],
      excessives: [
        '/.\\/excessivesPath.js/u',
      ],
      incorrect: [],
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
