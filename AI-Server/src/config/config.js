const databaseName = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_DOCKER_PORT;
const dialect = process.env.DB_DIALECT;

module.exports = {
  local: {
    username,
    password,
    database: databaseName,
    host,
    port,
    dialect,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  development: {
    username,
    password,
    database: databaseName,
    host,
    port,
    dialect,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port,
    dialect,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username,
    password,
    database: databaseName,
    host,
    port,
    dialect,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
