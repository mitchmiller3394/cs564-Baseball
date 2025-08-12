const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const players = require('../controllers/playerControllers');

router.route('/')
    .get(players.renderEntry)
    .post(catchAsync(players.createPlayer))

router.route('/search')
    .get(catchAsync(async (req, res) => {
        const { q } = req.query;
        const [rows] = await players.searchPlayers(q);
        res.json(rows);
    }));

router.route('/details')
    .post(catchAsync(async (req, res) => {
        const { playerId, playerStat } = req.body;
        if (playerStat === 'Details') {
            const playerDetails = await players.getPlayerDetails(playerId);
            res.render('players/details', { player: playerDetails });
        } else if (playerStat === 'Salary') {
            const playerSalary = await players.getPlayerSalary(playerId);
            res.render('players/salary', { salary: playerSalary });
        } else if (playerStat === 'Defense') {
            const playerFielding = await players.getPlayerFielding(playerId);
            res.render('players/fielding', { fielding: playerFielding });
        } else if (playerStat === 'Offense') {
            const playerBatting = await players.getPlayerBatting(playerId);
            res.render('players/batting', { batting: playerBatting });
        } else if (playerStat === 'Pitching') {
            const playerPitching = await players.getPlayerPitching(playerId);
            res.render('players/pitching', { pitching: playerPitching });
        } else {
            req.flash('error', 'Invalid stat selected');
            res.redirect('/player');
        }
    }));

router.route('/salary/update')
    //TODO: Fix this. redirect to player details page somehow. maybe with a get to same route?
    .post(catchAsync(async (req, res) => {
        const { player_id, year, team_id, salary } = req.body;
        await players.updatePlayerSalary(player_id, year, team_id, salary);
        res.redirect(`/player/details?playerId=${player_id}`);
    }));

router.route('/salary/delete')
    //TODO: Fix
    .post(catchAsync(async (req, res) => {
        const { player_id, year } = req.body;
        await players.deletePlayerSalary(player_id, year);
        res.redirect(`/player/details?playerId=${player_id}`);
    }));

router.route('/salary/insert')
    .post(catchAsync(async (req, res) => {
        const { player_id, year, team_id, salary } = req.body;
        await players.insertPlayerSalary(player_id, year, team_id, salary);
        res.redirect(`/player/details?playerId=${player_id}`);
    }));

module.exports = router;