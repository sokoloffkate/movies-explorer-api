const rateLimit = require('express-rate-limit');

module.exports.rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 100,
  message: 'Превышено ограничение количества запросов за сутки',
  standardHeaders: true,
  legacyHeaders: false,
});
