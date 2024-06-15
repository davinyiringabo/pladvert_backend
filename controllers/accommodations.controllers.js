const { v2: cloudinary } = require("cloudinary");
const client = require("../database/connection");
const fs = require("fs").promises; // to handle file deletion
const { v4: uuidv4 } = require("uuid");
cloudinary.config({
  cloud_name: "diyhjfgqr",
  api_key: "315646517646365",
  api_secret: "dby7roqyWWAAJ8Zk8ZRLl9KN8-w",
});

exports.registerAccommodation = async (req, res) => {
  const {
    name,
    location,
    type,
    price,
    amenities,
    discount,
    freebies,
    stock,
    description,
    rating,
  } = req.body;
  const images = req.files;

  console.log(stock);
  if (!name || !location || !images || !type || !price) {
    return res.status(400).json({
      message: "Please provide required data",
      status: 400,
    });
  }

  try {
    const uploadedImages = [];
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: "uploads",
      });
      // console.log(result);
      uploadedImages.push(result.secure_url);

      // Delete the file from the server after upload
      await fs.unlink(image.path);
    }

    console.log({
      name,
      location,
      type,
      price,
      images: uploadedImages,
    });

    try {
      const accommodationId = uuidv4();
      const savedData = await client.query(
        "INSERT INTO accommodations (id, type, price, images, owner_id, name, location, discount, amenities, freebies, stock, description, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
        [
          accommodationId,
          type,
          price,
          uploadedImages,
          req.user.id,
          name,
          location,
          discount,
          [JSON.parse(amenities)],
          [JSON.parse(freebies)],
          stock,
          description,
          parseInt(rating),
        ],
      );

      console.log("results", savedData);
      res.status(200).json({
        message: "Accommodation registered successfully",
        status: 200,
        data: {
          name,
          location,
          type,
          price,
          images: uploadedImages,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
        status: 500,
      });
    }
  } catch (error) {
    console.error("Error registering accommodation:", error);
    res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};

exports.getAllOwnerAccommodations = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const accommodations = await client.query(
      "SELECT * FROM accommodations WHERE owner_id = $1",
      [ownerId],
    );
    console.log(accommodations.rows);
    res.status(200).json({
      message: "Accommodations fetched successfully",
      status: 200,
      data: accommodations.rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      data: err,
    });
  }
};

exports.getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await client.query("SELECT * FROM accommodations");
    console.log(accommodations.rows);
    res.status(200).json({
      message: "Accommodations fetched successfully",
      status: 200,
      data: accommodations.rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      data: err,
    });
  }
};
exports.getAccommodationById = async (req, res) => {
  const id = req.params.id;
  console.log("this is id --> ", id);
  try {
    const accommodations = await client.query(
      "SELECT * FROM accommodations WHERE id = $1",
      [id],
    );
    console.log(accommodations.rows);
    res.status(200).json({
      message: "Accommodation fetched successfully",
      status: 200,
      data: accommodations.rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Bad request",
      status: 400,
      data: err,
    });
  }
};
exports.DelteAccommodationById = async (req, res) => {
  const id = req.params;
  console.log("this is id --> ", id);
  try {
    const accommodations = await client.query(
      "DELETE * FROM accommodations WHERE id = $1",
      [id],
    );
    console.log(accommodations.rows);
    res.status(200).json({
      message: "Accommodation Deleted successfully",
      status: 200,
      data: accommodations.rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Bad request",
      status: 400,
      data: err,
    });
  }
};

module.exports = exports;
