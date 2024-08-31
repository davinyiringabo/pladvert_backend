const Pusher = require("pusher");

const pg = require("pg");
const client = new pg.Pool({
  connectionString:
    "postgres://default:fe1v6bzPxVnX@ep-curly-snow-a4vhdch7-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = client;
client
  .connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error", err.stack));
client.on("error", (err) => {
  console.error("Unexpected error on idle client -- connecting to db", err);
  process.exit(-1);
});

const pusher = new Pusher({
  appId: "1858115",
  key: "1fd01353c69cbcec40d3",
  secret: "cf2f04f8dc48a33858fd",
  cluster: "ap2",
  useTLS: true,
});
