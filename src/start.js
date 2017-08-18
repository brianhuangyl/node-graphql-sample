const logger = require('./logger');
const express = require('express');
const app = express();
const host = process.env.HOSTNAME || '0.0.0.0';
const port = process.env.PORT || 8000;

app.listen(port, host, () => {
  logger.info(`API service listening to ${host}:${port}`);
});
