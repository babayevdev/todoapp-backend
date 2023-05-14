const router = require('express').Router();
const { getAllUsers } = require('../controllers/userController');

// apiendpoint for getting all users
router.get('/', getAllUsers);

module.exports = router;