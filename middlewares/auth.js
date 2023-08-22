require('dotenv').config();
const jwt = require('jsonwebtoken');
const Unauthorised = require('../errors/Unauthorised');
const { JWT_SECRET_DEV } = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new Unauthorised('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
    req.user = payload;
  } catch (err) {
    return next(new Unauthorised('Необходима авторизация'));
  }
  return next();
};
