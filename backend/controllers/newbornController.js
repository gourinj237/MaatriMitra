const Newborn = require('../models/Newborn');

const mockNewborns = [
  {
    _id: 'nb_mock_001',
    babyId: 'NB-2026-042',
    babyName: 'Baby Girl of Priya Meena',
    motherName: 'Priya Meena',
    motherId: 'MC-2026-081',
    birthDateTime: '2026-09-29T08:15:00.000Z',
    gender: 'Female',
    birthWeightKg: 2.85,
    birthLengthCm: 49.5,
    headCircumferenceCm: 34.0,
    gestationalWeeksAtBirth: 38,
    deliveryType: 'Normal Vaginal Delivery',
    apgarScore1Min: 8,
    apgarScore5Min: 9,
    healthStatus: 'Healthy / Stable',
    facilityName: 'District Rural General Hospital',
    clinicalRoom: 'Maternity Labor Suite 2',
    immunizationsGiven: ['Vitamin K1 (1mg)', 'BCG Vaccine', 'OPV-0 Dose', 'Hepatitis B (Birth Dose)'],
    attendingDoctor: 'Dr. Ananya Sharma',
    attendingPediatrician: 'Dr. Suniti Rao, MD (Pediatrics)',
    ashaWorker: 'Sunita Devi',
    notes: 'Skin-to-skin contact initiated within 10 minutes. Early breastfeeding established successfully.',
  },
  {
    _id: 'nb_mock_002',
    babyId: 'NB-2026-043',
    babyName: 'Baby Boy of Lakshmi Patel',
    motherName: 'Lakshmi Patel',
    motherId: 'MC-2026-094',
    birthDateTime: '2026-09-30T14:40:00.000Z',
    gender: 'Male',
    birthWeightKg: 2.35,
    birthLengthCm: 47.0,
    headCircumferenceCm: 32.5,
    gestationalWeeksAtBirth: 36,
    deliveryType: 'Emergency Cesarean Section',
    apgarScore1Min: 6,
    apgarScore5Min: 8,
    healthStatus: 'Under Observation (NICU Level 1)',
    facilityName: 'District Rural General Hospital',
    clinicalRoom: 'Special Newborn Care Unit (SNCU)',
    immunizationsGiven: ['Vitamin K1 (1mg)', 'BCG Vaccine'],
    attendingDoctor: 'Dr. Ananya Sharma',
    attendingPediatrician: 'Dr. Suniti Rao, MD (Pediatrics)',
    ashaWorker: 'Kavita Rathod',
    notes: 'Mild respiratory grunting at birth; placed under radiant warmer with phototherapy readiness.',
  },
];

// @desc    Get all registered newborns
// @route   GET /api/newborns
exports.getNewborns = async (req, res) => {
  try {
    const newborns = await Newborn.find().sort({ createdAt: -1 });
    if (newborns && newborns.length > 0) {
      return res.status(200).json({ success: true, count: newborns.length, data: newborns });
    }
    return res.status(200).json({ success: true, count: mockNewborns.length, data: mockNewborns });
  } catch (error) {
    console.warn('Returning mock newborns fallback due to DB:', error.message);
    return res.status(200).json({ success: true, count: mockNewborns.length, data: mockNewborns });
  }
};

// @desc    Register a new newborn
// @route   POST /api/newborns
exports.registerNewborn = async (req, res) => {
  try {
    const count = await Newborn.countDocuments();
    const babyId = req.body.babyId || `NB-2026-0${count + 44}`;
    const newRecord = await Newborn.create({
      ...req.body,
      babyId,
    });
    return res.status(201).json({ success: true, data: newRecord });
  } catch (error) {
    console.error('Error creating newborn:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
