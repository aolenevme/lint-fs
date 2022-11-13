import utils from '../../../utils/utils.js';

const {
  errors,
} = utils;

const matcher = {
  isCorrect (path, regs) {
    try {
      for (const reg of regs) {
        const ok = reg.test(path);

        if (ok) {
          const stringified = `${reg}`;

          return [
            stringified,
          ];
        }
      }

      return [
        '',
      ];
    } catch (error) {
      return errors.wrap('isCorrect', error);
    }
  },
};

export default matcher;
