Promise = require('bluebird'); // eslint-disable-line no-global-assign
const serverless = require('serverless-http');
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const { getSecretValue } = require('./config/aws');

const handler = serverless(app);

module.exports.handler = async (event, context) => {
  logger.info(JSON.stringify(event));
  return handler(event, context);
};
