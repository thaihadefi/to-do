const express = require('express');
const router = express.Router();
const controller = require('../controllers/task.controller');

router.get('/', controller.index);
router.get('/task/new', controller.create);
router.post('/task', controller.createPost);
router.post('/task/:id/done', controller.donePost);
router.post('/task/:id/delete', controller.deletePost);

module.exports = router;
