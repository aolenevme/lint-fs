import utils from '../../utils/utils.js';

const createRegExps = (templates = []) => {
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
    return utils.errors.wrap(createRegExps.name, error.message);
  }
};

const load = async ({
  fs,
  yaml,
}, {
  encoding,
  fileName,
}) => {
  try {
    const file = await fs.readFile(fileName, encoding);
    const config = yaml.load(file);

    return [
      config,
    ];
  } catch (error) {
    return utils.errors.wrap(load.name, error.message);
  }
};

const parse = async ({
  dependencies,
  options,
}) => {
  const [
    config,
    configError,
  ] = await load(
    dependencies,
    options,
  );

  if (configError) {
    return utils.errors.wrap(parse.name, configError);
  }

  const {
    ignores,
    mode,
    rules,
  } = config;

  const [
    ignoreRegExps,
    ignoreRegExpsError,
  ] = createRegExps(ignores);
  if (ignoreRegExpsError) {
    return utils.errors.wrap(parse.name, ignoreRegExpsError);
  }

  const [
    rulesRegExps,
    rulesRegExpsError,
  ] = createRegExps(rules);
  if (rulesRegExpsError) {
    return utils.errors.wrap(parse.name, rulesRegExpsError);
  }

  return [
    {
      ignoreRegExps,
      mode,
      rulesRegExps,
    },
  ];
};

export default parse;
