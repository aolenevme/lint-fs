const logData = [
  {
    defineBatchArguments: (batch) => {
      return [
        '\u001B[32m%s\u001B[0m',
        batch,
      ];
    },
    logArguments: [
      '\u001B[42m%s\u001B[0m',
      'Correct Files',
    ],
  },
  {
    defineBatchArguments: (batch) => {
      return [
        '\u001B[31m%s\u001B[0m',
        batch,
      ];
    },
    logArguments: [
      '\u001B[37m\u001B[41m%s\u001B[0m',
      '\nIncorrect Files',
    ],
  },
  {
    defineBatchArguments: (batch) => {
      return [
        '\u001B[31m%s\u001B[0m',
        batch,
      ];
    },
    logArguments: [
      '\u001B[37m\u001B[41m%s\u001B[0m',
      '\nExcessive Rules',
    ],
  },
];

export default logData;
