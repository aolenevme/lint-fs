import matcherModule from './matcher/matcher.js';

const dependecies = {
  matcher: matcherModule,
};

const lintFs = ({
  matcher,
} = dependecies) => {
  return ({
    paths,
  }) => {
    const correct = [];
    const incorrect = [];

    for (const path of paths) {
      const [
        error,
      ] = matcher.isCorrect(path);

      if (error) {
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
        'matcher',
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
