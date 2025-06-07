const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/userControllers');
const credsExists = require('../utils/passportUtils').credsExists;

router.route('/register')
    .get(users.renderRegister)
    .post(credsExists, catchAsync(users.createUser))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), users.loginUser)

router.get('/logout', users.logoutUser)

module.exports = router;