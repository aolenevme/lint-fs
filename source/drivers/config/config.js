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
    return [
      undefined,
      `load: ${error.message}`,
    ];
  }
};

const createRegExps = (templates) => {
  try {
    const regExps = [];

    for (const template of templates) {
      const regExp = new RegExp(template, 'u');

      regExps.push(regExp);
    }

    return [
      regExps,
    ];
  } catch (error) {
    return [
      undefined,
      `createRegExps: ${error.message}`,
    ];
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
        loadError,
      ] = await load({
        fs,
        yaml,
      }, options);

      if (loadError) {
        return [
          undefined,
          `read: ${loadError}`,
        ];
      }

      const [
        ignores,
        ignoresRegExpError,
      ] = createRegExps(loadedConfig.ignores);
      if (ignoresRegExpError) {
        return [
          undefined,
          `read: ${ignoresRegExpError}`,
        ];
      }

      const [
        rules,
        rulesRegExpError,
      ] = createRegExps(loadedConfig.rules);
      if (rulesRegExpError) {
        return [
          undefined,
          `read: ${rulesRegExpError}`,
        ];
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
