const express = require("express");
const {
  registerAccommodation,
} = require("../controllers/accommodations.controllers");
const authMiddleWare = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/create", registerAccommodation);

module.exports = router;
