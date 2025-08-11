const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const randoms = require('../controllers/randomControllers');

router.route('/')
    .get(randoms.renderEntry)
    //.post(catchAsync(randoms.getRandomStat));

module.exports = router;