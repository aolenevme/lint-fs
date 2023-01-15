import utils from '../../utils/utils.js';
import parse from './parse.js';

const isModeValid = (mode) => {
  const modes = [
    'silent',
    'verbose',
  ];
  const isValid = modes.includes(mode);

  return isValid;
};

const config = (dependencies) => {
  return {
    read: async (options) => {
      const [
        parsedConfig,
        parseError,
      ] = await parse({
        dependencies,
        options,
      });
      if (parseError) {
        return utils.errors.wrap(
          'read',
          parseError,
        );
      }

      const {
        ignoreRegExps: ignores,
        mode,
        rulesRegExps: rules,
      } = parsedConfig;

      const isValid = isModeValid(mode);
      if (!isValid) {
        return utils.errors.wrap(
          'read',
          'the valid mode configuration is \'silent\' or \'verbose\'',
        );
      }

      return [
        {
          ignores,
          mode,
          rules,
        },
      ];
    },
  };
};

export default config;
