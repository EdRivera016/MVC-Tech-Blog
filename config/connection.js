const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const POSTGRESURL = process.env.POSTGRESURL; // Correct way to access the environment variable
console.log(`${POSTGRESURL}`); // Debugging line to ensure POSTGRESURL is loaded

if (!POSTGRESURL) {
  throw new Error("POSTGRESURL environment variable is not set");
}

const sequelize = new Sequelize(POSTGRESURL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: POSTGRESURL.includes("localhost") ? false : {
      require: true,
      rejectUnauthorized: false // Needed for connecting to certain PostgreSQL servers like Render
    }
  }
});

// Authenticate Sequelize instance
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // Further code that depends on a successful database connection can go here

  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
