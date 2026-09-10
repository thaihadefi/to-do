const TaskModel = require('../models/task.model');

module.exports.getAllTasks = async () => {
  return await TaskModel.find({}).sort({ _id: -1 });
};

module.exports.getTaskById = async (id) => {
  return await TaskModel.findById(id);
};

module.exports.createTask = async ({ title, user }) => {
  const newTask = new TaskModel({
    title: title.trim(),
    user: user.trim(),
    isDone: false
  });
  return await newTask.save();
};

module.exports.markTaskDone = async (id) => {
  return await TaskModel.findByIdAndUpdate(id, { isDone: true }, { new: true });
};

module.exports.deleteTask = async (id) => {
  return await TaskModel.findByIdAndDelete(id);
};
