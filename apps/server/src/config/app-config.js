// import packageJson from '@qubejs/source/package.json';
const config = require('./environment');
const siteConfig = require('../site.config');

module.exports = {
  appVersion: '0.0.0',
  apiPrefix: config.apiPrefix,
  environment: config.env,
  tenantCode: config.tenantCode || 'Sample',
  siteMap: siteConfig,
  publicUrl: config.publicUrl,
  module: 'ho',
};
