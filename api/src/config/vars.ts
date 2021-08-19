import path from 'path';
import dotenv from 'dotenv';

// import .env variables

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

dotenv.config({
  path: path.join(__dirname, '../../../.aws.env'),
});

const variables = {
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  userTable: process.env.USER_TABLE,
  region: process.env.AWS_DEFAULT_REGION,
  dbEndpointUrl: process.env.DB_ENDPOINT_URL,
};

export default variables;
