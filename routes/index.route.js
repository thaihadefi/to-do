const express = require('express');
const router = express.Router();
const taskRoutes = require('./task.route');

router.use('/', taskRoutes);

module.exports = router;
