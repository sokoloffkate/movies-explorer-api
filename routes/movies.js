const MovieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { REGEXP_URL } = require('../utils/constants');

MovieRouter.get('/', getMovies);

MovieRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(REGEXP_URL),
    trailerLink: Joi.string().required().pattern(REGEXP_URL),
    thumbnail: Joi.string().required().pattern(REGEXP_URL),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
}), createMovie);

MovieRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), deleteMovie);

module.exports = MovieRouter;
