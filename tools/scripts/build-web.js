const { ArgsReader, WebBuild } = require('@qubejs/scripts');
const fs = require('fs');
const paths = require('./paths');
const paramsEnv = new ArgsReader().get();
const env = paramsEnv.env || 'production';
process.env.CONFIG_ENV = env;

const sendAppConfig = require('../../apps/server/src/config/app-config');
const chalk = require('chalk');
function copyFileSync(source, target) {
  var targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}
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
  copyFileSync(`${paths.distWeb}/index.html`, `${paths.distWeb}/404.html`, )
  console.log(chalk.green('web build process completed'));
});
