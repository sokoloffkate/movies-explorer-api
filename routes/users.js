const UserRouter = require('express').Router();

const { updateUserValid } = require('../middlewares/validation');
const { geCurrentUser, updateUser } = require('../controllers/users');

UserRouter.get('/me', geCurrentUser);

UserRouter.patch('/me', updateUserValid, updateUser);

module.exports = UserRouter;
