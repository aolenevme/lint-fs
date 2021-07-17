import fs from "node:fs/promises";
import yaml from "js-yaml";

function isMatched(regExpTemplates, path) {
  return regExpTemplates?.reduce((accumulator, returnValue) => {
    const regExp = new RegExp(returnValue, "u");

    return regExp.test(path) || accumulator;
  }, false);
}

function getMatchEmoji(im) {
  return im ? "✅" : "❌";
}

async function lintFs(previousPath, config) {
  const files = await fs.readdir(previousPath);

  files.forEach(async (file) => {
    const currentFilePath = previousPath + file;
    const currentDirectoryPath = `${currentFilePath}/`;
    const isCurrentFileIgnored = isMatched(config.ignores, currentFilePath);
    const isCurrentDirectoryIgnored = isMatched(
      config.ignores,
      currentDirectoryPath
    );
    const isDirectory = (await fs.stat(currentFilePath)).isDirectory();

    if (isDirectory && !isCurrentDirectoryIgnored) {
      await lintFs(currentDirectoryPath, config);
    }

    if (!isDirectory && !isCurrentFileIgnored) {
      const isCurrentFileMatched = isMatched(config.rules, currentFilePath);

      console.log(`${currentFilePath} ${getMatchEmoji(isCurrentFileMatched)}`);
    }
  });
}

async function readConfig() {
  const configFile = await fs.readFile("./lint-fs.yaml", "utf8");

  return yaml.load(configFile);
}

(async () => {
  console.log(
    "====================\n  Filesystem lint  \n====================\n"
  );

  const config = await readConfig();

  await lintFs("./", config);
})();
