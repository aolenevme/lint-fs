import matcherModule from './matcher/matcher.js';
import reporterModule from './reporter/reporter.js';

// Stryker disable next-line ObjectLiteral
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

    // Fail on Unused Regular Expressions
    // 1. Перемапить ignores и rules из массивов в map`ы.
    // 2. Скормить их в isCorrect. Должен принимать мапу - и брать внутри Map.entries. Если regexp подошел, то ставь в мапу true.
    // 3. Отдельный метод на логирование ошибки. Цвет оранжевый. Назвать типо excessive regexps.
    // 4. Надо оптимизировать вообще все логирование ошибок / результатов в lintFs.js

    return [];
  };
};

export default lintFs;
