const client = require("../database/connection");
const { default: createNotification } = require("../utils/createNotification");

exports.createNotification = async (req, res) => {
  const { message, email, recipientId } = req.body;
  if (!message || !recipientId || !recipientId) {
    res.status(400).send({ message: "All fields are required", status: 400 });
    return;
  }
  if (await createNotification) {
    res
      .status(200)
      .send({ message: "Notification sent successfully", status: 200 });
  } else {
    res
      .status(500)
      .send({ message: "Failed to send notification", status: 500 });
  }
};

exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await client.query(
      "SELECT * FROM notifications WHERE recipient = $1",
      [req.user.id],
    );
    res.status(200).json({
      message: "Notifications fetched successfully",
      status: 200,
      data: notifications.rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};
