import utils from '../../../utils/utils.js';
import logData from './logData.js';

const print = ({
  logBatchArguments,
  logArguments,
  logger,
  shouldReport,
}) => {
  if (shouldReport()) {
    const [
      , titleError,
    ] = logger.log(...logArguments);
    if (titleError) {
      return titleError;
    }

    const [
      , batchError,
    ] = logger.logBatch(...logBatchArguments);
    if (batchError) {
      return batchError;
    }
  }

  return '';
};

const reporter = {
  print (logger, {
    correct,
    excessives,
    incorrect,
    mode,
  }) {
    const [
      , titleError,
    ] = logger.log('\u001B[4m\u001B[36m%s\u001B[0m', 'File System is Linted!📐\n');
    if (titleError) {
      return utils.errors.wrap('reporter', titleError);
    }

    const reportData = [
      {
        batch: correct,
        shouldReport: () => {
          return mode === 'verbose' && correct.length !== 0;
        },
      },
      {
        batch: incorrect,
        shouldReport: () => {
          return incorrect.length !== 0;
        },
      },
      {
        batch: excessives,
        shouldReport: () => {
          return excessives.length !== 0;
        },
      },
    ];

    for (const [
      index,
      {
        batch,
        shouldReport,
      },
    ] of reportData.entries()) {
      const {
        logArguments,
        defineBatchArguments,
      } = logData[index];

      const info = {
        logArguments,
        logBatchArguments: defineBatchArguments(batch),
        logger,
        shouldReport,
      };

      const error = print(info);
      if (error) {
        return utils.errors.wrap('reporter', error);
      }
    }

    return [];
  },
};

export default reporter;
