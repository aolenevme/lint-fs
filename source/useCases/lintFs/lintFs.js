const lintFs = ({
  matcher,
}) => {
  return ({
    paths,
  }) => {
    const incorrectPaths = [];

    for (const path of paths) {
      const [
        matcherError,
      ] = matcher.isCorrect(path);

      if (matcherError) {
        incorrectPaths.push(path);
      }
    }

    if (incorrectPaths.length > 0) {
      return [
        incorrectPaths,
        'matcherError',
      ];
    }

    return [
      paths,
    ];
  };
};

export default lintFs;
