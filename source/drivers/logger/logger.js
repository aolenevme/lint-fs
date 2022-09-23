const log = (format, std, text) => {
  std.log(format, text);
};

const logger = ({
  std,
}) => {
  return {
    log: (format, text) => {
      try {
        log(format, std, text);

        return [];
      } catch (error) {
        return [
          undefined,
          `log: ${error.message}`,
        ];
      }
    },
    logBatch: (format, texts) => {
      try {
        for (const text of texts) {
          log(format, std, text);
        }

        return [];
      } catch (error) {
        return [
          undefined,
          `logBatch: ${error.message}`,
        ];
      }
    },
  };
};

export default logger;
