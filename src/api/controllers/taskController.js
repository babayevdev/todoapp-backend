const taskService = require('../../services/taskService');
const { 
  successResponse,
  badRequestResponse,
} = require('../../utils/responseHandler');
const { TASK_STATUS } = require('../../config/constants');

async function createTask(req, res, next) {
  try {
    const { title, description, deadline, assignee, priority } = req.body;

    // create a task
    const task = await taskService.createTask({
      title,
      description,
      priority,
      assignee: assignee ? assignee : null,
      deadline: deadline ? new Date(deadline).getTime() : deadline, // change date string to number
      state: TASK_STATUS.TODO,
      creator: req.user.id,
    });

    const response = successResponse({ task });
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  try {
    const { taskId } = req.params;
    const { title, description, deadline, state, assignee, priority} = req.body;
    
    // 1. Update the task
    const task = await taskService.updateTaskById(taskId, {
      title,
      description,
      assignee,
      state,
      priority,
      deadline: deadline ? new Date(deadline).getTime() : deadline,
    });
    // 2. If task doesn't exists, return an error response
    if (!task) {
      next(badRequestResponse('Task not found'));
    }

    const response = successResponse({ task });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

async function deleteTask(req, res, next) {
  try {
    const { taskId } = req.params;

    // delete the task
    await taskService.deleteTaskById(taskId);

    const response = successResponse({ message: 'Task deleted successfully' });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

async function getAllTasks(req, res, next) {
  try {
    const { page = 1, pageSize = 5, search, state, priority } = req.query;

    // 1. Calculate skip and limit
    const skip = (page - 1) * pageSize;
    // 2. Make query for finding purpose
    const findQuery = { creator: req.user.id};
    if (state) findQuery.state = state;
    if (priority) findQuery.priority = priority;
    if (search) {
      const regex = new RegExp(search, 'i');
      findQuery.$or = [{ title: regex }, { description: regex }];
    }
    // 3. Get result
    const [tasks, taskCount] = await taskService.getAllTasks(findQuery, skip, pageSize);

    const response = successResponse({ tasks, page, pageSize, taskCount });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
};
