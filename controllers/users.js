require('dotenv').config();
require('cookie-parser');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const Conflict = require('../errors/Conflict');
const { JWT_SECRET_DEV } = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' });
      res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 * 24 * 7 });
      res.cookie('checkJWT', token, { maxAge: 3600000 * 24 * 7 });
      res.send({ message: 'Вы успешло авторизировались' });
    })
    .catch((err) => next(err));
};

module.exports.logout = (req, res, next) => {
  try {
    return res.clearCookie('jwt').send({ message: 'Вы успешло вышли' });
  } catch (err) {
    return next(err);
  }
};

module.exports.geCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound(`Пользователь с указанным id = ${req.params.id} не найден`))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => next(err));
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict(`Пользователь с таким email ${email} уже зарегистрирован`));
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  User.find({ email })
    .then((user) => {
      if (user.length > 0) {
        throw new Conflict(`Пользователь с таким email ${email} уже зарегистрирован`);
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({ name, email, password: hash }))
        .catch((err) => next(err))
        .then((newUser) => {
          const userObj = newUser.toObject();
          delete userObj.password;
          res.send(userObj);
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
      next(err);
    });
};
