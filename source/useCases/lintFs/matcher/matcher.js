const isOk = (path, regExps) => {
  let ok = false;

  for (const regExp of regExps) {
    ok = ok || regExp.test(path);

    // сделать break; после первого успешного test? чтобы правильно обработать excessive.
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
