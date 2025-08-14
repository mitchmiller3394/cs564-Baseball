
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const teams = require('../controllers/teamControllers');

router.post('/insert-team-wins', catchAsync(teams.insertTeamWins));


router.route('/')
    .get(teams.renderEntry);

router.post('/top-stadiums', catchAsync(teams.getTopStadiumsWithTeams));

router.route('/total-team-salary')
    .post(catchAsync(async (req, res) => {
            const { team_id } = req.body;
            const teamSalary = await teams.getTotalTeamSalary(team_id);
            res.render('teams/Salary', { salary: teamSalary });
        }));

router.route('/dollars-per-win')
    .post(catchAsync(async (req, res) => {
            const { team_id } = req.body;
            const dollarsPerWin = await teams.getDollarsPerWin(team_id);
            res.render('teams/DollarsPerWin', { dollarsPerWin });
        }));

module.exports = router;