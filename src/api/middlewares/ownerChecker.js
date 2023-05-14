const { getTaskById } = require("../../services/taskService");
const { forbiddenResponse } = require("../../utils/responseHandler");

const taskOwnerChecker = async (req, res, next) => {
  const { taskId } = req.params;

  // 1. Get task
  const task = await getTaskById(taskId);
  // 2. Check if the current user is an owner of the task
  if (req.user._id.toString() !== task.creator.toString()) {
    next(forbiddenResponse());
  }

  next();
}

module.exports = {
  taskOwnerChecker,
};