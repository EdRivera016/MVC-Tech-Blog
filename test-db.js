// test-db.js

const { Client } = require('pg');
const connectionString = process.env.POSTGRESURL; // Or use your database connection URL directly

const client = new Client({
  connectionString,
});

async function testDatabaseConnection() {
  try {
    await client.connect();
    console.log('Connected to database successfully!');
    await client.end();
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await client.end();
  }
}

testDatabaseConnection();
