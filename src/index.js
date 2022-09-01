import fs from 'node:fs/promises';
import {
  load,
} from 'js-yaml';

const isMatched = (regExpTemplates, path) => {
  return regExpTemplates?.reduce((accumulator, returnValue) => {
    const regExp = new RegExp(returnValue, 'u');

    return regExp.test(path) || accumulator;
  }, false);
};

const getMatchEmoji = (im) => {
  return im ? '✅' : '❌';
};

const lintFs = async (previousPath, config) => {
  const files = await fs.readdir(previousPath);

  for (const file of files) {
    const currentFilePath = previousPath + file;
    const currentDirectoryPath = `${currentFilePath}/`;
    const isCurrentFileIgnored = isMatched(config.ignores, currentFilePath);
    const isCurrentDirectoryIgnored = isMatched(
      config.ignores,
      currentDirectoryPath,
    );
    const isDirectory = (await fs.stat(currentFilePath)).isDirectory();

    if (isDirectory && !isCurrentDirectoryIgnored) {
      await lintFs(currentDirectoryPath, config);
    }

    if (!isDirectory && !isCurrentFileIgnored) {
      const isCurrentFileMatched = isMatched(config.rules, currentFilePath);

      console.log(
        `${currentFilePath} ${getMatchEmoji(isCurrentFileMatched)}`,
      );

      if (!isCurrentFileMatched) {
        throw new Error(`\nIncorrect ${currentFilePath}\n\n`);
      }
    }
  }
};

const readConfig = async () => {
  const configFile = await fs.readFile('./lint-fs.yaml', 'utf8');

  return load(configFile);
};

(async () => {
  console.log(
    '====================\n  Filesystem lint  \n====================\n',
  );

  const config = await readConfig();

  await lintFs('./', config);
})();
