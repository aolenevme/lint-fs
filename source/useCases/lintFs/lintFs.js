import utils from '../../utils/utils.js';
import error from './error.js';
import matcherModule from './matcher/matcher.js';
import reporterModule from './reporter/reporter.js';
import validate from './validate.js';

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
      return utils.errors.wrap('lintFs', pathsError);
    }

    const [
      readConfig,
      readConfigError,
    ] = await config.read({
      encoding: 'utf8',
      fileName: './lint-fs.yaml',
    });

    if (readConfigError) {
      return utils.errors.wrap('lintFs', readConfigError);
    }

    const {
      ignores,
      mode,
      rules,
    } = readConfig;

    const [
      validated,
      validationError,
    ] = validate({
      ignores,
      matcher,
      paths,
      rules,
    });
    if (validationError) {
      return utils.errors.wrap('lintFs', validationError);
    }

    const {
      correct,
      excessives,
      incorrect,
    } = validated;

    const [
      , printError,
    ] = reporter.print(logger, {
      correct,
      excessives,
      incorrect,
      mode,
    });

    if (printError) {
      return utils.errors.wrap('lintFs', printError);
    }

    return error({
      excessives,
      incorrect,
    });
  };
};

export default lintFs;
