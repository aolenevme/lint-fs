const isOk = (regExps, path) => {
  let ok = false;

  for (const regExp of regExps) {
    console.log(regExp, path);

    ok = ok || regExp.test(path);

    if (ok) {
      break;
    }
  }

  return ok;
};

const matcher = {
  isCorrect (path, regExps) {
    const ok = isOk(regExps, path);

    return [
      ok,
    ];
  },
};

export default matcher;
