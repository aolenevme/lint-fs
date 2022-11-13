import utils from '../../utils/utils.js';

const {
  errors,
} = utils;

const load = async ({
  fs,
  yaml,
}, {
  encoding,
  fileName,
}) => {
  try {
    const file = await fs.readFile(fileName, encoding);
    const loadedConfig = yaml.load(file);

    return [
      loadedConfig,
    ];
  } catch (error) {
    return errors.wrap('load', error.message);
  }
};

const createRegExps = (templates) => {
  try {
    const checkedTemplates = templates ?? [];

    const regExps = [];

    for (const template of checkedTemplates) {
      const regExp = new RegExp(template, 'u');

      regExps.push(regExp);
    }

    return [
      regExps,
    ];
  } catch (error) {
    return errors.wrap('createRegExps', error.message);
  }
};

const config = ({
  fs,
  yaml,
}) => {
  return {
    read: async (options) => {
      const [
        loadedConfig,
        loadedConfigError,
      ] = await load({
        fs,
        yaml,
      }, options);

      if (loadedConfigError) {
        return errors.wrap('read', loadedConfigError);
      }

      const [
        ignores,
        ignoresRegExpError,
      ] = createRegExps(loadedConfig.ignores);
      if (ignoresRegExpError) {
        return errors.wrap('read', ignoresRegExpError);
      }

      const [
        rules,
        rulesError,
      ] = createRegExps(loadedConfig.rules);
      if (rulesError) {
        return errors.wrap('read', rulesError);
      }

      return [
        {
          ignores,
          rules,
        },
      ];
    },
  };
};

export default config;
