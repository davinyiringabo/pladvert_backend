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
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */
router.post("/login", login);
/**
 * @swagger
 * /api/v1/auth:
 *   post:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */
router.post("/signup", signup);
/**
 * @swagger
 * /api/v1/auth:
 *   post:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */
router.post("/verify", verifyCode);
/**
 * @swagger
 * /api/v1/auth:
 *   post:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */
router.post("/sendCode", sendCode);
/**
 * @swagger
 * /api/v1/auth:
 *   post:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */
router.post("/resetPassword", resetPassword);

module.exports = router;
