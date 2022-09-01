const os = require('os');
// Do it natively
const { Binary } = require('binary-install');

function getPlatform() {
    const type = os.type();
    const arch = os.arch();

    if (type === 'Windows_NT') return 'win';
    if (type === 'Linux') return 'linux';
    if (type === 'Darwin') return 'macos';

    throw new Error(`Unsupported platform: ${type} ${arch}`);
}

function getBinary() {
    const version = require('../package.json').version;
    const platform = getPlatform();
    const url = `https://github.com/eshekak/lint-fs/releases/download/v${version}/${platform}.tar.gz`;
    const name = 'lint-fs';

    return new Binary(name, url);
}

module.exports = getBinary;
