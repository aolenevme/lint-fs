import matcherModule from './matcher/matcher.js';

const dependecies = {
  matcher: matcherModule,
};

// 1. Продумать разные кейсы, когда ignores/rules пустые или отсутствуют
// 2. Write logger driver just for a simple string. And add logger logic over here as a dependency.
const lintFs = ({
  config,
  filesystem,
}, {
  matcher,
} = dependecies) => {
  return async () => {
    const [
      paths,
      filesystemError,
    ] = await filesystem.paths('.');

    if (filesystemError) {
      return [
        undefined,
        `lintFs: ${filesystemError}`,
      ];
    }

    const [
      initedConfig,
      configError,
    ] = await config.read({
      encoding: 'utf8',
      fileName: './lint-fs.yaml',
    });

    if (configError) {
      return [
        undefined,
        `lintFs: ${configError}`,
      ];
    }

    const correct = [];
    const incorrect = [];

    for (const path of paths) {
      const [
        error,
      ] = matcher.isCorrect(initedConfig, path);

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
