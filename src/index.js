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

async function recursiveLintFs(prevPath, config, isFsCorrect) {
  const files = await readDir(prevPath);

  for (let file of files) {
    curFilePath = prevPath + file;
    curDirPath = curFilePath + '/';

    /**
      isCurFileIgnored = isMatched(config.ignores, curFilePath);
      isCurDirIgnored = isMatched(config.ignores, curDirPath);
    **/
  }
}

(async () => {
  const config  = await readConfig();
  lintFs(config);
})();
