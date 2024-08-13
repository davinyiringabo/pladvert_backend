const pg = require("pg");
const client = new pg.Pool({
  connectionString:
    "postgres://default:fe1v6bzPxVnX@ep-curly-snow-a4vhdch7-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = client;
client.connect()
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Database connection error', err.stack));
client.on('error', (err) => {
  console.error('Unexpected error on idle client -- connecting to db', err);
  process.exit(-1);
});