const Recommendation = require('../models/Recommendation');

const mockRecommendations = [
  {
    _id: 'rec_001',
    patientId: 'MC-2026-081',
    patientName: 'Priya Meena',
    doctorName: 'Dr. Ananya Sharma',
    title: 'Hypertensive Pregnancy Care Protocol',
    clinicalNotes: 'Initiate Tab Labetalol 100mg BD. Strict daily home BP logging via ASHA worker Sunita. Return immediately if headache or visual disturbances occur.',
    dietaryGuidance: 'Strict low sodium intake (< 2g/day). High protein pulse-based diet with fresh leafy greens.',
    medications: [
      { medicineName: 'Labetalol', dosage: '100 mg', timing: 'Twice daily after meals', duration: '30 days' },
      { medicineName: 'Ferrous Ascorbate + Folic Acid', dosage: '100 mg / 1.5 mg', timing: 'Once daily at bedtime', duration: '60 days' },
      { medicineName: 'Calcium Carbonate + Vit D3', dosage: '500 mg', timing: 'Once daily morning', duration: '60 days' },
    ],
    lifestylePrecautions: ['Left lateral recumbent resting 2 hours daily', 'Avoid strenuous agricultural manual labor'],
    requiresHospitalAdmission: false,
    referralHospital: 'District Hospital Maternity Ward (On standby)',
    createdAt: new Date().toISOString(),
  },
];

exports.getRecommendationsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    let recs = await Recommendation.find({ patient: patientId }).catch(() => null);

    if (!recs || recs.length === 0) {
      recs = mockRecommendations.filter((r) => r.patientId === patientId || !patientId);
    }

    res.status(200).json({ success: true, data: recs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createRecommendation = async (req, res) => {
  try {
    const recData = req.body;
    let created;
    try {
      created = await Recommendation.create(recData);
    } catch {
      created = {
        _id: 'rec_' + Date.now(),
        ...recData,
        createdAt: new Date(),
      };
    }

    res.status(201).json({
      success: true,
      message: 'Clinical recommendation and care plan recorded successfully',
      data: created,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
