const path = require('path');
const dotenv = require('dotenv');
const { getSecretValue } = require('./aws');

// import .env variables

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

dotenv.config({
  path: path.join(__dirname, '../../.aws.env'),
});

const variables = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  userSessionTable: process.env.USER_SESSION_TABLE,
  userTable: process.env.USER_TABLE,
};

module.exports = variables;
