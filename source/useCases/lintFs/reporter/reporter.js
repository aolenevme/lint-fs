const reporter = {
  print (logger, paths) {
    try {
      const {
        correct,
        incorrect,
      } = paths;

      logger.logBatch('\u001B[32m%s\u001B[0m', correct);
      logger.logBatch('\u001B[31m%s\u001B[0m', incorrect);

      return [];
    } catch (error) {
      return [
        `reporter: ${error.message}`,
      ];
    }
  },
};

export default reporter;
