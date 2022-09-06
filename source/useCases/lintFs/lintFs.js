const lintFs = ({ matcher }) => {
  return ({ paths }) => {
    for (const path of paths) {
      const [matcherError] = matcher.isCorrect(path);

      if (matcherError) {
        return [path, `matcher: ${matcherError}`];
      }
    }

    return [paths];
  }
};

export default lintFs;
