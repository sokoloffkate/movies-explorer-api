class UnauthorisedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unuthorised';
    this.statusCode = 401;
  }
}
module.exports = UnauthorisedError;
