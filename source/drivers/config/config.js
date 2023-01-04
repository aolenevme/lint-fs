import utils from '../../utils/utils.js';
import helpers from './helpers.js';

const config = ({
  fs,
  yaml,
}) => {
  return {
    read: async (options) => {
      const [
        loadedConfig,
        loadedConfigError,
      ] = await helpers.load(
        {
          fs,
          yaml,
        },
        options,
      );

      if (loadedConfigError) {
        return utils.errors.wrap('read', loadedConfigError);
      }

      const [
        ignores,
        ignoresError,
      ] = helpers.createRegExps(loadedConfig.ignores);
      if (ignoresError) {
        return utils.errors.wrap('read', ignoresError);
      }

      const [
        rules,
        rulesError,
      ] = helpers.createRegExps(loadedConfig.rules);
      if (rulesError) {
        return utils.errors.wrap('read', rulesError);
      }

      const {
        mode,
      } = loadedConfig;
      const isValid = helpers.isModeValid(mode);
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
