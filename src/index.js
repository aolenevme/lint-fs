const fs = require("fs");
const yaml = require("js-yaml");

let isFsCorrect = true;

(() => {
  const config = readConfig();

  lintFs(config);
})();

function readConfig() {
  const configFile = fs.readFileSync("./lint-fs.yaml", "utf8");

  return yaml.load(configFile);
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

function recursiveLintFs(previousPath, config) {
  const files = fs.readdirSync(previousPath);

  for (const file of files) {
    const currentFilePath = previousPath + file;
    const curDirPath = `${currentFilePath}/`;
    const isCurrentFileIgnored = isMatched(config.ignores, currentFilePath);
    const isCurDirIgnored = isMatched(config.ignores, curDirPath);
    const isDir = fs.statSync(currentFilePath).isDirectory();

    if (isDir && !isCurDirIgnored) {
      recursiveLintFs(curDirPath, config);
    } else if (!isCurrentFileIgnored) {
      const isCurrentFileMatched = isMatched(config.rules, currentFilePath);

      isFsCorrect = isFsCorrect && isCurrentFileMatched;
      printMatchResult(currentFilePath, isCurrentFileMatched);
    }
  }
}

function isMatched(regExpTemplates, path) {
  for (const reTemplate of regExpTemplates) {
    const regExp = new RegExp(reTemplate);

    if (regExp.test(path)) {
      return true;
    }
  }

  return false;
}

function printMatchResult(finalPath, isMatched) {
  let emoji = "✅";

  if (!isMatched) {
    emoji = "❌";
  }

  console.log(`${finalPath} ${emoji}`);
}
