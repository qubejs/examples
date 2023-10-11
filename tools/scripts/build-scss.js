const paths = require('./paths');
const { ScssBuilder } = require('@qubejs/scripts');

new ScssBuilder({
  webSrc: paths.webSrc,
}).process();
