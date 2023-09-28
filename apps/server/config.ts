export default {
  globals: {
    path: '/ho/root',
  },
  urls: {
    protected: ['/ho/app/*', '/content/dynamic/app/*'],
  },
  urlMapping: {
    homeDashboard: '/ho/app/home',
    '/ho/(.*)': {
      type: 'regex',
      target: '/ho/$1',
    },
  },
};
