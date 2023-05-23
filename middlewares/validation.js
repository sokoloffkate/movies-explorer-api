const { celebrate, Joi } = require('celebrate');
const { REGEXP_URL } = require('../utils/constants');

module.exports.createUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'Поле "Имя" обязательное к заполнению!',
        'string.min': 'Минимальная длина поля "Имя" - 2 символа!',
        'string.max': 'Мксимальная длина поля "Имя" - 30 символов!',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле "Email" обязательное к заполнению!',
        'string.email': 'Неверный формат email',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Поле "Пароль" обязательное к заполнению!',
      }),

  }),
});

module.exports.loginUserValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле "Email" обязательное к заполнению!',
        'string.email': 'Неверный формат email',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Поле "Пароль" обязательное к заполнению!',
      }),
  }),

});

module.exports.updateUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'Поле "Имя" обязательное к заполнению!',
        'string.min': 'Минимальная длина поля "Имя" - 2 символа!',
        'string.max': 'Мксимальная длина поля "Имя" - 30 символов!',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле "Email" обязательное к заполнению!',
        'string.email': 'Неверный формат email',
      }),
  }),
});

module.exports.createMovieValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.empty': 'Поле "country" обязательное к заполнению!',
      }),
    director: Joi.string().required()
      .messages({
        'string.empty': 'Поле "director" обязательное к заполнению!',
      }),
    duration: Joi.number().required()
      .messages({
        'number.base': 'Поле "duration" должно быть числом',
      }),
    year: Joi.string().required()
      .messages({
        'string.empty': 'Поле "year" обязательное к заполнению!',
      }),
    description: Joi.string().required()
      .messages({
        'string.empty': 'Поле "description" обязательное к заполнению!',
      }),
    image: Joi.string().required().pattern(REGEXP_URL)
      .messages({
        'string.empty': 'Поле "image" обязательное к заполнению!',

        'string.pattern.base': 'Неверный формат ссылки',
      }),
    trailerLink: Joi.string().required().pattern(REGEXP_URL)
      .messages({
        'string.empty': 'Поле "trailerLink" обязательное к заполнению!',

        'string.pattern.base': 'Неверный формат ссылки',
      }),
    thumbnail: Joi.string().required().pattern(REGEXP_URL)
      .messages({
        'string.empty': 'Поле "thumbnail" обязательное к заполнению!',

        'string.pattern.base': 'Неверный формат ссылки',
      }),
    nameRU: Joi.string().required()
      .messages({
        'string.empty': 'Поле "nameRU" обязательное к заполнению!',
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.empty': 'Поле "nameEN" обязательное к заполнению!',
      }),
    movieId: Joi.number().required()
      .messages({
        'number.base': 'Поле "movieId" должно быть числом',
      }),
  }),
});

module.exports.deleteMovieValid = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});
