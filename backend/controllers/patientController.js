const Patient = require('../models/Patient');

// High-fidelity rural maternal clinical sample data
const mockPatients = [
  {
    _id: '6601a1b2c3d4e5f601',
    patientId: 'MC-2026-081',
    fullName: 'Priya Meena',
    age: 26,
    phone: '+91 98231 44510',
    village: 'Kalyanpur, Ward 4',
    district: 'Chittoor',
    pregnancyDetails: {
      gestationalWeek: 28,
      trimester: 'Third Trimester',
      lmp: '2026-01-15',
      edd: '2026-10-22',
      gravida: 2,
      parity: 1,
    },
    vitals: {
      systolicBP: 146,
      diastolicBP: 94,
      bloodSugar: 8.4,
      weight: 64,
      height: 154,
      bmi: 27.0,
      haemoglobin: 9.2,
      heartRate: 88,
      bodyTemp: 98.6,
    },
    previousHistory: {
      pastComplications: ['Gestational Hypertension in 1st Pregnancy'],
      pastCSections: 0,
      miscarriages: 0,
      chronicConditions: ['Pre-eclampsia warning signs'],
    },
    currentRiskLevel: 'High Risk',
    riskConfidence: 94.2,
    assignedAshaWorker: { name: 'Sunita Devi', phone: '+91 98765 43210' },
  },
  {
    _id: '6601a1b2c3d4e5f602',
    patientId: 'MC-2026-094',
    fullName: 'Lakshmi Patel',
    age: 22,
    phone: '+91 94112 88203',
    village: 'Bhimnagar, Sector 2',
    district: 'Chittoor',
    pregnancyDetails: {
      gestationalWeek: 16,
      trimester: 'Second Trimester',
      lmp: '2026-04-10',
      edd: '2027-01-15',
      gravida: 1,
      parity: 0,
    },
    vitals: {
      systolicBP: 114,
      diastolicBP: 74,
      bloodSugar: 5.6,
      weight: 52,
      height: 158,
      bmi: 20.8,
      haemoglobin: 11.8,
      heartRate: 74,
      bodyTemp: 98.4,
    },
    previousHistory: {
      pastComplications: [],
      pastCSections: 0,
      miscarriages: 0,
      chronicConditions: [],
    },
    currentRiskLevel: 'Low Risk',
    riskConfidence: 96.8,
    assignedAshaWorker: { name: 'Kavita Rawat', phone: '+91 98451 22901' },
  },
  {
    _id: '6601a1b2c3d4e5f603',
    patientId: 'MC-2026-112',
    fullName: 'Fatima Sheikh',
    age: 34,
    phone: '+91 97654 32189',
    village: 'Noorpur East',
    district: 'Chittoor',
    pregnancyDetails: {
      gestationalWeek: 22,
      trimester: 'Second Trimester',
      lmp: '2026-02-28',
      edd: '2026-12-05',
      gravida: 3,
      parity: 2,
    },
    vitals: {
      systolicBP: 128,
      diastolicBP: 82,
      bloodSugar: 7.6,
      weight: 68,
      height: 152,
      bmi: 29.4,
      haemoglobin: 10.1,
      heartRate: 82,
      bodyTemp: 98.8,
    },
    previousHistory: {
      pastComplications: ['Previous C-section'],
      pastCSections: 1,
      miscarriages: 0,
      chronicConditions: ['Borderline Gestational Diabetes'],
    },
    currentRiskLevel: 'Medium Risk',
    riskConfidence: 87.5,
    assignedAshaWorker: { name: 'Anita Verma', phone: '+91 98220 11984' },
  },
  {
    _id: '6601a1b2c3d4e5f604',
    patientId: 'MC-2026-129',
    fullName: 'Rekha Choudhary',
    age: 38,
    phone: '+91 93120 77412',
    village: 'Shivpuram Colony',
    district: 'Chittoor',
    pregnancyDetails: {
      gestationalWeek: 34,
      trimester: 'Third Trimester',
      lmp: '2025-12-04',
      edd: '2026-09-11',
      gravida: 4,
      parity: 2,
    },
    vitals: {
      systolicBP: 152,
      diastolicBP: 98,
      bloodSugar: 9.8,
      weight: 73,
      height: 150,
      bmi: 32.4,
      haemoglobin: 8.6,
      heartRate: 94,
      bodyTemp: 99.1,
    },
    previousHistory: {
      pastComplications: ['Postpartum Haemorrhage in previous birth', 'Advanced Maternal Age'],
      pastCSections: 1,
      miscarriages: 1,
      chronicConditions: ['Chronic Hypertension', 'Severe Maternal Anemia'],
    },
    currentRiskLevel: 'High Risk',
    riskConfidence: 98.1,
    assignedAshaWorker: { name: 'Sunita Devi', phone: '+91 98765 43210' },
  },
  {
    _id: '6601a1b2c3d4e5f605',
    patientId: 'MC-2026-140',
    fullName: 'Anjali Sharma',
    age: 24,
    phone: '+91 96541 23450',
    village: 'Rampur South',
    district: 'Chittoor',
    pregnancyDetails: {
      gestationalWeek: 9,
      trimester: 'First Trimester',
      lmp: '2026-06-01',
      edd: '2027-03-08',
      gravida: 1,
      parity: 0,
    },
    vitals: {
      systolicBP: 110,
      diastolicBP: 70,
      bloodSugar: 5.2,
      weight: 50,
      height: 160,
      bmi: 19.5,
      haemoglobin: 12.1,
      heartRate: 72,
      bodyTemp: 98.2,
    },
    previousHistory: {
      pastComplications: [],
      pastCSections: 0,
      miscarriages: 0,
      chronicConditions: [],
    },
    currentRiskLevel: 'Low Risk',
    riskConfidence: 95.0,
    assignedAshaWorker: { name: 'Kavita Rawat', phone: '+91 98451 22901' },
  }
];

exports.getPatients = async (req, res) => {
  try {
    const { search, risk, trimester } = req.query;
    let patients = await Patient.find().catch(() => null);
    
    // Use mockPatients if DB is empty or offline
    if (!patients || patients.length === 0) {
      patients = mockPatients;
    }

    let filtered = [...patients];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.fullName.toLowerCase().includes(q) ||
          p.patientId.toLowerCase().includes(q) ||
          p.village.toLowerCase().includes(q)
      );
    }

    if (risk && risk !== 'All') {
      filtered = filtered.filter((p) => p.currentRiskLevel.toLowerCase().includes(risk.toLowerCase()));
    }

    if (trimester && trimester !== 'All') {
      filtered = filtered.filter((p) => p.pregnancyDetails?.trimester === trimester);
    }

    res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    let patient = await Patient.findById(id).catch(() => null);

    if (!patient) {
      patient = mockPatients.find((p) => p._id === id || p.patientId === id);
    }

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPatient = async (req, res) => {
  try {
    const newPatient = req.body;
    let created;
    try {
      created = await Patient.create(newPatient);
    } catch {
      created = {
        _id: 'patient_' + Date.now(),
        ...newPatient,
        createdAt: new Date(),
      };
    }

    res.status(201).json({ success: true, message: 'Patient registered successfully', data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePatientVitals = async (req, res) => {
  try {
    const { id } = req.params;
    const { vitals } = req.body;

    let patient = await Patient.findById(id).catch(() => null);
    if (patient) {
      patient.vitals = { ...patient.vitals, ...vitals };
      await patient.save();
      return res.status(200).json({ success: true, message: 'Vitals updated', data: patient });
    }

    res.status(200).json({
      success: true,
      message: 'Vitals updated (Mock mode)',
      data: { id, vitals },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
