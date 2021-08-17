module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["hardcore", "hardcore/fp", "hardcore/node"],
  parser: "@babel/eslint-parser",
  rules: {
    "putout/putout": "off",
    "unicorn/prefer-module": "off",
    "strict": "off",
    "no-console": "warn",
    "security/detect-non-literal-regexp": "warn",
    "max-statements": "warn"
  }
};
