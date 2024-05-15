const joi = require("joi");

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).max(20).required(),
});

module.exports.loginSchema = loginSchema;
