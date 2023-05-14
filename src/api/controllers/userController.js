const userService = require('../../services/userService');
const { 
  successResponse,
} = require('../../utils/responseHandler');

async function getAllUsers(req, res, next) {
  try {
    // get all tasks
    const users = await userService.getAllUsers(['id', 'username']);

    const response = successResponse({ users });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
};
