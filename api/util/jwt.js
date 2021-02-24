const jwt = require("jsonwebtoken");
const jwtTokenSecret = "gfh423626";

const generateJWTToken = (payload) => {
  return jwt.sign(payload, jwtTokenSecret);
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtTokenSecret);
};

module.exports = {
  generateJWTToken,
  verifyToken,
};
