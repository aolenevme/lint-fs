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
      titleResult,
      titleMessage,
    ] = logger.log('\u001B[4m\u001B[36m%s\u001B[0m', 'File System is Linted!📐\n');
    if (titleMessage) {
      return wrapMessage(titleMessage);
    }

    if (correct.length) {
      const [
        correctTitleResult,
        correctTitleMessage,
      ] = logger.log('\u001B[42m%s\u001B[0m', 'Correct Files');
      if (correctTitleMessage) {
        return wrapMessage(correctTitleMessage);
      }

      const [
        correctResult,
        correctMessage,
      ] = logger.logBatch('\u001B[32m%s\u001B[0m', correct);
      if (correctMessage) {
        return wrapMessage(correctMessage);
      }
    }

    if (incorrect.length) {
      const [
        incorrectTitleResult,
        incorrectTitleMessage,
      ] = logger.log('\u001B[37m\u001B[41m%s\u001B[0m', '\nIncorrect Files');
      if (incorrectTitleMessage) {
        return wrapMessage(incorrectTitleMessage);
      }

      const [
        incorrectResult,
        incorrectMessage,
      ] = logger.logBatch('\u001B[31m%s\u001B[0m', incorrect);
      if (incorrectMessage) {
        return wrapMessage(incorrectMessage);
      }
    }

    return [];
  },
};

export default reporter;
