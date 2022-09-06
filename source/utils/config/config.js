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
      `load: ${error}`,
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
      `createRegExps: ${error}`,
    ];
  }
};

const config = ({
  fs,
  yaml,
}) => {
  return () => {
    return {
      async read (options) {
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
            `load: ${loadError}`,
          ];
        }

        const [
          ignores,
          ignoresRegExpError,
        ] = createRegExps(loadedConfig.ignores);
        if (ignoresRegExpError) {
          return [
            undefined,
            `parse: ${ignoresRegExpError}`,
          ];
        }

        const [
          rules,
          rulesRegExpError,
        ] = createRegExps(loadedConfig.rules);
        if (rulesRegExpError) {
          return [
            undefined,
            `parse: ${rulesRegExpError}`,
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
};

export default config;
