const fs = require('node:fs/promises');
const yaml = require('js-yaml');

function abortOnError (error) {
  console.error(`\n${error}\n\n`);

  process.exit(1);
}

function isMatched (regExpTemplates, path) {
  return regExpTemplates?.reduce((accumulator, returnValue) => {
    const regExp = new RegExp(returnValue, 'u');

    return regExp.test(path) || accumulator;
  }, false);
}

function getMatchEmoji (im) {
  return im ? '✅' : '❌';
}

async function lintFs (previousPath, config) {
  const files = await fs.readdir(previousPath);

  files.forEach(async (file) => {
    try {
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
          abortOnError(`Incorrect ${currentFilePath}`);
        }
      }
    } catch (error) {
      abortOnError(error);
    }
  });
}

async function readConfig () {
  const configFile = await fs.readFile('./lint-fs.yaml', 'utf8');

  return yaml.load(configFile);
}

(async () => {
  console.log(
    '====================\n  Filesystem lint  \n====================\n',
  );

  try {
    const config = await readConfig();

    await lintFs('./', config);
  } catch (error) {
    abortOnError(error);
  }
})();
