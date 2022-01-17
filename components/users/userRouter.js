const express = require('express');
const router = express.Router();
const controller = require('./userController');

router.get('/:id', controller.getUser);

router.get('/', controller.listUser);

router.get('/byStudentId/:studentId', controller.getByStudentId);

router.get('/myself/get', controller.getMyself);
router.post('/myself', controller.postMyself);
router.post('/myself/mapping', controller.mappingAccount);
router.post('/changePassword', controller.changePassword);

module.exports = router;