const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const teams = require('../controllers/teamControllers');

router.route('/')
    .get(teams.renderEntry)
    //.post(catchAsync(teams.createTeam))

module.exports = router;