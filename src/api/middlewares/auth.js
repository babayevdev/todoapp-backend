const jwt = require('jsonwebtoken');
const { getUserById } = require('../../services/userService');
const { unauthorizationResponse } = require('../../utils/responseHandler');
const { ACCESS_TOKEN_SECRET } = require('../../config/env');

const auth = async (req, res, next) => {
  try {
    // 1. Get access token from authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(unauthorizationResponse());
    }
    // 2. Verify access token
    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    // 3. Find user with matching id
    const user = await getUserById(decodedToken.userId);
    // 4. Attach user object to request object
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
