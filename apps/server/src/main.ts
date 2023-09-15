/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { ContentServer } from '@qubejs/cms';
import siteConfig from '../site.config';
import config from '../config/environment';
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

console.log(path.resolve('./apps/server/ho'));
// Content server
var cmsSever = new ContentServer(
  {
    contentPath: path.resolve('./apps/server/ho'),
    serverPath: '/ho/*',
    rootApp: path.resolve('./apps/server/'),
    damAssets: path.resolve('./apps/server/dam'),
    clientLibs: path.resolve('./apps/server/clientlibs'),
    userData: () => {
      return {
        tenantCode: process.env.TENANT_CODE || 'NOT_DEFINED',
        sitekey: process.env.sitekey || 'NOT_DEFINED',
      };
    },
    envConfig: config,
    mode: config.env,
    siteConfig: siteConfig,
  },
  app
);
cmsSever.init();

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
