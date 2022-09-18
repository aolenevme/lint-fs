const reporter = {
  print (logger, paths) {
    try {
      const {
        correct,
        incorrect,
      } = paths;

      logger.log('\u001B[4m\u001B[36m%s\u001B[0m', 'File System is Linted!📐\n');

      if (correct.length > 0) {
        logger.log('\u001B[42m%s\u001B[0m', 'Correct Files');
        logger.logBatch('\u001B[32m%s\u001B[0m', correct);
      }

      if (incorrect.length > 0) {
        logger.log('\u001B[37m\u001B[41m%s\u001B[0m', '\nIncorrect Files');
        logger.logBatch('\u001B[31m%s\u001B[0m', incorrect);
      }

      return [];
    } catch (error) {
      return [
        `reporter: ${error.message}`,
      ];
    }
  },
};

export default reporter;
