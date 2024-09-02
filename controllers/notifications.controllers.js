const client = require("../database/connection");
const { default: createNotification } = require("../utils/createNotification");
const { v4: uuidv4 } = require("uuid");
const sendSubscribeEmail = require("../utils/emails/subscribe");
const sendContactUsEmail = require("../utils/emails/contactUs");

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

exports.subscribe = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).send({ message: "Email is required", status: 400 });
    return;
  }
  try{
    const id = uuidv4();
    console.log(id);
    const query = "INSERT INTO subscribers (id, email) VALUES ($1, $2)";
    const result = await client.query(query, [id, email]);
    if(sendSubscribeEmail(email)){
      console.log("Subscribe Email sent successfully");
    }
    else{
      console.log("Failed to send subscribe email");
    }
    res.status(200).send({ message: "Subscribed successfully", status: 200 });
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      message: "Failed to subscribe",
      data: err,
      status: 500,
    });
  }

};

exports.contactUs = async (req, res) => {
  const { email, name, message } = req.body;
  if (!email || !name || !message) {
    res.status(400).send({ message: "All Fields are required", status: 400 });
    return;
  }
  try{
    const id = uuidv4();
    console.log(id);
    const query = "INSERT INTO contacts (id, email, name, message) VALUES ($1, $2, $3, $4)";
    const result = await client.query(query, [id, email, name, message]);
    if(sendContactUsEmail(email)){
      console.log("Contact Us Email sent successfully");
    }
    else{
      console.log("Failed to send contact us email");
    }
    res.status(200).send({ message: "Message Sent Successfully", status: 200 });
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      message: "Failed to make contact",
      data: err,
      status: 500,
    });
  }

};
