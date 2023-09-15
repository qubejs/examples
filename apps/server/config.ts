export default {
  globals: {
    path: '/ho/root',
  },
  urls: {
    protected: [ '/content/dynamic/app/*'],
  },
  urlMapping: {
    homeDashboard: '/ho/app/home',
    '/ho/(.*)': {
      type: 'regex',
      target: '/ho/$1',
    },
  },
};
