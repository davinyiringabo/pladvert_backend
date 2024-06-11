const joi = require("joi");

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const registerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).max(20).required(),
  phone: joi.string().min(10).max(12).required(),
  role: joi.string().uppercase().required().valid("ADMIN", "USER", "OWNER"),
});

const passwordSchema = joi.object({
  password: joi.string().min(8).max(20).required(),
});
module.exports.passwordSchema = passwordSchema;
module.exports.registerSchema = registerSchema;
module.exports.loginSchema = loginSchema;
