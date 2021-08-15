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
  env: process.env.NODE_ENV,
  userTable: process.env.USER_TABLE,
};

export default variables;