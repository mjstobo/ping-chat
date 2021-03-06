const express = require("express");
const router = express.Router();
const { generateJWTToken, verifyToken } = require("../util/jwt");

const {
  createUser,
  checkUserExists,
  logUserIn,
  getUserRecord,
} = require("../db/user-db");

router.post("/register", async (req, res) => {
  console.log("registering attempt");
  try {
    if (req.body.username && req.body.password) {
      console.log(req.body);
      let newUser = await createUser(req.body.username, req.body.password);
      let parsedUser = newUser.rows[0];
      let logInUser = await loginHandler(
        parsedUser.username,
        req.body.password
      );

      if (logInUser.token && logInUser.refresh_token) {
        console.log(`User ${parsedUser.username} has logged in successfully`);
        res.cookie("ping_refresh", logInUser.refresh_token, {
          expires: new Date(Date.now() + 36000),
          httpOnly: true,
        });
        res.status(200).json({
          message: "User logged in successfully",
          user: parsedUser.username,
          token: logInUser.token,
        });
      } else {
        res
          .status(400)
          .json({ message: "Invalid credentials supplied to register user." });
      }
    } else {
      res
        .status(400)
        .json({ message: "Invalid credentials supplied to register user." });
    }
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ message: "User could not be registered. Please try again" });
  }
});

router.post("/login", async (req, res) => {
  let userExists = await checkUserExists(req.body.username);
  if (userExists) {
    let userRecord = await getUserRecord(req.body.username);
    let parsedUser = userRecord.rows[0];
    let logInUser = await loginHandler(parsedUser.username, req.body.password);

    if (logInUser.token && logInUser.refresh_token) {
      console.log(`User ${parsedUser.username} has logged in successfully`);
      res.cookie("ping_refresh", logInUser.refresh_token, {
        expires: new Date(Date.now() + 360000),
        httpOnly: true,
      });
      res.status(200).json({
        message: "User logged in successfully",
        user: parsedUser.username,
        token: logInUser.token,
      });
    } else {
      console.log(`Failed login attempt`);
      res.status(401).json({ message: "User could not be logged in" });
    }
  } else {
    res.status(400).json({ message: "User does not exist" });
  }
});

const loginHandler = async (user, password) => {
  let canUserLogIn = await logUserIn(user, password);
  if (canUserLogIn) {
    let userObj = {
      user: user,
      loggedInDate: Date.now(),
    };
    let token = generateJWTToken(userObj);
    let refresh_token = generateJWTToken({
      refresh_token: "refresh my session!",
      ...userObj,
    });
    return { token: token, refresh_token: refresh_token };
  }
  console.log("error finding tokens");
};

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
          expires: new Date(Date.now() + 360000),
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
    res.status(401).json({
      message: "Unable to refresh user session",
    });
  }
});

module.exports = router;
