const {
  login,
  signup,
  signupOwner,
  verifyCode,
  resetPassword,
  sendCode,
} = require("../controllers/auth.controllers");
const express = require("express");
const router = express.Router();
router.post("/login", login);
router.post("/signup", signup);
router.post("/verify", verifyCode);
router.post("/sendCode", sendCode);
router.post("/resetPassword", resetPassword);

module.exports = router;
