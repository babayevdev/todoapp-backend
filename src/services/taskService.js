const Task = require('../db/models/taskModel');

async function createTask(data) {
  const task = await Task.create(data);
  return task.populate('assignee', '_id username');
}

async function updateTaskById(taskId, data) {
  const task = await Task.findByIdAndUpdate(taskId, data, {new: true}).populate('assignee', '_id username');
  return task;
}

async function deleteTaskById(taskId) {
  await Task.findByIdAndDelete(taskId);
}

async function getAllTasks(findQuery, skip, count, search) {
  let query = Task.find(findQuery).populate('assignee', '_id username');
  
  if (skip) query = query.skip(skip);
  if (count) query = query.limit(count);
  
  const taskCount =await Task.find(findQuery).count();
  const tasks = await query.exec();
  
  return [tasks, taskCount];
}

async function getTaskById(taskId) {
  const task = await Task.findById(taskId);
  return task;
}

module.exports = {
  createTask,
  updateTaskById,
  deleteTaskById,
  getAllTasks,
  getTaskById,
};
