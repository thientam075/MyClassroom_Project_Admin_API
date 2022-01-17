const express = require('express');
const router = express.Router();

const controller = require('./user_in_classController');

router.get('/:classId', controller.listUserInClass);
router.post('/inviteStudent/:codeStudent',  controller.addStudentToClass);
router.post('/inviteTeacher/:codeTeacher',  controller.addTeacherToClass);
router.get('/:classId/roleUserInClass', controller.getRole)
module.exports = router;