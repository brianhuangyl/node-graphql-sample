import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

function create() {
  const app = express();

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(
    '/graphql',
    graphqlHTTP(req => ({
      schema,
      rootValue: global,
      graphiql: true,
      pretty: true
    })),
  );
  return app;
}

export default { create }
