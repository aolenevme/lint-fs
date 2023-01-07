import utils from '../../utils/utils.js';
import matcherModule from './matcher/matcher.js';
import reporterModule from './reporter/reporter.js';

// Stryker disable next-line ObjectLiteral
const dependecies = {
  matcher: matcherModule,
  reporter: reporterModule,
};

const createSet = (regs) => {
  const stringified = regs.map((reg) => {
    return `${reg}`;
  });

  return new Set(stringified);
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
      pathsError,
    ] = await filesystem.paths('.');

    if (pathsError) {
      return utils.errors.wrap('lintFs', pathsError);
    }

    const [
      initedConfig,
      configError,
    ] = await config.read({
      encoding: 'utf8',
      fileName: './lint-fs.yaml',
    });

    if (configError) {
      return utils.errors.wrap('lintFs', configError);
    }

    const correct = [];
    const incorrect = [];
    const {
      mode,
      ignores,
      rules,
    } = initedConfig;
    const excessives = createSet([
      ...ignores,
      ...rules,
    ]);

    for (const path of paths) {
      const [
        ignoreReg,
        ignoreRegError,
      ] = matcher.isCorrect(path, ignores);

      if (ignoreRegError) {
        return utils.errors.wrap('lintFs', ignoreRegError);
      }

      if (ignoreReg) {
        excessives.delete(ignoreReg);
      } else {
        const [
          ruleReg,
          ruleRegError,
        ] = matcher.isCorrect(path, rules);

        if (ruleRegError) {
          return utils.errors.wrap('lintFs', ruleRegError);
        }

        if (ruleReg) {
          excessives.delete(ruleReg);

          correct.push(path);
        } else {
          incorrect.push(path);
        }
      }
    }

    const [
      , printError,
    ] = reporter.print(logger, {
      correct,
      excessives: Array.from(excessives),
      incorrect,
      mode,
    });

    if (printError) {
      return utils.errors.wrap('lintFs', printError);
    }

    const isIncorrect = incorrect.length;
    if (isIncorrect) {
      return utils.errors.wrap('lintFs', 'File System Structure is Incorrect!');
    }

    const isExcessive = excessives.size;
    if (isExcessive) {
      return utils.errors.wrap('lintFs', 'Excessive Config!');
    }

    return [];
  };
};

export default lintFs;
