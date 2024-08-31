const client = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

const createNotification = async (message, recipientId) => {
  try {
    const createdAt = new Date();
    const id = uuidv4();
    await client.query(
      "INSERT INTO notifications (id, message, recipient, time) VALUES ($1, $2, $3, $4)",
      [id, message, recipientId, createdAt],
    );
    return { success: true, message: "Notification created successfully" };
  } catch (err) {
    console.log("Error creating notification", err);
    return {
      success: false,
      message: "Failed to create notification",
      error: err,
    };
  }
};

module.exports = createNotification;
