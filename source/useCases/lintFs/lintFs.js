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
        fail(`lintFs: ${ignoresError}`);

        return;
      }

      if (isIgnored) {
        continue;
      }

      const [
        isRuled,
        rulesError,
      ] = matcher.isCorrect(path, rules);

      if (rulesError) {
        fail(`lintFs: ${rulesError}`);

        return;
      }

      if (isRuled) {
        correct.push(path);
      } else {
        incorrect.push(path);
      }
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
