const client = require("../database/connection");
const checkUserExistance = require("../utils/exists.js");
const { v4: uuidv4 } = require("uuid");

exports.registerBooking = async (req, res) => {
  const {
    checkIn,
    checkOut,
    accommodationId,
    paymentType,
    paymentMethodId,
    paymentTotal,
    accommodationOwnerId,
    totalPrice,
    image,
    name,
    status,
  } = req.body;
  if (
    (!checkIn,
    !checkOut,
    !accommodationId,
    !paymentType,
    !paymentMethodId,
    !paymentTotal,
    !accommodationOwnerId,
    !totalPrice,
    !image,
    !name,
    !status)
  ) {
    res.status(400).send({ message: "Fill All Fields", status: 400 });
    return;
  }

  try {
    const bookingId = uuidv4();
    const query =
      "INSERT INTO bookings (id,accommodation_id,user_id,accommodation_owner_id,name,image,check_in,check_out,payment_type,payment_total,payment_method,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)";
    const data = await client.query(query, [
      bookingId,
      accommodationId,
      req.user.id,
      accommodationOwnerId,
      name,
      image,
      checkIn,
      checkOut,
      paymentType,
      paymentTotal,
      paymentMethodId,
      status,
    ]);

    res.status(200).send({
      message: "Successfully Created Booking",
      data: data.rows[0],
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "Internal server error", error: err.message });
    return;
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const methods = await client.query(
      "SELECT * FROM bookings WHERE user_id = $1",
      [req.user.id],
    );
    res.status(200).json({
      message: "Bookings fetched successfully",
      status: 200,
      data: methods.rows,
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
exports.getAllBookings = async (req, res) => {
  try {
    const methods = await client.query("SELECT * FROM bookings");
    res.status(200).json({
      message: "Bookings fetched successfully",
      status: 200,
      data: methods.rows,
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

exports.deleteBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const methods = await client.query(
      "DELETE FROM bookings WHERE id = $1 AND user_id= $2",
      [id, req.user.id],
    );
    res.status(200).json({
      message: "Booking methods fetched successfully",
      status: 200,
      data: methods.rows,
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

exports.getAllOwnerBookings = async (req, res) => {
  try {
    const methods = await client.query(
      "SELECT * FROM bookings WHERE accommodation_owner_id = $1",
      [req.user.id],
    );
    res.status(200).json({
      message: "Bookings fetched successfully",
      status: 200,
      data: methods.rows,
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

module.exports = exports;
