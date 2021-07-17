import { readdir, readFile } from "node:fs/promises";
import fs from "node:fs";
import util from "node:util";
import yaml from "js-yaml";

const asyncStat = util.promisify(fs.stat);

let isFsCorrect = true;

function isMatched(regExpTemplates, path) {
  return regExpTemplates.reduce((accumulator, returnValue) => {
    const regExp = new RegExp(returnValue);

    return regExp.test(path) || accumulator;
  }, false);
}

function getMatchEmoji(im) {
  return im ? "✅" : "❌";
}

async function recursiveLintFs(previousPath, config) {
  const files = await readdir(previousPath);

  files.forEach(async (file) => {
    const currentFilePath = previousPath + file;
    const currentDirectoryPath = `${currentFilePath}/`;
    const isCurrentFileIgnored = isMatched(config.ignores, currentFilePath);
    const isCurrentDirectoryIgnored = isMatched(
      config.ignores,
      currentDirectoryPath
    );
    const isDirectory = (await asyncStat(currentFilePath)).isDirectory();

    if (isDirectory && !isCurrentDirectoryIgnored) {
      await recursiveLintFs(currentDirectoryPath, config);
    } else if (!isCurrentFileIgnored) {
      const isCurrentFileMatched = isMatched(config.rules, currentFilePath);

      isFsCorrect = isFsCorrect && isCurrentFileMatched;
      console.log(`${currentFilePath} ${getMatchEmoji(isCurrentFileMatched)}`);
    }
  });
}

async function lintFs(config) {
  console.log(
    "====================\n  Filesystem lint  \n====================\n"
  );
  await recursiveLintFs("./", config);

  if (!isFsCorrect) {
    console.error("\nFilesystem structure is not correct!\n");
  }
}

async function readConfig() {
  const configFile = await readFile("./lint-fs.yaml", "utf8");

  return yaml.load(configFile);
}

(async () => {
  const config = await readConfig();

  await lintFs(config);
})();
