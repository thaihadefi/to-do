const taskService = require('../services/task.service');
const { sendCaughtError } = require('../helpers/http-response.helper');

module.exports.index = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();

    res.render('index', {
      title: 'TODO Application',
      tasks: tasks
    });
  } catch (error) {
    console.error('[task.controller] index error:', error);
    res.status(500).send('Error retrieving tasks');
  }
};

module.exports.create = (req, res) => {
  res.render('task-form', {
    title: 'Create New Task'
  });
};

module.exports.apiList = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json({
      code: 'success',
      data: tasks
    });
  } catch (error) {
    console.error('[task.controller] apiList error:', error);
    sendCaughtError(res, error, 'Invalid request!');
  }
};

module.exports.apiDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);

    if (!task) {
      return res.status(404).json({
        code: 'error',
        message: 'Task not found!'
      });
    }

    res.status(200).json({
      code: 'success',
      data: task
    });
  } catch (error) {
    console.error('[task.controller] apiDetail error:', error);
    sendCaughtError(res, error, 'Invalid task ID!');
  }
};

module.exports.apiCreate = async (req, res) => {
  try {
    const { title, user } = req.body;

    if (!title || !user || !title.trim() || !user.trim()) {
      return res.status(400).json({
        code: 'error',
        message: 'Title and user are required!'
      });
    }

    const newTask = await taskService.createTask({
      title: title.trim(),
      user: user.trim()
    });

    res.status(201).json({
      code: 'success',
      message: `Task "${newTask.title}" created successfully!`,
      data: newTask,
      redirect: '/'
    });
  } catch (error) {
    console.error('[task.controller] apiCreate error:', error);
    sendCaughtError(res, error, 'Invalid data!');
  }
};

module.exports.apiUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, user, isDone } = req.body;

    const updateData = {};
    if (typeof isDone !== 'undefined') {
      updateData.isDone = Boolean(isDone);
    }
    if (title && title.trim()) {
      updateData.title = title.trim();
    }
    if (user && user.trim()) {
      updateData.user = user.trim();
    }

    const task = await taskService.updateTask(id, updateData);

    if (!task) {
      return res.status(404).json({
        code: 'error',
        message: 'Task not found!'
      });
    }

    res.status(200).json({
      code: 'success',
      message: `Task "${task.title}" updated successfully!`,
      data: task
    });
  } catch (error) {
    console.error('[task.controller] apiUpdate error:', error);
    sendCaughtError(res, error, 'Invalid ID or data!');
  }
};

module.exports.apiDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.deleteTask(id);

    if (!task) {
      return res.status(404).json({
        code: 'error',
        message: 'Task not found!'
      });
    }

    res.status(200).json({
      code: 'success',
      message: `Task "${task.title}" deleted successfully!`
    });
  } catch (error) {
    console.error('[task.controller] apiDelete error:', error);
    sendCaughtError(res, error, 'Invalid ID!');
  }
};

module.exports.createPost = module.exports.apiCreate;
module.exports.donePost = (req, res) => {
  req.body = { ...req.body, isDone: true };
  return module.exports.apiUpdate(req, res);
};
module.exports.deletePost = module.exports.apiDelete;
