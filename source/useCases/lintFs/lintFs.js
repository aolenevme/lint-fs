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
      filesystemError,
    ] = await filesystem.paths('.');

    if (filesystemError) {
      return errors.wrap('lintFs', filesystemError);
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
        ignoreError,
      ] = matcher.isCorrect(path, ignores);

      if (ignoreError) {
        return errors.wrap('lintFs', ignoreError);
      }

      if (ignoreReg) {
        excessiveRegs.delete(ignoreReg);

        continue;
      }

      const [
        ruleReg,
        ruleError,
      ] = matcher.isCorrect(path, rules);

      if (ruleError) {
        return errors.wrap('lintFs', ruleError);
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
      reporterError,
    ] = reporter.print(logger, {
      correct,
      excessiveRegs: Array.from(excessiveRegs),
      incorrect,
    });

    if (reporterError) {
      return errors.wrap('lintFs', reporterError);
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
