module.exports =  {
  email: {
    enabled: true,
    loggerEnabled: false,
  },
  apiPrefix: {
    '/api/v1': {
      prefix: process.env.API_PREFIX || 'https://dev.sample.service.app.com',
    },
  },
  server: {
    host: process.env.HOST_URL || 'https://dev.sample.app.com',
  },
};
