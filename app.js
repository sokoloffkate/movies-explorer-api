require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { rateLimiter } = require('./middlewares/limiter');
const errorHandler = require('./middlewares/errorHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');

const { MONGO_DB_DEV } = require('./utils/constants');

const { PORT = 3000, NODE_ENV, MONGO_DB_PROD } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB_PROD : MONGO_DB_DEV, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use(rateLimiter);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
