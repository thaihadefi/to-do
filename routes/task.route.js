const express = require('express');
const router = express.Router();
const controller = require('../controllers/task.controller');

router.get('/', controller.index);
router.get('/task/new', controller.create);
router.get('/tasks/new', controller.create);

const api = express.Router();

api.get('/', controller.apiList);
api.get('/:id', controller.apiDetail);
api.post('/', controller.apiCreate);
api.patch('/:id', controller.apiUpdate);
api.delete('/:id', controller.apiDelete);

router.post('/task', controller.createPost);
router.post('/task/:id/done', controller.donePost);
router.post('/task/:id/delete', controller.deletePost);

module.exports = router;
module.exports.api = api;
