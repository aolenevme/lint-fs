const log = (std, text) => {
  std.log(text);
};

const logger = ({
  std,
}) => {
  return {
    log: (text) => {
      log(std, text);
    },
    logBatch: (texts) => {
      for (const text of texts) {
        log(std, text);
      }
    },
  };
};

export default logger;
