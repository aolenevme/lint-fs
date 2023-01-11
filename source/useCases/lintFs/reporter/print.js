const print = ({
  logArguments,
  logBatchArguments,
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

export default print;
