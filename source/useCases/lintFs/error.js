import utils from '../../utils/utils.js';

const error = ({
  excessives,
  incorrect,
}) => {
  const isIncorrect = incorrect.length;
  if (isIncorrect) {
    return utils.errors.wrap('lintFs', 'File System Structure is Incorrect!');
  }

  const isExcessive = excessives.length;
  if (isExcessive) {
    return utils.errors.wrap('lintFs', 'Excessive Config!');
  }

  return [];
};

export default error;
