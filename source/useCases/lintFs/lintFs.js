import matcherModule from './matcher/matcher.js';
import reporterModule from './reporter/reporter.js';

const dependecies = {
  matcher: matcherModule,
  reporter: reporterModule,
};

const lintFs = ({
  config,
  fail,
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
      fail(`lintFs: ${filesystemError}`);

      return;
    }

    const [
      initedConfig,
      configError,
    ] = await config.read({
      encoding: 'utf8',
      fileName: './lint-fs.yaml',
    });

    if (configError) {
      fail(`lintFs: ${configError}`);

      return;
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

    const [
      reporterError,
    ] = reporter.print(logger, {
      correct,
      incorrect,
    });

    if (reporterError) {
      fail(`lintFs: ${reporterError}`);
    }

    const isFileSystemIncorrect = incorrect.length > 0;
    if (isFileSystemIncorrect) {
      fail('File System Structure is Incorrect! 💢');
    }
  };
};

export default lintFs;
