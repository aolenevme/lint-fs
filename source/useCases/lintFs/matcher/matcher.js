const isOk = (path, regExps) => {
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
  isCorrect (path, regExps) {
    const ok = isOk(path, regExps);

    return [
      ok,
    ];
  },
};

export default matcher;
