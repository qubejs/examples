// import packageJson from '@qubejs/source/package.json';
const config = require('./environment');
const siteConfig = require('../site.config');
const packageJson = require('../../../../package.json');

module.exports = {
  appVersion: packageJson.version,
  apiPrefix: config.apiPrefix,
  environment: config.env,
  tenantCode: config.tenantCode || 'Sample',
  siteMap: siteConfig,
  publicUrl: config.publicUrl,
  module: 'ho',
};
