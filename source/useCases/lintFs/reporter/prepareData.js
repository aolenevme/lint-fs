const getCorrect = ({
  correct,
  mode,
}) => {
  switch (mode) {
  case 'verbose':
    return correct;
  default:
    return [];
  }
};

const prepareData = ({
  correct,
  excessives,
  incorrect,
  mode,
}) => {
  return [
    {
      batch: correct,
      logArguments: [
        '\u001B[42m%s\u001B[0m',
        'Correct Files',
      ],
      logBatchArguments: [
        '\u001B[32m%s\u001B[0m',
        correct,
      ],
      shouldReport: () => {
        return getCorrect({
          correct,
          mode,
        }).at(0);
      },
    },
    {
      batch: incorrect,
      logArguments: [
        '\u001B[37m\u001B[41m%s\u001B[0m',
        '\nIncorrect Files',
      ],

      logBatchArguments: [
        '\u001B[31m%s\u001B[0m',
        incorrect,
      ],
      shouldReport: () => {
        return incorrect.at(0);
      },
    },
    {
      batch: excessives,
      logArguments: [
        '\u001B[37m\u001B[41m%s\u001B[0m',
        '\nExcessive Rules',
      ],

      logBatchArguments: [
        '\u001B[31m%s\u001B[0m',
        excessives,
      ],
      shouldReport: () => {
        return excessives.at(0);
      },
    },
  ];
};

export default prepareData;
