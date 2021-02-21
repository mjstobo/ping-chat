const express = require("express");
const router = express.Router();
const session = require("express-session");

const {
  createUser,
  checkUserExists,
  logUserIn,
  getUserRecord,
} = require("../db/user-db");

router.post("/", async (req, res) => {
  await createUser(req.body.username, req.body.password);
  res.status(200).send("Done");
});

router.post("/login", async (req, res) => {
  let userExists = await checkUserExists(req.body.username);
  if (userExists) {
    let userRecord = await getUserRecord(req.body.username);
    let parsedUser = userRecord.rows[0];
    let canUserLogIn = await logUserIn(parsedUser.username, req.body.password);
    if (canUserLogIn) {
      session.userLoggedIn = true;
      console.log(session);
      res.status(200).send("User logged in successfully");
    } else {
      session.userLoggedIn = false;
      console.log(session);
      res.status(200).send("Log-in attempt unsuccessful");
    }
  }
});

module.exports = router;
