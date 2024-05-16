const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const client = require("./database/connection");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
dotenv.config();
client.connect();
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.listen(5454, () => {
  console.log("server is running on port 5454");
});
