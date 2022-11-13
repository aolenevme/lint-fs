import utils from '../../utils/utils.js';
import matcherModule from './matcher/matcher.js';
import reporterModule from './reporter/reporter.js';

const {
  errors,
} = utils;

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
      pathsError,
    ] = await filesystem.paths('.');

    if (pathsError) {
      return errors.wrap('lintFs', pathsError);
    }

    const [
      initedConfig,
      configError,
    ] = await config.read({
      encoding: 'utf8',
      fileName: './lint-fs.yaml',
    });

    if (configError) {
      return errors.wrap('lintFs', configError);
    }

    const correct = [];
    const incorrect = [];

    const {
      ignores,
      rules,
    } = initedConfig;

    const excessiveRegs = new Set([
      ...ignores,
      ...rules,
    ]);

    for (const path of paths) {
      const [
        ignoreReg,
        ignoreRegError,
      ] = matcher.isCorrect(path, ignores);

      if (ignoreRegError) {
        return errors.wrap('lintFs', ignoreRegError);
      }

      if (ignoreReg) {
        excessiveRegs.delete(ignoreReg);

        continue;
      }

      const [
        ruleReg,
        ruleRegError,
      ] = matcher.isCorrect(path, rules);

      if (ruleRegError) {
        return errors.wrap('lintFs', ruleRegError);
      }

      if (ruleReg) {
        correct.push(path);

        excessiveRegs.delete(ruleReg);
      } else {
        incorrect.push(path);
      }
    }

    const [
      _,
      printError,
    ] = reporter.print(logger, {
      correct,
      excessiveRegs: Array.from(excessiveRegs),
      incorrect,
    });

    if (printError) {
      return errors.wrap('lintFs', printError);
    }

    const isIncorrect = incorrect.length;
    if (isIncorrect) {
      return errors.wrap('lintFs', 'File System Structure is Incorrect!');
    }

    const isExcessive = excessiveRegs.size;
    if (isExcessive) {
      return errors.wrap('lintFs', 'Excessive Config Rules!');
    }

    return [];
  };
};

export default lintFs;
