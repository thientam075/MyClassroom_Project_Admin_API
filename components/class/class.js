const express = require('express');
const router = express.Router();

const controller = require('./classController');

router.get('/', controller.listClass);

router.get('/:id', controller.getClass);

router.get('/:id/role', controller.getRoleClass);

router.post('/', controller.addClass);

router.delete('/:id', controller.deleteOrLeaveClass);

router.post('/:id/invite', controller.sendEmailInvite);

module.exports = router;