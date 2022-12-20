import utils from '../../utils/utils.js';

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
    return utils.errors.wrap(createRegExps.name, error.message);
  }
};

const isModeValid = (mode) => {
  const modes = [
    'silent',
    'verbose',
  ];
  const isValid = modes.includes(mode);

  return isValid;
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
    const loadedConfig = yaml.load(file);

    return [
      loadedConfig,
    ];
  } catch (error) {
    return utils.errors.wrap(load.name, error.message);
  }
};

const helpers = {
  createRegExps,
  isModeValid,
  load,
};

export default helpers;
