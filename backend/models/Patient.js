const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      default: '',
    },
    village: {
      type: String,
      default: 'Rampur Sub-district',
    },
    district: {
      type: String,
      default: 'Chittoor',
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
    // Pregnancy Details
    pregnancyDetails: {
      lmp: { type: Date },
      edd: { type: Date },
      gestationalWeek: { type: Number, default: 12 },
      trimester: {
        type: String,
        enum: ['First Trimester', 'Second Trimester', 'Third Trimester', 'Postpartum'],
        default: 'First Trimester',
      },
      gravida: { type: Number, default: 1 }, // Total pregnancies
      parity: { type: Number, default: 0 },  // Carried to viable gestational age
    },
    // Vitals & Clinical Metrics (SRS 1.2)
    vitals: {
      systolicBP: { type: Number, required: true }, // mmHg
      diastolicBP: { type: Number, required: true }, // mmHg
      bloodSugar: { type: Number, required: true }, // mmol/L or mg/dL
      weight: { type: Number, required: true }, // kg
      height: { type: Number, default: 155 }, // cm
      bmi: { type: Number, required: true },
      haemoglobin: { type: Number, required: true }, // g/dL
      heartRate: { type: Number, default: 78 }, // bpm
      bodyTemp: { type: Number, default: 98.4 }, // Fahrenheit
    },
    // Obstetric & Previous History (SRS 1.2)
    previousHistory: {
      pastComplications: [{ type: String }],
      pastCSections: { type: Number, default: 0 },
      miscarriages: { type: Number, default: 0 },
      chronicConditions: [{ type: String }], // e.g. Hypertension, Gestational Diabetes, Thyroid
    },
    // AI Risk Classification (SRS 1.3)
    currentRiskLevel: {
      type: String,
      enum: ['Low Risk', 'Medium Risk', 'High Risk'],
      default: 'Low Risk',
    },
    riskConfidence: {
      type: Number,
      default: 0.92,
    },
    assignedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    assignedAshaWorker: {
      name: { type: String, default: 'Sunita Devi' },
      phone: { type: String, default: '+91 98765 43210' },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Patient', PatientSchema);
