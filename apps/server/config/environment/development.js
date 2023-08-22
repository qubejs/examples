// var ip = require('ip');

module.exports = {
  email: {
    enabled: false,
    loggerEnabled: true,
    // loggerPath: paths.emailCache,
  },
  apiPrefix: {
    '/api/v1': {
      prefix: process.env.API_PREFIX || 'https://dev.service.com',
    },
  },
  server: {
    host: 'http://localhost:6004',
  },
  log: 'debug',
};
