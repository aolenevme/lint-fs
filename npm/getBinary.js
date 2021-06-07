const os = require('os');
const { Binary } = require('binary-install');

function getPlatform() {
    const type = os.type();
    const arch = os.arch();

    if (type === 'Windows_NT' && arch === 'x64') return 'windows-amd64';
    if (type === 'Windows_NT') return 'windows-386';
    if (type === 'Linux' && arch === 'x64') return 'linux-amd64';
    if (type === 'Linux') return 'linux-386';
    if (type === 'Darwin' && arch === 'x64') return 'darwin-amd64';

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
