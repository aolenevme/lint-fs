const isOk = (path, regExps) => {
  for (const regExp of regExps) {
    const ok = regExp.test(path);

    if (ok) {
      return true;
    }
  }

  return false;
};

const matcher = {
  isCorrect (path, regExps) {
    const ok = isOk(path, regExps);

    return [
      ok,
    ];
  },
};

export default matcher;
