const MovieRouter = require('express').Router();
const { createMovieValid, deleteMovieValid } = require('../middlewares/validation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

MovieRouter.get('/', getMovies);

MovieRouter.post('/', createMovieValid, createMovie);

MovieRouter.delete('/:id', deleteMovieValid, deleteMovie);

module.exports = MovieRouter;
