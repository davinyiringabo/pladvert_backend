const pg = require("pg");
const client = new pg.Pool({
  connectionString:
    "postgres://default:fe1v6bzPxVnX@ep-curly-snow-a4vhdch7-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = client;
