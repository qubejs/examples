const sendAppConfig = require('../../apps/server/src/config/app-config');
const paths = require('./paths');

if (sendAppConfig.publicUrl) {
  console.log('setting up for publicUrl:' + sendAppConfig.publicUrl);
}
