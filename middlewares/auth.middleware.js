const jwt = require("jsonwebtoken");
const client = require("../database/connection");

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .send({ message: "Unauthorized to perform this action!", status: 401 });
    }

    const decoded = jwt.verify(token, "jakarabotiboardi");
    const currentTimeStamp = Math.floor(new Date() / 1000);
    if (decoded.exp && decoded.exp <= currentTimeStamp) {
      return res.status(401).send({
        message: "Your token has expired! Login in to continue!",
        status: 401,
      });
    }
    const getUserQuery = "SELECT * FROM users WHERE email = $1;";
    const user = await client.query(getUserQuery, [decoded.email]);

    req.user = user.rows[0];
    next();
  } catch (err) {
    console.log("Error occurred when verifying token!", err);
    res.status(401).send({ message: "Invalid Token!", status: 401 });
  }
};

module.exports = authMiddleWare;
