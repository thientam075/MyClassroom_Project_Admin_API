const express = require('express');
const router = express.Router();
const { JWTSign } = require("../../middleware/jwt");
const controller = require('./authController');
const passport = require('passport');
const passportConfig = require('../../middleware/passport');

router.post('/login',passport.authenticate('local', {session: false}) ,controller.LoginWithLocal);
router.post('/create',controller.register);

module.exports = router;