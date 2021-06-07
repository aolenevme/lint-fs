const os = require('os');
const { Binary } = require('binary-install');

function getPlatform() {
    const type = os.type();
    const arch = os.arch();

    if (type === 'Windows_NT' && arch === 'x64') return 'lint-fs--windows-amd64';
    if (type === 'Windows_NT') return 'lint-fs--windows-386';
    if (type === 'Linux' && arch === 'x64') return 'lint-fs--linux-amd64';
    if (type === 'Linux') return 'lint-fs--linux-386';
    if (type === 'Darwin' && arch === 'x64') return 'lint-fs--darwin-amd64';

    throw new Error(`Unsupported platform: ${type} ${arch}`);
}

function getBinary() {
    const version = require('../package.json').version;
    const platform = getPlatform();
    const url = `https://github.com/eshekak/lint-fs/releases/download/v${version}/${platform}.tar.gz`;
    const name = 'lint-fs';

    return new Binary(url, { name });
}

module.exports = getBinary;
