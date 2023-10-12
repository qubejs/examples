const { AndroidBuild } = require('@qubejs/scripts');
const chalk = require('chalk');
const config = require('../../apps/server/src/config/environment');
const paths = require('./paths');
const packageJson = require('../../package.json');
const sendAppConfig = require('../../apps/server/src/config/app-config');
const packageCorodovaJson = require(`${paths.cordovaWww}/../package.json`);

console.log(chalk.green('env = ' + config.env));
console.log(chalk.yellow('building with host:' + config.server.host));
const androidBuilder = new AndroidBuild({
  host: config.server.host, // for android build
  version:  process.env.VERSION || packageJson.version,
  appConfig: {
    ...sendAppConfig,
    source: 'Android',
  },
  indexHtml: paths.cordovaWww + '/index.html',
});

androidBuilder.process().then(() => {
  console.log(chalk.green('android > build process completed'));
});
