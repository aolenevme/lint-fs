const log = (format, std, text) => {
  std.log(format, text);
};

const logger = ({
  std,
}) => {
  return {
    log: (format, text) => {
      log(format, std, text);
    },
    logBatch: (format, texts) => {
      for (const text of texts) {
        log(format, std, text);
      }
    },
  };
};

export default logger;
