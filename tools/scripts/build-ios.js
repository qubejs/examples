const { IosBuild } = require('@qubejs/scripts');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const config = require('../../apps/server/src/config/environment')
const paths = require('./paths');
const packageJson = require('../../package.json');
const packageCorodovaJson = require(`${paths.cordovaWww}/../package.json`);

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

function copyFolderRecursiveSync(
  source,
  target,
  excludeFolder = true,
  ignore = [
    'node_modules',
    'coverage',
    '.storybook',
    '.nyc_output',
    'package-lock.json',
  ]
) {
  var files = [];
  if (ignore.indexOf(path.basename(source)) > -1) {
    return;
  }
  var targetFolder;
  if (!excludeFolder) {
    // Check if folder needs to be created or integrated
    targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }
  } else {
    targetFolder = target;
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        if (ignore.indexOf(path.basename(curSource)) === -1) {
          copyFileSync(curSource, targetFolder);
        }
      }
    });
  }
}

const sendAppConfig = require('../../apps/server/src/config/app-config');

const iosBuilder = new IosBuild({
  host: config.server.host,
//   host: '',
  version: process.env.VERSION || packageJson.version,
  appConfig: {
    ...sendAppConfig,
    source: 'iOS',
  },
  indexHtml: paths.cordovaWww + '/index.html',
  // scripts: `
  // <script async src="https://www.googletagmanager.com/gtag/js?id=${config.analytics.gaTrackingId}"></script>
  // <script>
  //   window.dataLayer = window.dataLayer || [];
  //   function gtag() { dataLayer.push(arguments); }
  //   gtag('js', new Date());

  // </script>

  // `
});

iosBuilder.process().then(() => {
  console.log(chalk.green('ios build process completed'));
  copyFolderRecursiveSync(
    `${paths.cordovaWww}/../res/ios/launch`,
    `${paths.cordovaWww}/../platforms/ios/${packageCorodovaJson.displayName}/Images.xcassets/LaunchStoryboard.imageset`
  );
  console.log(chalk.green('ios splash screens updated'));
});
// CordovaLib/Classes/Private/Plugins/CDVWebViewEngine/CDVWebViewEngine.m