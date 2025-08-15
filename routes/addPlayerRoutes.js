const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const addPlayer = require('../controllers/addPlayerController');

router.route('/')
    .get(addPlayer.renderEntry)
    .post(catchAsync(addPlayer.addPlayerToTeam));

router.route('/search/players')
    .get(catchAsync(async (req, res) => {
        const { q } = req.query;
        const [rows] = await addPlayer.searchPlayers(q);
        res.json(rows);
    }));

router.route('/search/teams')
    .get(catchAsync(async (req, res) => {
        const { q } = req.query;
        const [rows] = await addPlayer.searchTeams(q);
        res.json(rows);
    }));

module.exports = router;
