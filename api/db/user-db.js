const bcrypt = require("bcrypt");
const db = require("./index");
const saltRounds = 10;

const createUser = async (username, password) => {
  const userAlreadyExists = await checkUserExists(username);
  if (userAlreadyExists) {
    return false;
  } else {
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
  }
};

const hashPassword = async (password) => {
  let passwordHash = await bcrypt.hash(password, saltRounds);
  return passwordHash;
};

const checkUserExists = async (term) => {
  const userRecord = await db.query("SELECT * FROM users WHERE username = $1", [
    term,
  ]);

  if (userRecord.rows[0]) {
    return true;
  } else {
    return false;
  }
};

const getUserRecord = async (username) => {
  return await db.query("SELECT * FROM users WHERE username = $1", [username]);
};

const logUserIn = async (username, password) => {
  let dbPasswordHash = await retrievePasswordHash(username);
  let result = await bcrypt.compare(password, dbPasswordHash);

  if (result) {
    return true;
  } else {
    return false;
  }
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
  getUserRecord,
};
