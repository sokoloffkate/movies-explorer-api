class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = 'Conflict';
    this.message = 'Пользователь с таким email уже зарегистрирован';
  }
}
module.exports = ConflictError;
