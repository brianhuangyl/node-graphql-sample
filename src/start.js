import server from './server';
import logger from './logger';

const host = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 4000;

process.on('uncaughtException', function (err) {
  const message = err.message || 'unknown error';
  logger.error('Uncaught exception, shutting down the server: ' + message);
  logger.error(err);
  process.exit(1);
});

process.on('SIGINT', function () {
  logger.warn('SIGINT (Ctrl-C) received');
  process.exit(1);
});

process.on('SIGTERM', function () {
  logger.warn('SIGTERM received');
  process.exit(1);
});

const app = server.create();
app.listen(port, host, () => {
  logger.info(`Running a GraphQL API server at ${host}:${port}/graphql`);
});
