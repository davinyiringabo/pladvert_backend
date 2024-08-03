const otpGenerator = require("otp-generator");
const checkUserExistance = require("./exists");
const client = require("../database/connection.js");

const generateOTP = async (email, res) => {
  // Generate a 6-digit OTP
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  console.log(otp);

  try {
    // Check if the user exists
    if (await checkUserExistance(email)) {
      const insertQuery = "INSERT INTO otp (email, otp) VALUES ($1, $2);";
      const result = await client.query(insertQuery, [email, otp]);
      
      console.log("Inserted OTP Rows:", result.rowCount); // Changed 'insertedRaws' to 'result.rowCount'
      return otp;
    } else {
      console.log("User does not exist");
      // Return response indicating the user does not exist
      return res.status(400).send({ message: "User with that email does not exist!" });
    }
  } catch (err) {
    console.error("Error when inserting OTP:", err);
    // Return a server error response
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports.generateOTP = generateOTP;
