module.exports = ((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (statusCode === 500) {
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
  return res.status(statusCode).send({ message: err.message });
});
