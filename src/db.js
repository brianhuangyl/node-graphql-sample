import knex from 'knex';

const db = knex({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'test_db'
  },
  migrations: {
    tableName: 'migrations',
  },
  debug: false
});

export default db;
