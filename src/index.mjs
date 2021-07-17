import fs from "node:fs";
import yaml from "js-yaml";

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

function recursiveLintFs(previousPath, config) {
  const files = fs.readdirSync(previousPath);

  files.forEach((file) => {
    const currentFilePath = previousPath + file;
    const currentDirectoryPath = `${currentFilePath}/`;
    const isCurrentFileIgnored = isMatched(config.ignores, currentFilePath);
    const isCurrentDirectoryIgnored = isMatched(
      config.ignores,
      currentDirectoryPath
    );
    const isDirectory = fs.statSync(currentFilePath).isDirectory();

    if (isDirectory && !isCurrentDirectoryIgnored) {
      recursiveLintFs(currentDirectoryPath, config);
    } else if (!isCurrentFileIgnored) {
      const isCurrentFileMatched = isMatched(config.rules, currentFilePath);

      isFsCorrect = isFsCorrect && isCurrentFileMatched;

      console.log(`${currentFilePath} ${getMatchEmoji(isCurrentFileMatched)}`);
    }
  });
}

function lintFs(config) {
  console.log(
    "====================\n  Filesystem lint  \n====================\n"
  );
  recursiveLintFs("./", config);

  if (!isFsCorrect) {
    console.error("\nFilesystem structure is not correct!\n");
  }
}

function readConfig() {
  const configFile = fs.readFileSync("./lint-fs.yaml", "utf8");

  return yaml.load(configFile);
}

(() => {
  const config = readConfig();

  lintFs(config);
})();
