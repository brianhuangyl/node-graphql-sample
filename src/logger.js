import winston from 'winston';

module.exports = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.Console)()
  ]
});
