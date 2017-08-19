import knex from 'knex';

const db = knex({
  client: 'mysql',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'migrations',
  },
  debug: false
});

export default db;
