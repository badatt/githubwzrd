// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const serverless = require('serverless-http');
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const { getSecretValue } = require('./config/aws');

const handler = serverless(app);

module.exports.handler = async (event, context) => {
  // you can do other things here

  //const cryptoKeys = await getSecretValue(process.env.CRYPTO_KEYS_SECRET_NAME);
  //process.env['JWT_SECRET'] = cryptoKeys.PUBLIC_KEY;

  logger.info(JSON.stringify(event));
  const result = await handler(event, context);
  // and here
  logger.info(JSON.stringify(result));
  return result;
};
