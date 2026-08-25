const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    env.jwt.accessSecret,
    {
      expiresIn: env.jwt.accessExpiresIn,
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user._id.toString(),
    },
    env.jwt.refreshSecret,
    {
      expiresIn: env.jwt.refreshExpiresIn,
    }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, env.jwt.accessSecret);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.jwt.refreshSecret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};