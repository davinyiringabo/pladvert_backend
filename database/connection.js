const pg = require("pg");
const { Client } = pg;
const client = new Client({
  user: "default",
  host: "ep-curly-snow-a4vhdch7-pooler.us-east-1.aws.neon.tech",
  port: "5432",
  database: "verceldb",
  password: "fe1v6bzPxVnX",
});
module.exports = client;
