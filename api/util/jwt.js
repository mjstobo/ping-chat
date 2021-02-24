const jwt = require("jsonwebtoken");
const jwtTokenSecret = "gfh423626";

const generateJWTToken = (payload) => {
  let token = jwt.sign(payload, jwtTokenSecret);
  console.log(token);
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtTokenSecret);
};

module.exports = {
  generateJWTToken,
  verifyToken,
};
