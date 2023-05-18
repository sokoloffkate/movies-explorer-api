const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const Unauthorised = require('../errors/Unauthorised');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

});

userSchema.statics.findUserByCredentials = (email, password) => this.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      throw new Unauthorised('Неправильные почта или пароль');
    }
    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new Unauthorised('Неправильные почта или пароль');
        }
        return user;
      });
  });

module.exports = mongoose.model('user', userSchema);
