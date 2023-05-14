const { signin, signup, refreshToken } = require('../controllers/authController');

const router = require('express').Router();

// api endpoint for logging in
router.post('/signin', signin);

// api endpoint for creating a user account
router.post('/signup', signup);

// api endpoint for refreshing tokens
router.post('/refresh-token', refreshToken);

module.exports = router;
