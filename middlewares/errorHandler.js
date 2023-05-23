module.exports = ((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (statusCode === 500) {
    return res.status(500).send({ message: err.message });
  }
  return res.status(statusCode).send({ message: err.message });
});
