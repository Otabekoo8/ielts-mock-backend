const express = require('express');
const router = express.Router();
const { submitAnswers } = require('../controllers/testController');

router.post('/submit', submitAnswers);

module.exports = router;
