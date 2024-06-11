const Joi = require("joi");
const client = require("../database/connection");
const generateToken = require("../utils/generateToken.js");
const sendEmail = require("../utils/sendEmail.js");
const bcrypt = require("bcrypt");
const joi = require("joi");
const { loginSchema, registerSchema, passwordSchema } = require("../models/joi.schema.js");
const checkUserExistance = require("../utils/exists.js");
const { v4: uuidv4 } = require("uuid");
const { generateOTP } = require("../utils/generateOTP.js");
const sendVerificationEmail = require("../utils/emails/verification.js");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: "Fill All Fields Please", status: 400 });
    return;
  }
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    res.status(400).send({ message: error.details[0].message, status: 400 });
    return;
  }

  try {
    const query = "SELECT * FROM users where email = $1";
    const data = await client.query(query, [email]);

    if (data.rows.length === 0) {
      res
        .status(401)
        .send({ message: "Invalid email or password", status: 401 });
      return;
    }

    const user = data.rows[0];
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res
        .status(401)
        .send({ message: "Invalid email or password", status: 401 });
      return;
    }

    const token = generateToken(email, user.id);
    console.log(token);
    res.status(200).send({
      message: "Successfully logged in",
      data: { token: token, user: user },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
    return;
  }
};

exports.signup = async (req, res) => {
  const { email, password, role, phone } = req.body;
  console.log("request body --> ", req.body);

  if (!email || !password || !role || !phone) {
    res.status(400).send({ message: "Provide all required credentials" });
    return;
  }

  try {
    if (await checkUserExistance(email)) {
      res.status(400).send({
        message: "User with the same email exists. Login to continue.",
      });
      return;
    }
    const userId = uuidv4();

    const { error } = registerSchema.validate({
      email,
      password,
      role,
      phone,
    });

    if (error) {
      res.status(400).send({ message: error.details[0].message });
      return;
    }

    const encrypted = await bcrypt.hash(password, 15);
    const insertQuery =
      "INSERT INTO users (email, password, role, phone, id) VALUES ($1, $2, $3, $4, $5)";
    const insertData = await client.query(insertQuery, [
      email,
      encrypted,
      role,
      phone,
      userId,
    ]);
    console.log("User inserted:", insertData.rows[0]);
    const otp = await generateOTP(email, res);
    console.log(otp);
    if (sendEmail(email, otp, res)) {
      res.status(201).send({
        message:
          "Your Account has been successfully created! Navigate to your email to verify account!",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error!");
  }
};
exports.signupOwner = (req, res) => {};

exports.verifyCode = async (req, res) => {
  const { email, code } = req.body;
  console.log(email);
  if (!email || !code) {
    res.status(400).send({ message: "Provide all required credentials" });
    return;
  }

  try {
    const retrieveQuery = "SELECT * FROM otp WHERE email = $1";
    const retrievedCode = await client.query(retrieveQuery, [email]);
    console.log(retrievedCode);
    if (retrievedCode.rows.length !== 0) {
      if (retrievedCode.rows[0].otp == code) {
        const verifiedUser = await client.query(
          "UPDATE users SET verified = true WHERE email = $1;",
          [email],
        );
        const deleteUser = await client.query(
          "DELETE FROM otp WHERE email = $1",
          [email],
        );
        if (deleteUser) {
          console.log("deleted user --> ", deleteUser);
          return sendVerificationEmail(email)
            .then(() => {
              return res.status(200).send({
                message: "Verified account successfully!",
                status: 200,
              });
            })
        }
      } else {
        return res.status(401).send({ message: "Invalid Code", status: 401 });
      }
    }

    return res.status(401).send({ message: "Invalid user email!", status: 401 });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error!");
  }
};

exports.sendCode = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ message: "Provide email" });
  }

  console.log(await checkUserExistance(email));
  if (!(await checkUserExistance(email))) {
    return res
      .status(400)
      .send({ message: "User With the same email doesn't exist!" });
  }

  try {
    const otpCode = await generateOTP("nyiringabodavid62@gmail.com", res);
    if (!otpCode) {
      return res.status(400).send({
        message: "Sending Verification Code Failed! Try Again!",
        status: 400,
      });
    }

    if (await sendEmail(email, otpCode)) {
      return res
        .status(200)
        .send({ message: `Verification Code sent successfully to ${email}!` });
    } else {
      return res.status(200).send({
        message: `An error occured while sending verification code to ${email}! Try again later.`,
      });
    }
  } catch (err) {
    console.log("Error occured when sending verification code", err);
    return res.status(400).send({
      message:
        "An error occured while sending verification code! Try again later.",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res
      .status(400)
      .send({ message: "Please Provide all credentials!", status: 200 });
  }

  const {error} = passwordSchema.validate({
    password: newPassword
  });

  if(error){
    return res.status(400).send({ message: error.details[0].message, status: 400 });
  }

  if (!checkUserExistance(email)) {
    return res.status(400).send({ message: "User Not Found!", status: 200 });
  }

  try {
    const retrieveUserQuery = "SELECT * FROM users WHERE email = $1";
    const retrievedUser = await client.query(retrieveUserQuery, [email]);

    if (retrievedUser.rows.length !== 0) {
      const newEncryptedPassword = await bcrypt.hash(newPassword, 15);

      // Fix the table name in the UPDATE query and use different placeholders for email and password
      const updatePasswordQuery =
        "UPDATE users SET password = $1 WHERE email = $2";
      const updatedRows = await client.query(updatePasswordQuery, [
        newEncryptedPassword,
        email,
      ]);
      return res
        .status(200)
        .send({ message: "Reset password successfully!", status: 200 });
    }

    return res.status(400).send({ message: "User not found!", status: 400 });
  } catch (err) {
    console.log("Error occured when resetting password!", err);
    return res.status(400).send({
      message: "Error occured when resetting password! Try again later!",
      status: 400,
    });
  }
};

module.exports = exports;
