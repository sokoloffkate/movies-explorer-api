class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
    this.status = 404;
  }
}
module.exports = ForbiddenError;
