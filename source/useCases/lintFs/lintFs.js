import matcherModule from './matcher/matcher.js';
import reporterModule from './reporter/reporter.js';

const dependecies = {
  matcher: matcherModule,
  reporter: reporterModule,
};

const lintFs = ({
  config,
  filesystem,
  logger,
}, {
  matcher,
  reporter,
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

    const {
      ignores,
      rules,
    } = initedConfig;

    for (const path of paths) {
      const [
        isIgnored,
        ignoresError,
      ] = matcher.isCorrect(path, ignores);

      if (ignoresError) {
        return [
          undefined,
          `lintFs: ${ignoresError}`,
        ];
      }

      if (isIgnored) {
        continue;
      }

      const [
        isRuled,
        rulesError,
      ] = matcher.isCorrect(path, rules);

      if (rulesError) {
        return [
          undefined,
          `lintFs: ${rulesError}`,
        ];
      }

      if (isRuled) {
        correct.push(path);
      } else {
        incorrect.push(path);
      }
    }

    const [
      _,
      reporterError,
    ] = reporter.print(logger, {
      correct,
      incorrect,
    });

    if (reporterError) {
      return [
        undefined,
        `lintFs: ${reporterError}`,
      ];
    }

    const isFileSystemIncorrect = incorrect.length > 0;
    if (isFileSystemIncorrect) {
      return [
        undefined,
        'File System Structure is Incorrect! 💢',
      ];
    }

    return [];
  };
};

export default lintFs;
