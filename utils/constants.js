const REGEXP_URL = /^(https?:\/\/)?(w{3}\.)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{1,})*#?/m;

const JWT_SECRET_DEV = 'dev-key';
const MONGO_DB_DEV = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  REGEXP_URL,
  JWT_SECRET_DEV,
  MONGO_DB_DEV,
};
