const dotenv = require('dotenv');
const _ = require('lodash');
dotenv.config();
const defaults = require('./default');
const dev = require('./dev');
const development = require('./development');
const production = require('./production');
const evnv = {
  dev,
  development,
  production,
};
const enviroment =
  process.env.CONFIG_ENV || process.env.NODE_ENV || 'development';
if (!evnv[enviroment]) {
  throw `${enviroment} given not found`;
}
const config = evnv[enviroment];

console.log(enviroment);

module.exports = _.merge(
  {
    env: enviroment,
  },
  defaults,
  config
);
