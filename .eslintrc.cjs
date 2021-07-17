module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["hardcore", "hardcore/fp", "hardcore/node"],
  overrides: [
    {
      extends: ["hardcore/ts-for-js"],
      files: ["*.js"],
      parserOptions: { "project": "./tsconfig.json" }
    }
  ],
  parser: "@babel/eslint-parser"
};
