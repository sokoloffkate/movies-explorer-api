const Movie = require('../models/movie');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => res.status(200).send({ data: movies }))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year,
    description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const ownerId = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: ownerId,
  })
    .then((moovie) => res.status(201).send({ data: moovie }))
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.findById(req.params.id)
    .orFail(new NotFound(`Фильм с указанным id = ${req.params.id} не найден`))
    .then((movie) => {
      if (String(movie.owner._id) === ownerId) {
        movie.deleteOne()
          .then(() => res.status(200).send({ message: `'Фильм с id = ${req.params.id} успешно удален'` }))
          .catch((err) => next(err));
      } else {
        throw (new Forbidden('Фильм принаджежит другому пользователю. Удаление невозможно'));
      }
    })
    .catch((err) => {
      next(err);
    });
};
