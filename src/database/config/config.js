require('dotenv').config();

module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },

  staging: {
    username: 'root',
    password: null,
    database: 'root',
    host: '127.0.0.1',
    dialect: 'postgres',
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DATABASE_URL,
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
  },
};
