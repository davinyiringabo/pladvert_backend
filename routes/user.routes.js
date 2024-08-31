const express = require("express");
const router = express.Router();
const { authMiddleWare } = require("./../middlewares/auth.middleware");
const {
  getMyProfile,
  getAllOwners,
} = require("../controllers/user.controllers");
router.get("/me", authMiddleWare, getMyProfile);
router.get("/owners/all", authMiddleWare, getAllOwners);

module.exports = router;
