require('dotenv').config();
const jwt = require('jsonwebtoken');
const Unauthorised = require('../errors/Unauthorised');

const { JWT_SECRET = 'dev-key' } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new Unauthorised('Необходима авторизация'));
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
  } catch (err) {
    return next(new Unauthorised('Необходима авторизация'));
  }
  return next();
};
