const PreviousPregnancy = require('../models/PreviousPregnancy');

const mockPregnancyHistories = [
  {
    patientId: 'MC-2026-081',
    motherName: 'Priya Meena',
    pregnancyOrder: 1,
    year: '2023 - 2024',
    outcome: 'Successful Full-Term Delivery (Live Birth)',
    gestationWeeksAtDelivery: 38,
    deliveryType: 'Spontaneous Vaginal Delivery',
    babyGender: 'Female (Weight: 2.85 kg)',
    recordedComplications: ['Mild Gestational Hypertension (Week 34)', 'Borderline Low Birth Weight Alert'],
    documents: [
      {
        title: 'Discharge Summary & Labor Progression Sheet',
        date: '14 May 2024',
        facility: 'District Rural General Hospital',
        doctor: 'Dr. Suniti Rao, MD (OB/GYN)',
        type: 'Clinical Summary',
        summary: 'Successful normal delivery without 3rd degree tears. Episiotomy healed cleanly. Maternal vitals stabilized within 24 hours postpartum.',
        findings: ['Birth weight: 2.85 kg', 'APGAR: 8/10 at 1 min, 9/10 at 5 min', 'Lactation initiated within 1st hour', 'No postpartum hemorrhage observed'],
        badge: 'Discharge Record',
      },
      {
        title: 'Third Trimester Anomaly & Growth Ultrasound Report',
        date: '22 Apr 2024',
        facility: 'Chittoor District Diagnostic Wing',
        doctor: 'Dr. R. K. Nambiar (Radiologist)',
        type: 'Radiology / Ultrasound',
        summary: 'Single live intrauterine gestation in cephalic presentation. Estimated fetal weight at 34 weeks was 2,120g (28th percentile). Doppler resistive indices normal.',
        findings: ['Amniotic Fluid Index (AFI): 11.4 cm (Normal)', 'Placental Position: Fundal, Grade II maturity', 'No gross structural anomalies detected', 'Cord: 3-vessel cord intact'],
        badge: 'Diagnostic Scan',
      },
      {
        title: 'Oral Glucose Tolerance Test (OGTT) & Hematology Panel',
        date: '15 Mar 2024',
        facility: 'Rampur Sub-district Block Lab',
        doctor: 'Dr. Priya V. (Pathologist)',
        type: 'Laboratory Panel',
        summary: 'Screening for gestational diabetes mellitus conducted at 28 weeks. Fasting blood sugar normal, post-prandial mildly elevated at 134 mg/dL. Hemoglobin 10.1 g/dL.',
        findings: ['Fasting Glucose: 88 mg/dL (Normal <92 mg/dL)', '2-hr Post 75g Glucose: 134 mg/dL (Normal <153 mg/dL)', 'Hb: 10.1 g/dL (Mild Anemia - Oral Iron prescribed)', 'Urine Albumin: Nil / Trace'],
        badge: 'Lab Panel',
      },
      {
        title: 'ASHA Home Visit Immunization & Vitals Card (MCP Card)',
        date: '02 Feb 2024',
        facility: 'Kalyanpur Health Sub-centre',
        doctor: 'Sunita Devi (Certified ASHA Worker)',
        type: 'Community Health Record',
        summary: 'Mother and Child Protection (MCP) card record documenting 2 doses of Tetanus Toxoid (TT1 & TT2) and daily Iron-Folic Acid supplementation adherence.',
        findings: ['TT-1 Date: 12 Jan 2024 | TT-2 Date: 09 Feb 2024', 'IFA Tablets Distributed: 180 tablets', 'BP Average: 124/82 mmHg', 'Nutritional Counseling provided on green leafy vegetables'],
        badge: 'MCP Card',
      },
    ],
  },
  {
    patientId: 'MC-2026-094',
    motherName: 'Lakshmi Patel',
    pregnancyOrder: 1,
    year: '2022 - 2023',
    outcome: 'Emergency Cesarean Delivery (Live Birth)',
    gestationWeeksAtDelivery: 36,
    deliveryType: 'Emergency Lower Segment Cesarean Section (LSCS)',
    babyGender: 'Male (Weight: 2.35 kg)',
    recordedComplications: ['Severe Pre-eclampsia (BP 160/105 mmHg)', 'Oligohydramnios (AFI 5.2 cm)', 'Fetal Distress at 36 weeks'],
    documents: [
      {
        title: 'Emergency Cesarean Operative Notes & Discharge Summary',
        date: '18 Nov 2023',
        facility: 'District Rural General Hospital',
        doctor: 'Dr. Ananya Sharma, MD (OB/GYN)',
        type: 'Surgical Operative Note',
        summary: 'Emergency LSCS indicated for persistent severe hypertension resistant to oral labetalol, complicated by non-reassuring fetal heart tones.',
        findings: ['Delivery of viable male infant, 2.35 kg', 'APGAR: 6/10 at 1 min, 8/10 at 5 min', 'Estimated blood loss: 550 ml (controlled)', 'Mother discharged in stable condition on Day 5'],
        badge: 'Surgical Record',
      },
    ],
  },
];

// @desc    Get previous pregnancy history and reports for a patient
// @route   GET /api/pregnancy-history/:patientId
exports.getPregnancyHistory = async (req, res) => {
  try {
    const { patientId } = req.params;
    const history = await PreviousPregnancy.findOne({ patientId });
    if (history) {
      return res.status(200).json({ success: true, data: history });
    }
    const fallback = mockPregnancyHistories.find((item) => item.patientId === patientId) || mockPregnancyHistories[0];
    return res.status(200).json({ success: true, data: fallback });
  } catch (error) {
    console.warn('Returning mock pregnancy history fallback due to DB:', error.message);
    const fallback = mockPregnancyHistories.find((item) => item.patientId === req.params.patientId) || mockPregnancyHistories[0];
    return res.status(200).json({ success: true, data: fallback });
  }
};

// @desc    Get all previous pregnancy records
// @route   GET /api/pregnancy-history
exports.getAllPregnancyHistories = async (req, res) => {
  try {
    const records = await PreviousPregnancy.find();
    if (records && records.length > 0) {
      return res.status(200).json({ success: true, count: records.length, data: records });
    }
    return res.status(200).json({ success: true, count: mockPregnancyHistories.length, data: mockPregnancyHistories });
  } catch (error) {
    return res.status(200).json({ success: true, count: mockPregnancyHistories.length, data: mockPregnancyHistories });
  }
};
