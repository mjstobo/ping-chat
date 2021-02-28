const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { generateJWTToken, verifyToken } = require("../util/jwt");

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
      let userObj = {
        user: parsedUser.username,
        loggedInDate: Date.now(),
      };
      let token = generateJWTToken(userObj);
      res.cookie("ping", token);
      res
        .status(200)
        .json({
          message: "User logged in successfully",
          user: parsedUser.username,
        });
    } else {
      res.status(400).json({ message: "User could not be logged in" });
    }
  } else {
    res.status(400).json({ message: "User does not exist" });
  }
});

router.post("/check", async (req, res) => {
  let tokenContents = verifyToken(req.body.token);
  console.log(tokenContents);
  res.status(200).send("Checked!");
});
module.exports = router;
