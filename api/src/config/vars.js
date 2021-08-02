const path = require('path');
const dotenv = require('dotenv');

// import .env variables

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

dotenv.config({
  path: path.join(__dirname, '../../.aws.env'),
});

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  port: process.env.PORT,
  env: process.env.NODE_ENV,
};
