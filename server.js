const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.json");
const client = require("./database/connection");
const authMiddleWare = require("./middlewares/auth.middleware");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
dotenv.config();
client.connect();
app.get("/", (req, res) => {
  res.send("Place Pulse Running 🎉🎉🎉🎊");
});
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/accommodation", require("./routes/accommodations.routes"));
app.use("/api/v1/users", require("./routes/user.routes"));
app.use("/api/v1/paymentmethods", require("./routes/paymentmethods.routes"));
app.use("/api/v1/booking", require("./routes/booking.routes"));
app.use("/api/v1/notifications", require("./routes/notifications.routes"));
app.listen(5454, () => {
  console.log("server is running on port 5454");
});
