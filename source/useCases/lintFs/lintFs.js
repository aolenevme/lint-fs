import matcherModule from './matcher/matcher.js';
// 2. Implement it!
import paths from './paths/paths.js';

const dependecies = {
  matcher: matcherModule,
};

// 3. Write logger driver just for a simple string. And add logger logic over here as a dependency.
// 1. Fix tests!
const lintFs = ({
  config,
}, {
  matcher,
  paths,
} = dependecies) => {
  return () => {
    const correct = [];
    const incorrect = [];

    for (const path of paths) {
      const [
        error,
      ] = matcher.isCorrect(config, path);

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
