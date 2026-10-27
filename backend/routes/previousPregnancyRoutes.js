const express = require('express');
const router = express.Router();
const { getPregnancyHistory, getAllPregnancyHistories } = require('../controllers/previousPregnancyController');

router.route('/')
  .get(getAllPregnancyHistories);

router.route('/:patientId')
  .get(getPregnancyHistory);

module.exports = router;
