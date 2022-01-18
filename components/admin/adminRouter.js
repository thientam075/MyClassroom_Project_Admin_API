const express = require('express');
const router = express.Router();
const controller = require('./adminController');

router.get('/listAdmin', controller.listAdmin);
router.get('/listUser', controller.listUser);

router.post('/banOrUnbanUser', controller.banOrUnbanUser);
router.post('/updateStudentId', controller.updateStudentId)

router.get('/listAllClass', controller.listAllClass);

module.exports = router;