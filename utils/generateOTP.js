const otpGenerator = require("otp-generator");
const checkUserExistance = require("./exists");
const client = require("../database/connection.js");
const generateOTP = async (email, res) => {
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  console.log(otp);

  try {
    if (checkUserExistance(email)) {
      const deleteExistingCode = await client.query(
        "DELETE FROM otp WHERE email = $1;",
        [email],
      );
      console.log(deleteExistingCode);

      const insertQuery = "INSERT INTO otp (email,otp) values ($1,$2);";
      const insertedRaws = await client.query(insertQuery, [email, otp]);
      console.log("inserted Rows:", insertedRaws.rows);
      return otp;
    } else {
      console.log("User does not exist");
      res.status(400).send({ message: "User with that email does not exist!" });
      return;
    }
  } catch (err) {
    console.log("Error when inserting OTP:", err);
  }
};
module.exports.generateOTP = generateOTP;
