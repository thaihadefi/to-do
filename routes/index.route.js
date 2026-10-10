const express = require('express');
const router = express.Router();
const taskRoutes = require('./task.route');

router.use('/api/tasks', taskRoutes.api);

router.use('/api', (_req, res) => {
  res.status(404).json({ code: 'error', message: 'Not found!' });
});

router.use('/', taskRoutes);

module.exports = router;
