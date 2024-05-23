const { Client } = require('pg');
const config = require('./config');

const logQuery = (statement, params) => {
  const timestamp = new Date();
  const formattedTimeStamp = timestamp.toString().substring(4, 24);
  console.log(formattedTimeStamp, statement, params);
};

const isProduction = (config.NODE_ENV === 'production');
const CONNECTION = {
  connectionString: config.DATABASE_URL,
  // ssl: isProduction,
  ssl: { rejectUnauthorized: false },
};

module.exports = {
  async dbQuery(statement, ...params) {
    const client = new Client(CONNECTION);
    await client.connect();
    logQuery(statement, params);
    const data = await client.query(statement, params);
    await client.end();
    return data;
  },
};
