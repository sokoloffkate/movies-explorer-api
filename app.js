require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');

const { createUser, login, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFound = require('./errors/NotFound');

const { MONGO_DB_DEV } = require('./utils/constants');

console.log(MONGO_DB_DEV);

const { PORT = 3000, NODE_ENV, MONGO_DB_PROD } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB_PROD : MONGO_DB_DEV, {
  useNewUrlParser: true,
});
console.log(NODE_ENV);

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signout', auth, logout);

app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));

app.use('/', auth, (req, res, next) => next(new NotFound('Неверный url запрос')));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
