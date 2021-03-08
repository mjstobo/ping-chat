const express = require("express");
const router = express.Router();
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
      let refresh_token = generateJWTToken({
        refresh_token: "refresh my session!",
        ...userObj,
      });
      console.log(`User ${parsedUser.username} has logged in successfully`);
      res.cookie("ping_refresh", refresh_token, {
        expires: new Date(Date.now() + 36000),
        httpOnly: true,
      });
      res.status(200).json({
        message: "User logged in successfully",
        user: parsedUser.username,
        token: token,
      });
    } else {
      console.log(`Failed login attempt`);
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

router.get("/me", async (req, res) => {
  const refreshToken = req.cookies.ping_refresh;

  if (refreshToken) {
    try {
      let tokenPayload = verifyToken(refreshToken);
      console.log(tokenPayload);

      if (tokenPayload.expires - Date.now()) {
        // token has expired, user must login
      } else {
        let newRefreshToken = generateJWTToken({
          ...tokenPayload,
          date: Date.now(),
        });
        let newJWTToken = generateJWTToken({
          user: tokenPayload.user,
          loggedInDate: Date.now(),
        });
        res.cookie("ping_refresh", newRefreshToken, {
          expires: new Date(Date.now() + 36000),
          httpOnly: true,
        });
        res.status(200).json({
          user: tokenPayload.user,
          token: newJWTToken,
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Refresh Token not found. Unable to revalidate session");
    res.status(400).json({
      message: "Unable to refresh user session",
    });
  }
});

module.exports = router;
