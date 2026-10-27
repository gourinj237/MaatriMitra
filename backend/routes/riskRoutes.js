const express = require('express');
const router = express.Router();
const riskController = require('../controllers/riskController');

router.get('/patient/:patientId', riskController.getRiskAssessmentByPatientId);
router.post('/assess', riskController.runRiskAssessment);
router.patch('/review/:id', riskController.updateDoctorReview);

module.exports = router;
