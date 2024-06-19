const express = require("express");
const {
  registerAccommodation,
  getAllOwnerAccommodations,
  getAllAccommodations,
  getAccommodationById,
  deleteAccommodationById,
} = require("../controllers/accommodations.controllers");
const { authMiddleWare } = require("../middlewares/auth.middleware");
const router = express.Router();
const { v2: cloudinary } = require("cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "diyhjfgqr",
  api_key: "315646517646365",
  api_secret: "dby7roqyWWAAJ8Zk8ZRLl9KN8-w",
});

const upload = multer({ dest: "uploads/" });

router.post(
  "/create",
  [upload.array("images", 5), authMiddleWare],
  registerAccommodation,
);
router.get("/getMine", [authMiddleWare], getAllOwnerAccommodations);
router.get("/all", getAllAccommodations);
router.get("/get/:id", getAccommodationById);
router.delete("/delete/:id", deleteAccommodationById);

module.exports = router;
