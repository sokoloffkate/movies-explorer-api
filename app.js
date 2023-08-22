require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { rateLimiter } = require('./middlewares/limiter');
const errorHandler = require('./middlewares/errorHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');

const { MONGO_DB_DEV } = require('./utils/constants');

const { NODE_ENV, MONGO_DB_PROD } = process.env;

const app = express();

mongoose.connect(NODE_ENV !== 'production' ? MONGO_DB_PROD : MONGO_DB_DEV, {
  useNewUrlParser: true,
});

app.use(cors({
  origin: [
    'https://movie.sokolova.nomoredomains.monster',
    'http://movie.sokolova.nomoredomains.monster',
    'http://localhost:3005',
    'http://localhost:3000',
  ],
  credentials: true,
  allowedHeaders: [
    'set-cookie',
    'Content-Type',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials',
  ],
}));

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use(rateLimiter);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(3005, () => {
  console.log('App listening on port 3005');
});
