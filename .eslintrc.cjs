module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["hardcore", "hardcore/fp", "hardcore/node"],
  parser: "@babel/eslint-parser",
  rules: {
    "import/no-unresolved": "off",
    "no-console": "off",
    "node/no-missing-import": "off"
  }
};
