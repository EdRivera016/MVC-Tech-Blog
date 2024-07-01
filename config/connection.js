const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

let POSTGRESURL = process.env.POSTGRESURL;

if (!POSTGRESURL) {
  throw new Error("POSTGRESURL environment variable is not set");
}

console.log(`POSTGRESURL = ${POSTGRESURL}`); // Debugging line to ensure POSTGRESURL is loaded

const sequelize = new Sequelize(POSTGRESURL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: POSTGRESURL.includes('localhost') ? false : { // Adjust SSL configuration based on host
      require: true,
      rejectUnauthorized: false // Needed for connecting to certain PostgreSQL servers like Render
    }
  }
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
}

// Call the function to test the connection
testConnection();

module.exports = sequelize;
