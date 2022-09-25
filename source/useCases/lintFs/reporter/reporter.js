const wrapMessage = (message) => {
  return [
    undefined,
    `reporter: ${message}`,
  ];
};

const reporter = {
  print (logger, paths) {
    const {
      correct,
      incorrect,
    } = paths;

    const [
      _,
      titleMessage,
    ] = logger.log('\u001B[4m\u001B[36m%s\u001B[0m', 'File System is Linted!📐\n');
    if (titleMessage) {
      return wrapMessage(titleMessage);
    }

    if (correct.length) {
      const [
        _,
        correctMessage,
      ] = logger.log('\u001B[42m%s\u001B[0m', 'Correct Files');
      if (correctMessage) {
        return wrapMessage(correctMessage);
      }
    }

    logger.logBatch('\u001B[32m%s\u001B[0m', correct);

    if (incorrect.length) {
      logger.log('\u001B[37m\u001B[41m%s\u001B[0m', '\nIncorrect Files');
    }

    logger.logBatch('\u001B[31m%s\u001B[0m', incorrect);

    return [];
  },
};

export default reporter;
