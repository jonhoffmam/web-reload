const { resolve } = require('path');
const nodesoft = require('node-soft/lib/cli');

function cli() {
  process.argv.push(resolve(__dirname, '..', 'server.js'));
  nodesoft(process.argv);
}

module.exports = cli;
