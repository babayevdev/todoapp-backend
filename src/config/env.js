const dotenv = require('dotenv');

dotenv.config();

// mongodb server url
const MONGODB_URL = (
  process.env.MONGODB_URL || 'mongodb://localhost:27017/todo'
);
// port server is running
const PORT = process.env.PORT || 8000;
// secret key for generating refresh token
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'todo_refresh'
// secret key for generating access token
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'todo_access';
// live period of refresh token
const REFRESH_TOKEN_EXPIRE = process.env.REFRESH_TOKEN_EXPIRE || '15d'
// live period of access token
const ACCESS_TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE || '1h';

module.exports = {
  MONGODB_URL,
  PORT,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE,
  ACCESS_TOKEN_EXPIRE,
};