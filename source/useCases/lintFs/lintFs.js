const lintFs = ({
  matcher,
}) => {
  return ({
    paths,
  }) => {
    const correct = [];
    const incorrect = [];

    for (const path of paths) {
      const [
        matcherError,
      ] = matcher.isCorrect(path);

      if (matcherError) {
        incorrect.push(path);

        continue;
      }

      correct.push(path);
    }

    if (incorrect.length > 0) {
      return [
        {
          correct,
          incorrect,
        },
        'matcherError',
      ];
    }

    return [
      {
        correct: paths,
        incorrect,
      },
    ];
  };
};

export default lintFs;
