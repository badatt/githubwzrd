Promise = require('bluebird'); // eslint-disable-line no-global-assign
import serverless from 'serverless-http';
import logger from './config/logger';
import app from './app';

const handler = serverless(app);

module.exports.handler = async (event: any, context: any) => {
  return handler(event, context);
};
