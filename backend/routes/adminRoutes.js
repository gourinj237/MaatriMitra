const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/stats', adminController.getHospitalStats);
router.get('/risk-analytics', adminController.getRiskAnalytics);
router.get('/users', adminController.getUsers);
router.post('/users', adminController.createUser);
router.get('/reports/summary', adminController.generateReportsSummary);

module.exports = router;
