const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (email, id) => {
  try {
    // if (!process.env.JWT_KEY) {
    //   throw new Error("JWT_KEY is not defined in the environment.");
    // }

    const token = jwt.sign(
      {
        email: email,
        id: id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      },
      //   process.env.JWT_KEY,
      "jakarabotiboardi",
    );
    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    return null;
  }
};

module.exports = generateToken;
