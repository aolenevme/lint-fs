import utils from '../../../utils/utils.js';

const {
  errors,
} = utils;

const reporter = {
  print (logger, {
    correct,
    excessives,
    incorrect,
  }) {
    const [
      , titleError,
    ] = logger.log('\u001B[4m\u001B[36m%s\u001B[0m', 'File System is Linted!📐\n');
    if (titleError) {
      return errors.wrap('reporter', titleError);
    }

    if (correct.length) {
      const [
        , correctTitleError,
      ] = logger.log('\u001B[42m%s\u001B[0m', 'Correct Files');
      if (correctTitleError) {
        return errors.wrap('reporter', correctTitleError);
      }

      const [
        , correctError,
      ] = logger.logBatch('\u001B[32m%s\u001B[0m', correct);
      if (correctError) {
        return errors.wrap('reporter', correctError);
      }
    }

    if (incorrect.length) {
      const [
        , incorrectTitleError,
      ] = logger.log('\u001B[37m\u001B[41m%s\u001B[0m', '\nIncorrect Files');
      if (incorrectTitleError) {
        return errors.wrap('reporter', incorrectTitleError);
      }

      const [
        , incorrectError,
      ] = logger.logBatch('\u001B[31m%s\u001B[0m', incorrect);
      if (incorrectError) {
        return errors.wrap('reporter', incorrectError);
      }
    }

    if (excessives.length) {
      const [
        , excessivesTitleError,
      ] = logger.log('\u001B[37m\u001B[41m%s\u001B[0m', '\nExcessive Rules');
      if (excessivesTitleError) {
        return errors.wrap('reporter', excessivesTitleError);
      }

      const [
        , excessivesError,
      ] = logger.logBatch('\u001B[31m%s\u001B[0m', excessives);
      if (excessivesError) {
        return errors.wrap('reporter', excessivesError);
      }
    }

    return [];
  },
};

export default reporter;
