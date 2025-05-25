const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const students = require('../controllers/studentControllers');

router.route('/student')
    .get(students.renderEntry)
    .post(catchAsync(students.createStudent))

module.exports = router;