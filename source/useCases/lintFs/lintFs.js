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
      // 1. driver.fail
      throw new Error(`lintFs: ${filesystemError}`);
    }

    const [
      initedConfig,
      configError,
    ] = await config.read({
      encoding: 'utf8',
      fileName: './lint-fs.yaml',
    });

    if (configError) {
      throw new Error(`lintFs: ${configError}`);
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

    reporter.print(logger, {
      correct,
      incorrect,
    });
  };
};

export default lintFs;
