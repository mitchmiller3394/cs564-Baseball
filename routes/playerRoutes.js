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
            // TODO: Handle salary logic here
            res.send('Salary details not implemented yet');
        } else if (playerStat === 'Defense') {
            // TODO: Handle defense logic here
            res.send('Defense details not implemented yet');
        } else if (playerStat === 'Offense') {
            const playerBatting = await players.getPlayerBatting(playerId);
            res.render('players/batting', { batting: playerBatting });
        } else if (playerStat === 'Pitching') {
            // TODO: Handle pitching logic here
            res.send('Pitching details not implemented yet');
        } else {
            req.flash('error', 'Invalid stat selected');
            res.redirect('/player');
        }
    }));

module.exports = router;