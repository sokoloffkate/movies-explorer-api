const UserRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { geCurrentUser, updateUser } = require('../controllers/users');

UserRouter.get('/me', geCurrentUser);

UserRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = UserRouter;
