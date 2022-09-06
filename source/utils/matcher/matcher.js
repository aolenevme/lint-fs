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

const isOk = (path, regExps) => {
  let ok = false;

  for (const regExp of regExps) {
    ok = ok || regExp.test(path);

    if (ok) {
      break;
    }
  }

  if (!ok) {
    return [
      'isOk',
    ];
  }

  return [];
};

const matcher = async ({
  fs,
  yaml,
}) => {
  const file = await fs.readFile('./lint-fs.yaml', 'utf8');

  const config = yaml.load(file);

  const [
    ignores,
    ignoresRegExpError,
  ] = createRegExps(config.ignores);
  if (ignoresRegExpError) {
    return [
      `matcher: ${ignoresRegExpError}`,
    ];
  }

  const [
    rules,
    rulesRegExpError,
  ] = createRegExps(config.rules);
  if (rulesRegExpError) {
    return [
      `matcher: ${rulesRegExpError}`,
    ];
  }

  return {
    isCorrect (path) {
      const [
        isIgnored,
      ] = isOk(path, ignores);

      if (isIgnored) {
        return [];
      }

      const [
        isRuled,
      ] = isOk(path, rules);

      if (!isRuled) {
        return [
          `isCorrect: ${isRuled}`,
        ];
      }

      return [];
    },
  };
};

export default matcher;
