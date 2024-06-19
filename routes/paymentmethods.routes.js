const express = require("express");
const {
  getAllAccommodations,
  getAccommodationById,
  deleteAccommodationById,
} = require("../controllers/accommodations.controllers");
const router = express.Router();
const { authMiddleWare } = require("../middlewares/auth.middleware");
const {
  registerPaymentMethod,
  getMyMethods,
  removePaymentMethod,
} = require("../controllers/paymentmethods.controllers");

router.post("/create", authMiddleWare, registerPaymentMethod);
router.get("/getMine", authMiddleWare, getMyMethods);
router.delete("/delete/:id", authMiddleWare, removePaymentMethod);

module.exports = router;