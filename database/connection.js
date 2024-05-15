const pg = require("pg");
const client = new pg.Client({
  user: "postgres",
  host: "localhost",
  port: "5432",
  database: "pladvert",
  password: "anny",
});
console.log("Connected to database!");
client.on("error", (err) => {
  console.error("Database connection error:", err.stack);
});
module.exports = client;
