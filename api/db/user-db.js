const bcrypt = require("bcrypt");
const db = require("./index");
const saltRounds = 10;

const createUser = async (username, password) => {
  const userAlreadyExists = await checkUserExists(username);
  if (userAlreadyExists) {
    return new Error("User already exists");
  } else {
    const hash = await hashPassword(password);
    const queryText =
      "INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *";
    const values = [username, hash];

    let userQuery = await db.query(queryText, values);

    if (userQuery.rows[0]) {
      return userQuery;
    } else {
      return new Error("User query failed");
    }
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
