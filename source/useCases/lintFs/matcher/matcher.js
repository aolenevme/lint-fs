import utils from '../../../utils/utils.js';

const {
  errors,
} = utils;

const isOk = (path, regExps) => {
  for (const regExp of regExps) {
    const ok = regExp.test(path);

    if (ok) {
      return true;
    }
  }

  return false;
};

const matcher = {
  isCorrect (path, regExps) {
    try {
      const ok = isOk(path, regExps);

      return [
        ok,
      ];
    } catch (error) {
      return errors.wrap('isCorrect', error);
    }
  },
};

export default matcher;
