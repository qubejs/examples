export default {
  globals: {
    path: '/ho/root',
  },
  urls: {
    protected: ['/ho/app/*', '/ho/dynamic/app/*'],
  },
  urlMapping: {
    home: '/ho/home',
    '/ho/(.*)': {
      type: 'regex',
      target: '/ho/$1',
    },
  },
};
