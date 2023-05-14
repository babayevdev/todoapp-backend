const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  getUserByEmail,
  getUserById,
  createUser,
} = require('../../services/userService');
const {
  customErrorResponse,
  badRequestResponse,
  successResponse,
  unauthorizationResponse,
} = require('../../utils/responseHandler');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../../utils/tokenGenerator');
const { REFRESH_TOKEN_SECRET } = require('../../config/env');

async function signup(req, res, next) {
  try {
    const { username, email, password, confirmPassword } = req.body;
    
    // 1. Check if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      const response = customErrorResponse(409, 'User already exists');
      return res.json(response);
    }
    // 2. Confirm password
    if (password !== confirmPassword) {
      next(badRequestResponse('Confirm password is incorrect'));
    }
    // 3. Create a user with encrypting password
    const hashedPassword = await bcrypt.hash(password, 12);
    await createUser({ username, email, password: hashedPassword });

    const response = successResponse();
    res.json(response);
  } catch (error) {
    next(error);
  }
};

async function signin(req, res, next) {
  try {
    const { email, password } = req.body;

    // 1. Check if email is valied
    const user = await getUserByEmail(email);
    if (!user) {
      next(unauthorizationResponse('Email is not valid.'));
    }
    // 2. Check if password is valied
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      next(unauthorizationResponse('Password is not valid'));
    }
    // 3. Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const response = successResponse({
      accessToken,
      refreshToken,
      userId: user.id,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;

    // 1. Verify refresh token
    const decodedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    // 2. Check if user exists
    const user = await getUserById(decodedToken?.userId);
    if (!user) {
      next(unauthorizationResponse('Invalied refresh token.'));
    }
    // 3. Generate new access token
    const accessToken = generateAccessToken(user._id);

    const response = successResponse({ accessToken });
    res.json(response);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(unauthorizationResponse('Invalied refresh token.'));
    }
    next(error);
  }
}

module.exports = {
  signup,
  signin,
  refreshToken,
}