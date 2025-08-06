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
        const { playerId } = req.body;
        const playerDetails = await players.getPlayerDetails(playerId);
        res.render('players/details', { player: playerDetails });
    }));

module.exports = router;