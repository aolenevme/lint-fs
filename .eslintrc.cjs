module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["hardcore", "hardcore/fp", "hardcore/node"],
  parser: "@babel/eslint-parser",
  rules: {
        "no-console": "off"
  }
};
