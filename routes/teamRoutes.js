
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const teams = require('../controllers/teamControllers');

router.post('/insert-team-wins', catchAsync(teams.insertTeamWins));


router.route('/')
    .get(teams.renderEntry);

router.post('/top-stadiums', catchAsync(teams.getTopStadiumsWithTeams));

module.exports = router;