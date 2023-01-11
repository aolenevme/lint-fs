import utils from '../../../utils/utils.js';

const matcher = {
  isCorrect (path, regExps) {
    try {
      for (const regExp of regExps) {
        const ok = regExp.test(path);

        if (ok) {
          return [
            `${regExp}`,
          ];
        }
      }

      return [
        '',
      ];
    } catch (error) {
      return utils.errors.wrap('isCorrect', error);
    }
  },
};

export default matcher;
