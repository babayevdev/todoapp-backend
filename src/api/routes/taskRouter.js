const router = require('express').Router();
const {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
} = require('../controllers/taskController');
const { taskOwnerChecker } = require('../middlewares/ownerChecker');

// api endpoint for creating a task
router.post('/', createTask);

// api endpoint for updating a task
router.put('/:taskId', taskOwnerChecker, updateTask);

// api endpoint for deleting a task
router.delete('/:taskId', taskOwnerChecker, deleteTask);

// apiendpoint for getting all tasks
router.get('/', getAllTasks);

module.exports = router;