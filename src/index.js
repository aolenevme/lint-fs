const fs = require('fs');
const util = require('util');
const yaml = require('js-yaml');

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

async function readConfig() {
  const readYamlFile = await readFile('./lint-fs.yaml', 'utf8');

  return yaml.load(readYamlFile);
}

async function lintFs(config) {
  let isFsCorrect = true;

  console.log('\n====================\n  Filesystem lint  \n====================\n\n');

  await recursiveLintFs('./', config, isFsCorrect)

  if (!isFsCorrect) {
    console.error('\n\nFilesystem structure is not correct!\n\n');
  }
}

let isFsCorrect = true;

async function recursiveLintFs(prevPath, config) {
  const files = await readDir(prevPath);

  for (let file of files) {
    const curFilePath = prevPath + file;
    const curDirPath = curFilePath + '/';

    const isCurFileIgnored = isMatched(config.ignores, curFilePath);
    const isCurDirIgnored = isMatched(config.ignores, curDirPath);

    const isDir = fs.statSync(curFilePath).isDirectory();

    if (isDir && !isCurDirIgnored) {
      await recursiveLintFs(curDirPath, config);
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

(async () => {
  const config  = await readConfig();

  lintFs(config);
})();
