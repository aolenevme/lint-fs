const isOk = (regExps, path) => {
  let ok = false;

  for (const regExp of regExps) {
    ok = ok || regExp.test(path);

    if (ok) {
      break;
    }
  }

  return ok;
};

const matcher = {
  isCorrect (regExps, path) {
    const ok = isOk(regExps, path);

    return [
      ok,
    ];
  },
};

export default matcher;
