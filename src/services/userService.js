const User = require('../db/models/userModel');

async function getUserByEmail(email) {
  const user = await User.findOne({email});
  return user;
}

async function getUserById(userId) {
  const user = await User.findById({_id: userId});
  return user;
}

async function createUser(data) {
  const user = new User(data);
  await user.save();
  return user;
}

async function getAllUsers(field) {
  const users = await User.find({}).select(field.join(' '));
  return users;
}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  getAllUsers,
};