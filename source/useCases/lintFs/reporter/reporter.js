import utils from '../../../utils/utils.js';

const {
  errors,
} = utils;

const reporter = {
  print (logger, paths) {
    const {
      correct,
      incorrect,
    } = paths;

    const [
      _title,
      titleError,
    ] = logger.log('\u001B[4m\u001B[36m%s\u001B[0m', 'File System is Linted!📐\n');
    if (titleError) {
      return errors.wrap('reporter', titleError);
    }

    if (correct.length) {
      const [
        _correctTitle,
        correctTitleError,
      ] = logger.log('\u001B[42m%s\u001B[0m', 'Correct Files');
      if (correctTitleError) {
        return errors.wrap('reporter', correctTitleError);
      }

      const [
        _correct,
        correctError,
      ] = logger.logBatch('\u001B[32m%s\u001B[0m', correct);
      if (correctError) {
        return errors.wrap('reporter', correctError);
      }
    }

    if (incorrect.length) {
      const [
        _incorrectTitle,
        incorrectTitleError,
      ] = logger.log('\u001B[37m\u001B[41m%s\u001B[0m', '\nIncorrect Files');
      if (incorrectTitleError) {
        return errors.wrap('reporter', incorrectTitleError);
      }

      const [
        _incorrect,
        incorrectError,
      ] = logger.logBatch('\u001B[31m%s\u001B[0m', incorrect);
      if (incorrectError) {
        return errors.wrap('reporter', incorrectError);
      }
    }

    return [];
  },
};

export default reporter;
