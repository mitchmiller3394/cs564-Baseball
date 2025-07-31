const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const players = require('../controllers/playerControllers');

router.route('/')
    .get(players.renderEntry)
    .post(catchAsync(players.createPlayer))

module.exports = router;