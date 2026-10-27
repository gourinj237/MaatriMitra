const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.get('/patient/:patientId', recommendationController.getRecommendationsByPatient);
router.post('/', recommendationController.createRecommendation);

module.exports = router;
