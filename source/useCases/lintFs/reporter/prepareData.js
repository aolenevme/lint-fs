const prepareData = ({
  correct,
  mode,
  incorrect,
  excessives,
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
        return mode === 'verbose' && correct.length !== 0;
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
        return incorrect.length !== 0;
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
        return excessives.length !== 0;
      },
    },
  ];
};

export default prepareData;
