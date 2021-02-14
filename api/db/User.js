const bcrypt = require("bcrypt");
const db = require("./index");
const saltRounds = 10;

const createUser = async (username, password) => {
  const hash = await hashPassword(password);

  const queryText =
    "INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *";
  const values = [username, hash];

  return db.query(queryText, values, (err, res) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      return res.rows[0];
    }
  });
};

const hashPassword = async (password) => {
  let passwordHash = await bcrypt.hash(password, saltRounds);
  console.log(passwordHash);
  return passwordHash;
};

const checkUserExists = async (term) => {
  return db.query("SELECT * FROM users WHERE username = $1", [term]);
};

const logUserIn = async (username, password) => {
  console.log(username, password);
  let dbPasswordHash = await retrievePasswordHash(username);
  console.log(dbPasswordHash);
  let result = await bcrypt.compare(password, dbPasswordHash);

  if (result) {
    console.log("user logged in");
  } else {
    console.log("user not logged in");
  }

  return result;
};

const retrievePasswordHash = async (username) => {
  let retrievedData = await db.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  return retrievedData.rows[0].password;
};

module.exports = {
  createUser,
  checkUserExists,
  logUserIn,
};
