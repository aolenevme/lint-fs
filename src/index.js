const fs = require('fs');
const util = require('util');
const yaml = require('js-yaml');

const readFile = util.promisify(fs.readFile);

async function readConfig() {
  const readYamlFile = await readFile('./lint-fs.yaml', 'utf8');

  return yaml.load(readYamlFile);
}

(async () => {
  const yaml = await readConfig();
  console.log(yaml);
})();
