import utils from '../../../utils/utils.js';
import prepareData from './prepareData.js';
import print from './print.js';

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

    const prepared = prepareData({
      correct,
      excessives,
      incorrect,
      mode,
    });

    for (const data of prepared) {
      const info = {
        ...data,
        logger,
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
