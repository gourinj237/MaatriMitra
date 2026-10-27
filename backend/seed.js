const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Patient = require('./models/Patient');
const RiskAssessment = require('./models/RiskAssessment');
const Appointment = require('./models/Appointment');
const Recommendation = require('./models/Recommendation');
const HospitalStats = require('./models/HospitalStats');
const Newborn = require('./models/Newborn');
const PreviousPregnancy = require('./models/PreviousPregnancy');

dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/maatricare_db';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear old data
    await User.deleteMany({});
    await Patient.deleteMany({});
    await RiskAssessment.deleteMany({});
    await Appointment.deleteMany({});
    await Recommendation.deleteMany({});
    await HospitalStats.deleteMany({});
    await Newborn.deleteMany({});
    await PreviousPregnancy.deleteMany({});

    console.log('Cleared existing collections.');

    // Seed Doctor
    const doctor = await User.create({
      name: 'Dr. Ananya Sharma',
      email: 'ananya.sharma@maatricare.org',
      password: 'password123',
      role: 'Doctor',
      department: 'Obstetrics & Gynecology',
      facilityName: 'District Rural General Hospital',
      licenseNumber: 'MCI-OBGYN-2018-9481',
      phone: '+91 98110 54321',
      status: 'Active',
    });

    // Seed Admin
    await User.create({
      name: 'Rameshwar Verma',
      email: 'rameshwar.verma@district-health.gov.in',
      password: 'password123',
      role: 'Hospital Administrator',
      department: 'Health Administration & Operations',
      facilityName: 'District Rural General Hospital',
      licenseNumber: 'HOSP-ADM-2019-012',
      phone: '+91 99881 22345',
      status: 'Active',
    });

    // Seed ASHA Worker
    await User.create({
      name: 'Sunita Devi',
      email: 'sunita.asha@maatricare.org',
      password: 'password123',
      role: 'ASHA Worker',
      department: 'Community Maternal Health',
      facilityName: 'Rampur Sub-district Block A',
      licenseNumber: 'ASHA-UP-8842',
      phone: '+91 98765 43210',
      status: 'Active',
    });

    // Seed High Risk Patient
    const p1 = await Patient.create({
      patientId: 'MC-2026-081',
      fullName: 'Priya Meena',
      age: 26,
      phone: '+91 98231 44510',
      village: 'Kalyanpur, Ward 4',
      district: 'Chittoor',
      pregnancyDetails: {
        gestationalWeek: 28,
        trimester: 'Third Trimester',
        lmp: new Date('2026-01-15'),
        edd: new Date('2026-10-22'),
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
      assignedDoctor: doctor._id,
      assignedAshaWorker: { name: 'Sunita Devi', phone: '+91 98765 43210' },
    });

    // Seed Low Risk Patient
    await Patient.create({
      patientId: 'MC-2026-094',
      fullName: 'Lakshmi Patel',
      age: 22,
      phone: '+91 94112 88203',
      village: 'Bhimnagar, Sector 2',
      district: 'Chittoor',
      pregnancyDetails: {
        gestationalWeek: 16,
        trimester: 'Second Trimester',
        lmp: new Date('2026-04-10'),
        edd: new Date('2027-01-15'),
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
      assignedDoctor: doctor._id,
      assignedAshaWorker: { name: 'Kavita Rawat', phone: '+91 98451 22901' },
    });

    // Seed Risk Assessment for Priya
    await RiskAssessment.create({
      patient: p1._id,
      riskLevel: 'High Risk',
      confidenceScore: 94.2,
      primaryFactors: [
        { factorName: 'Systolic Blood Pressure', measuredValue: '146 mmHg', normalThreshold: '< 120 mmHg', severity: 'Critical' },
        { factorName: 'Diastolic Blood Pressure', measuredValue: '94 mmHg', normalThreshold: '< 80 mmHg', severity: 'Critical' },
        { factorName: 'Blood Sugar (Fasting)', measuredValue: '8.4 mmol/L', normalThreshold: '< 7.0 mmol/L', severity: 'Elevated' },
        { factorName: 'Haemoglobin Anemia', measuredValue: '9.2 g/dL', normalThreshold: '>= 11.0 g/dL', severity: 'Critical' },
      ],
      aiExplanation: 'Multiple clinical markers indicate imminent pre-eclampsia risk: persistent severe hypertension (146/94 mmHg), moderate gestational hyperglycemia, and maternal anemia.',
      vitalsSnapshot: p1.vitals,
      reviewedByDoctor: true,
      reviewerDoctorName: 'Dr. Ananya Sharma',
      reviewedAt: new Date(),
    });

    // Seed Hospital Stats
    await HospitalStats.create({
      facilityName: 'District Rural General Hospital',
      metrics: {
        totalRegisteredMothers: 142,
        activePregnancies: 118,
        highRiskCases: 19,
        mediumRiskCases: 38,
        lowRiskCases: 61,
        completedDeliveriesThisMonth: 27,
        maternalMortalityRatio: 0,
        infantImmunizationRate: 98.4,
      },
      facilityCapacity: {
        maternityBedsTotal: 50,
        maternityBedsOccupied: 34,
        icuBedsTotal: 8,
        icuBedsOccupied: 3,
        ambulancesActive: 4,
        onDutyObstetricians: 5,
        activeAshaWorkers: 32,
      },
      trimesterBreakdown: {
        firstTrimester: 28,
        secondTrimester: 49,
        thirdTrimester: 41,
        postpartum: 24,
      },
    });

    // Seed Newborns
    await Newborn.create([
      {
        babyId: 'NB-2026-042',
        babyName: 'Baby Girl of Priya Meena',
        motherName: 'Priya Meena',
        motherId: 'MC-2026-081',
        birthDateTime: new Date('2026-09-29T08:15:00.000Z'),
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
        babyId: 'NB-2026-043',
        babyName: 'Baby Boy of Lakshmi Patel',
        motherName: 'Lakshmi Patel',
        motherId: 'MC-2026-094',
        birthDateTime: new Date('2026-09-30T14:40:00.000Z'),
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
    ]);

    // Seed Previous Pregnancy History for 2nd time pregnancy mothers
    await PreviousPregnancy.create({
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
      clinicalNotes: 'Previous labor was uneventful aside from mild transient hypertension at 34 weeks. Patient requires close blood pressure monitoring throughout current 2nd pregnancy.',
    });

    console.log('✅ Database seeded successfully with MaatriCare clinical data!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedData();
