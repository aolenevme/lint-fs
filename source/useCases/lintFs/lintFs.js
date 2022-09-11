import matcherModule from './matcher/matcher.js';

const dependecies = {
  matcher: matcherModule,
};

// 1. Write logger driver just for a simple string. And add logger logic over here as a dependency.
const lintFs = ({
  config,
  filesystem,
}, {
  matcher,
} = dependecies) => {
  return () => {
    const correct = [];
    const incorrect = [];

    const [
      paths,
      filesystemError,
    ] = filesystem.paths();
    if (filesystemError) {
      return [
        undefined,
        `lintFs: ${filesystemError}`,
      ];
    }

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
        'lintFs: matcher',
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
