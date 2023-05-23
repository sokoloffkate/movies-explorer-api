const router = require('express').Router();

const { createUserValid, loginUserValid } = require('../middlewares/validation');
const { createUser, login, logout } = require('../controllers/users');

const NotFound = require('../errors/NotFound');

const UserRouter = require('./users');
const MovieRouter = require('./movies');

const auth = require('../middlewares/auth');

router.post('/signup', createUserValid, createUser);

router.post('/signin', loginUserValid, login);

router.post('/signout', auth, logout);

router.use('/users', auth, UserRouter);
router.use('/movies', auth, MovieRouter);

router.use('/', auth, (req, res, next) => next(new NotFound('Неверный url запрос')));

module.exports = router;
