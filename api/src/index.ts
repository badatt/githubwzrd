Promise = require('bluebird'); // eslint-disable-line no-global-assign
import serverless from 'serverless-http';
import logger from './config/logger';
import app from './app';

const handler = serverless(app);

module.exports.handler = async (event: any, context: any) => {
  logger.info(JSON.stringify(event));
  return handler(event, context);
};
