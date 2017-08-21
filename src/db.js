require('dotenv').config();
import knex from 'knex';

const db = knex({
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST || '127.0.0.1',
    user : process.env.DB_USER || 'root',
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  },
  migrations: {
    tableName: 'migrations',
  },
  debug: false
});

export default db;
