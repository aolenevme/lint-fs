import utils from '../../utils/utils.js';

const {
  errors,
} = utils;

const log = ({
  format,
  std,
  text,
}) => {
  std.log(format, text);
};

const logger = ({
  std,
}) => {
  return {
    log: (format, text) => {
      try {
        log({
          format,
          std,
          text,
        });

        return [];
      } catch (error) {
        return errors.wrap('log', error.message);
      }
    },
    logBatch: (format, texts) => {
      try {
        for (const text of texts) {
          log({
            format,
            std,
            text,
          });
        }

        return [];
      } catch (error) {
        return errors.wrap('logBatch', error.message);
      }
    },
  };
};

export default logger;
