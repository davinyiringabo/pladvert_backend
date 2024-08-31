const express = require("express");
const router = express.Router();
const {
  createNotification,
  getMyNotifications,
} = require("../controllers/notifications.controllers");
const { authMiddleWare } = require("../middlewares/auth.middleware");
router.post("/create", createNotification);
router.get("/mine", authMiddleWare, getMyNotifications);

module.exports = router;
