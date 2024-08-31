const express = require("express");
const router = express.Router();
const { authMiddleWare } = require("../middlewares/auth.middleware");
const {
  registerBooking,
  getMyBookings,
  deleteBooking,
  getAllBookings,
  getAllOwnerBookings,
  markAsSuccessBooked,
  getAllBookedDates,
  getAllBookingsEarnings,
} = require("../controllers/booking.controllers");

router.post("/create", authMiddleWare, registerBooking);
router.get("/getMine", authMiddleWare, getMyBookings);
router.get("/owner/getAll", authMiddleWare, getAllOwnerBookings);
router.get("/all", authMiddleWare, getAllBookings);
router.delete("/delete/:id", authMiddleWare, deleteBooking);
router.get("/payment/complete/:id", [authMiddleWare], markAsSuccessBooked);
router.get("/booked_days/:id", getAllBookedDates);
router.get("/earnings/total", getAllBookingsEarnings);
module.exports = router;
