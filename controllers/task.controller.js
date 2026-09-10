const taskService = require('../services/task.service');

module.exports.index = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();

    res.render('index', {
      title: 'TODO Application',
      tasks: tasks
    });
  } catch (error) {
    console.error("index error:", error);
    res.status(500).send("Error retrieving tasks");
  }
};

module.exports.create = (req, res) => {
  res.render('task-form', {
    title: 'Create New Task'
  });
};

module.exports.createPost = async (req, res) => {
  try {
    const { title, user } = req.body;

    if (!title || !user) {
      return res.json({
        code: "error",
        success: false,
        message: "Title and user are required!"
      });
    }

    const newTask = await taskService.createTask({ title, user });

    res.json({
      code: "success",
      success: true,
      message: `Task "${newTask.title}" created successfully!`,
      redirect: '/'
    });
  } catch (error) {
    console.error("createPost error:", error);
    res.json({
      code: "error",
      success: false,
      message: "Error creating task"
    });
  }
};

module.exports.donePost = async (req, res) => {
  try {
    const task = await taskService.markTaskDone(req.params.id);

    if (!task) {
      return res.json({
        code: "error",
        success: false,
        message: "Task not found!"
      });
    }

    res.json({
      code: "success",
      success: true,
      message: `Task "${task.title}" marked as done!`
    });
  } catch (error) {
    console.error("donePost error:", error);
    res.json({
      code: "error",
      success: false,
      message: "Error updating task"
    });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);

    if (!task) {
      return res.json({
        code: "error",
        success: false,
        message: "Task not found!"
      });
    }

    res.json({
      code: "success",
      success: true,
      message: `Task "${task.title}" deleted successfully!`
    });
  } catch (error) {
    console.error("deletePost error:", error);
    res.json({
      code: "error",
      success: false,
      message: "Error deleting task"
    });
  }
};
