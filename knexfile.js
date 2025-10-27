require("dotenv").config();
const fs = require('fs');

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL === 'true'
        ? { ca: fs.readFileSync('./certs/aiven-ca.pem') }
        : false
    },
    migrations: {
      directory: './migrations', 
    },
    seeds: {
      directory: './seeds'
    }
  }
};
