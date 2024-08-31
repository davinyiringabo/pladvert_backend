const Joi = require("joi");
const client = require("../database/connection");
const generateToken = require("../utils/generateToken.js");
const sendEmail = require("../utils/sendEmail.js");
const bcrypt = require("bcrypt");
const joi = require("joi");
const {
  loginSchema,
  registerSchema,
  passwordSchema,
} = require("../models/joi.schema.js");
const checkUserExistance = require("../utils/exists.js");
const { v4: uuidv4 } = require("uuid");
const { generateOTP } = require("../utils/generateOTP.js");
const sendVerificationEmail = require("../utils/emails/verification.js");
const createNotification = require("../utils/createNotification.js");

exports.registerPaymentMethod = async (req, res) => {
  const { number, name, type, cvc, expdate } = req.body;
  if (!type || !number) {
    res
      .status(400)
      .send({ message: "Fill All Fields (number, type)", status: 400 });
    return;
  }

  try {
    const methodId = uuidv4();
    const query =
      "INSERT INTO paymentmethods (id,name,number,type,cvc,expdate,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7)";
    const data = await client.query(query, [
      methodId,
      name,
      number,
      type,
      cvc,
      expdate,
      req.user.id,
    ]);
    createNotification(
      `You have successfully added a new payment method`,
      req.user.id,
    );
    res.status(200).send({
      message: "Successfully Added Payment Method",
      data: data.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
    return;
  }
};

exports.getMyMethods = async (req, res) => {
  try {
    const methods = await client.query(
      "SELECT * FROM paymentmethods WHERE user_id = $1",
      [req.user.id],
    );
    res.status(200).json({
      message: "Payment methods fetched successfully",
      status: 200,
      data: methods.rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      data: err,
    });
  }
};

exports.removePaymentMethod = async (req, res) => {
  const id = req.params.id;
  try {
    const methods = await client.query(
      "DELETE FROM paymentmethods WHERE id = $1 AND user_id= $2",
      [id, req.user.id],
    );
    res.status(200).json({
      message: "Payment methods fetched successfully",
      status: 200,
      data: methods.rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      data: err,
    });
  }
};

module.exports = exports;
