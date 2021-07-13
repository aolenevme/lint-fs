const fs = require('fs');
const yaml = require('js-yaml');

let isFsCorrect = true;

(() => {
  const config = readConfig();

  lintFs(config);
})();

function readConfig() {
  const configFile = fs.readFileSync('./lint-fs.yaml', 'utf8');

  return yaml.load(configFile);
}

function lintFs(config) {
  console.log('====================\n  Filesystem lint  \n====================\n');

  recursiveLintFs('./', config, isFsCorrect)

  if (!isFsCorrect) {
    console.error('\nFilesystem structure is not correct!\n');
  }
}

function recursiveLintFs(prevPath, config) {
  const files = fs.readdirSync(prevPath);

  for (let file of files) {
    const curFilePath = prevPath + file;
    const curDirPath = curFilePath + '/';

    const isCurFileIgnored = isMatched(config.ignores, curFilePath);
    const isCurDirIgnored = isMatched(config.ignores, curDirPath);

    const isDir = fs.statSync(curFilePath).isDirectory();

    if (isDir && !isCurDirIgnored) {
      recursiveLintFs(curDirPath, config);
    } else if (!isCurFileIgnored) {
      const isCurFileMatched = isMatched(config.rules, curFilePath);

      isFsCorrect = isFsCorrect && isCurFileMatched;

      printMatchResult(curFilePath, isCurFileMatched);
    }
  }
}

function isMatched(regExpTemplates, path) {
  for (let reTemplate of regExpTemplates) {
    const regExp = new RegExp(reTemplate);

    if (regExp.test(path)) {
      return true;
    }
  }

  return false;
}

function printMatchResult(finalPath, isMatched) {
  let emoji = "\u2705";

  if (!isMatched) {
    emoji = "\u274C";
  }

  console.log(`${finalPath} ${emoji}`);
}

