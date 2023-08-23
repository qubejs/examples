const { ArgsReader, WebBuild } = require('@qubejs/scripts');
const paths = require('./paths');
const paramsEnv = new ArgsReader().get();
const env = paramsEnv.env || 'production';
process.env.CONFIG_ENV = env;

const sendAppConfig = require('../../apps/server/config/app-config');
const chalk = require('chalk');

console.log(chalk.green('env = ' + env));
console.log(chalk.yellow('building web'));
const objBuilder = new WebBuild({
  version: sendAppConfig.appVersion,
  indexHtml: paths.distWeb + '/index.html',
  appConfig: {
    ...sendAppConfig,
    source: 'Web',
  },
  publicUrl: sendAppConfig.publicUrl,
  scripts: `

  `,
});

objBuilder.process().then(() => {
  console.log(chalk.green('web build process completed'));
});
