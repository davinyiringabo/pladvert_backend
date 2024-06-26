const express = require("express");
const router = express.Router();
const { authMiddleWare } = require("../middlewares/auth.middleware");
const { registerBooking, getMyBookings, deleteBooking, getAllBookings } = require("../controllers/booking.controllers");

router.post("/create", authMiddleWare, registerBooking);
router.get("/getMine", authMiddleWare, getMyBookings);
router.get("/all", authMiddleWare, getAllBookings);
router.delete("/delete/:id", authMiddleWare, deleteBooking);

module.exports = router;