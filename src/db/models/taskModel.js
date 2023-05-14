const mongoose = require('mongoose');
const { TASK_STATUS, TASK_PRIORITY } = require('../../config/constants');

const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Number },
  state: { type: String, enum: { ...TASK_STATUS } },
  priority: { type: String, enum: {...TASK_PRIORITY }},
  assignee: { type: ObjectId, ref: 'User' },
  creator: { type: ObjectId, ref: 'User', required: true },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
