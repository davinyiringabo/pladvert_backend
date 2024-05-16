const pg = require("pg");
const { Client } = pg;
const client = new Client({
  user: "postgres",
  host: "localhost",
  port: "5432",
  database: "pladvert",
  password: "anny",
});
module.exports = client;
