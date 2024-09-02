const express = require("express");
const router = express.Router();
const {
  createNotification,
  getMyNotifications,
  subscribe,
  contactUs,
} = require("../controllers/notifications.controllers");
const { authMiddleWare } = require("../middlewares/auth.middleware");
router.post("/create", createNotification);
router.post("/subscribe", subscribe);
router.post("/contact_us", contactUs);
router.get("/mine", authMiddleWare, getMyNotifications);

module.exports = router;
