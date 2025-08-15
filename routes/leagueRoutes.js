const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const league = require('../controllers/leagueController');

router.route('/')
    .get(league.renderEntry)
    .post(catchAsync(league.getLeagueStats));

router.route('/search/leagues')
    .get(catchAsync(async (req, res) => {
        const { q } = req.query;
        const [rows] = await league.searchLeagues(q);
        res.json(rows);
    }));

module.exports = router;
