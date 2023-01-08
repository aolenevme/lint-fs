import utils from '../../../utils/utils.js';

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

    if (mode === 'verbose' && correct.length !== 0) {
      const [
        , correctTitleError,
      ] = logger.log('\u001B[42m%s\u001B[0m', 'Correct Files');
      if (correctTitleError) {
        return utils.errors.wrap('reporter', correctTitleError);
      }

      const [
        , correctError,
      ] = logger.logBatch('\u001B[32m%s\u001B[0m', correct);
      if (correctError) {
        return utils.errors.wrap('reporter', correctError);
      }
    }

    if (incorrect.length !== 0) {
      const [
        , incorrectTitleError,
      ] = logger.log('\u001B[37m\u001B[41m%s\u001B[0m', '\nIncorrect Files');
      if (incorrectTitleError) {
        return utils.errors.wrap('reporter', incorrectTitleError);
      }

      const [
        , incorrectError,
      ] = logger.logBatch('\u001B[31m%s\u001B[0m', incorrect);
      if (incorrectError) {
        return utils.errors.wrap('reporter', incorrectError);
      }
    }

    if (excessives.length !== 0) {
      const [
        , excessivesTitleError,
      ] = logger.log('\u001B[37m\u001B[41m%s\u001B[0m', '\nExcessive Rules');
      if (excessivesTitleError) {
        return utils.errors.wrap('reporter', excessivesTitleError);
      }

      const [
        , excessivesError,
      ] = logger.logBatch('\u001B[31m%s\u001B[0m', excessives);
      if (excessivesError) {
        return utils.errors.wrap('reporter', excessivesError);
      }
    }

    return [];
  },
};

export default reporter;
