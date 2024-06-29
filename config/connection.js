const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file
const url = require('url');

const POSTGRESURL = process.env.POSTGRESURL;

if (!POSTGRESURL) {
  throw new Error("POSTGRESURL environment variable is not set");
}

console.log(`POSTGRESURL = ${POSTGRESURL}`); // Debugging line to ensure POSTGRESURL is loaded

const urlParts = url.parse(POSTGRESURL);

if (!urlParts.protocol) {
  throw new Error("Invalid database URL");
}

const sequelize = new Sequelize(POSTGRESURL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: urlParts.hostname !== 'localhost' ? {
      require: true,
      rejectUnauthorized: false // Needed for connecting to certain PostgreSQL servers like Render
    } : false
  }
});

// Authenticate Sequelize instance
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
