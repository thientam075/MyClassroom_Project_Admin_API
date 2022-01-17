const express = require('express');
const router = express.Router();
const controller = require('./adminController');
router.get('/listAdmin', controller.listAdmin);
router.get('/listUser', controller.listUser);

module.exports = router;