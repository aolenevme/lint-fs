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

const matcher = {
  isCorrect (config, path) {
    const {
      ignores,
      rules,
    } = config;

    const [
      isIgnored,
    ] = isOk(path, ignores);

    if (!isIgnored) {
      return [];
    }

    const [
      isRuled,
    ] = isOk(path, rules);

    if (isRuled) {
      return [
        `isCorrect: ${isRuled}`,
      ];
    }

    return [];
  },
};

export default matcher;
