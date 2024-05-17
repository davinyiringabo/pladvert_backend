const { client } = require("../config/database/connect");
const checkUserExistance = require("../utils/exists");

exports.updateUser = async (req, res) => {
  const { firstName, lastName, email, position, phone } = req.body;

  if (!firstName || !lastName || !email || !position || !phone) {
    return res
      .status(400)
      .send({ message: "Please Provide all credentials!", status: 400 });
  }

  if (!checkUserExistance(email)) {
    return res
      .status(400)
      .send({ message: "Please Provide all credentials!", status: 400 });
  }

  try {
    const updateQuery =
      "UPDATE users SET firstName = $1, lastName = $2, email = $3, position = $4, phone = $5 WHERE email = $3";
    const updatedUser = await client.query(updateQuery, [
      firstName,
      lastName,
      email,
      position,
      phone,
    ]);
    console.log(updatedUser);

    res
      .status(200)
      .send({ message: "Updated user successfully!", status: 200 });
  } catch (err) {
    console.log("There was an error while updating the user: ", err);
    return res.status(500).send({
      message: "error occured while updating the user! try again later!",
      status: 500,
    });
  }
};
exports.deleteUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .send({ message: "Please Provide all credentials!", status: 400 });
  }

  if (!checkUserExistance(email)) {
    return res
      .status(400)
      .send({ message: "Please Provide a valid email!", status: 400 });
  }

  try {
    const updateQuery = "DELETE FROM users WHERE email = $1";
    const deletedUser = await client.query(updateQuery, [email]);
    console.log(deletedUser);

    res
      .status(200)
      .send({ message: "Deleted user successfully!", status: 200 });
  } catch (err) {
    console.log("There was an error while deleting the user: ", err);
    return res.status(500).send({
      message: "error occured while deleting the user! try again later!",
      status: 500,
    });
  }
};

exports.getUserByEmail = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .send({ message: "Please Provide an email!", status: 400 });
  }

  if (!checkUserExistance(email)) {
    return res
      .status(400)
      .send({ message: "Please Provide a valid email!", status: 400 });
  }

  try {
    const fetchQuery = "SELECT * FROM users WHERE email = $1";
    const fetchUser = await client.query(fetchQuery, [email]);
    console.log(fetchUser);

    res.status(200).send({
      message: "Fetched user successfully!",
      status: 200,
      user: fetchUser.rows[0],
    });
  } catch (err) {
    console.log("There was an error while fetching a user: ", err);
    return res.status(500).send({
      message: "error occured while fetching the user! try again later!",
      status: 500,
    });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .send({ message: "Please Provide an id!", status: 400 });
  }

  try {
    const fetchQuery = "SELECT * FROM users WHERE id = $1";
    const fetchUser = await client.query(fetchQuery, [id]);
    console.log(fetchUser);

    res.status(200).send({
      message: "Fetched user successfully!",
      status: 200,
      user: fetchUser.rows[0],
    });
  } catch (err) {
    console.log("There was an error while fetching a user: ", err);
    return res.status(500).send({
      message: "error occured while fetching the user! try again later!",
      status: 500,
    });
  }
};
