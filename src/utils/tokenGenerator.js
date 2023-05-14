const jwt = require('jsonwebtoken');
const {
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE,
  ACCESS_TOKEN_EXPIRE,
} = require('../config/env');

// function that generates access token
function generateAccessToken(userId) {
  const accessToken = jwt.sign(
    { userId },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRE },
  );
  return accessToken;
}

// function that generates refresh token
function generateRefreshToken(userId) {
  const refreshToken = jwt.sign(
    { userId },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRE },
  );
  return refreshToken;
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};