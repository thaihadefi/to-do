const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  user: { type: String, required: true },
  isDone: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", TaskSchema);
