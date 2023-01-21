import utils from '../../utils/utils.js';

const createExcessivesSet = ({
  ignores,
  rules,
}) => {
  const regExps = [
    ...ignores,
    ...rules,
  ];
  const entries = regExps.map((regExp) => {
    return [
      regExp,
      regExp,
    ];
  });

  return Object.fromEntries(entries);
};

const validate = ({
  ignores,
  matcher,
  paths,
  rules,
}) => {
  const correct = [];
  const incorrect = [];
  const excessivesSet = createExcessivesSet({
    ignores,
    rules,
  });

  for (const path of paths) {
    const [
      ignoredRegExp,
      ignoredRegExpError,
    ] = matcher.isCorrect(path, ignores);

    if (ignoredRegExpError) {
      return utils.errors.wrap(validate.name, ignoredRegExpError);
    }

    delete excessivesSet[ignoredRegExp];

    if (!ignoredRegExp) {
      const [
        correctRegExp,
        correctRegExpError,
      ] = matcher.isCorrect(path, rules);

      if (correctRegExpError) {
        return utils.errors.wrap(validate.name, correctRegExpError);
      }

      delete excessivesSet[correctRegExp];

      if (correctRegExp) {
        correct.push(path);
      } else {
        incorrect.push(path);
      }
    }
  }

  const excessives = Object.keys(excessivesSet);

  return [
    {
      correct,
      excessives,
      incorrect,
    },
  ];
};

export default validate;
