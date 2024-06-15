const express = require("express");
const router = express.Router();
const { authMiddleWare } = require("./../middlewares/auth.middleware");
const { getMyProfile } = require("../controllers/user.controllers");
router.get("/me", authMiddleWare, getMyProfile);

module.exports = router;
