const client = require("../database/connection");

const checkUserExistance = async (email) => {
  const queryExistingUser = "SELECT * FROM users WHERE email = $1";
  const existingUserData = await client.query(queryExistingUser, [email]);
  console.log("testing boolean --> ", existingUserData.rows.length != 0)
  if (existingUserData.rows.length !== 0) {
    return true;
  }else{
    return false;
  }
};

module.exports = checkUserExistance;
