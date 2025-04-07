if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET;

const signToken = (payload) => {
  const token = jwt.sign(payload, jwtKey);
  return token;
};

const verifyToken = (token) => {
  const isVerified = jwt.verify(token, jwtKey);
  return isVerified;
};

module.exports = { signToken, verifyToken };
