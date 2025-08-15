const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const statsForName = require('../controllers/statsForNameController');

router.route('/')
    .get(statsForName.renderEntry)

router.route('/details')
.post(catchAsync(async (req,res) => {
    const { playerName } = req.body;    
    const playerDetails = await statsForName.searchStatsForName(playerName);
    
    res.render('playerWithMyName/details',{
        player: playerDetails,
        searchedName: playerName
    });
}));
module.exports = router;