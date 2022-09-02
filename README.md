# Lint-fs 📐
Lint your filesystem with regular expressions!

## Why?
We have got linters and static analyzers. But stated structure of your project plays equally important role in keeping your code clean.
**So welcome the automated tool for linting filesystem of your projects!** ✌️

## Installation
### NPM
```
npm install --save-dev lint-fs
```

### Raw Binary
You can download binary specifically for your platform (Debian, Ubuntu or Windows) on the [Releases page](https://github.com/eshekak/lint-fs/releases).

## How?
1. Create the [`lint-fs.yaml`](lint-fs.yaml.example) file in the root of your project and specify the structure of your project using the power of Regular Expressions!
2. You should use [ECMAScript Regular Expressions](https://regex101.com/) for rules
3. Then just:
  - run ```node node_modules/lint-fs/npm/run``` for NPM;
  - or execute downloaded file from the root of your project.

## Feedback
To share your feedback, please, create an [issue](https://github.com/eshekak/lint-fs/issues).

## [Code Style](./CODESTYLE.md)
