const mongoose = require('mongoose');

const RiskAssessmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    riskLevel: {
      type: String,
      enum: ['Low Risk', 'Medium Risk', 'High Risk'],
      required: true,
    },
    confidenceScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    primaryFactors: [
      {
        factorName: String,
        measuredValue: String,
        normalThreshold: String,
        severity: {
          type: String,
          enum: ['Normal', 'Elevated', 'Critical'],
          default: 'Normal',
        },
      },
    ],
    aiExplanation: {
      type: String,
      required: true,
    },
    recommendedActionPlan: {
      type: String,
      default: '',
    },
    vitalsSnapshot: {
      age: Number,
      systolicBP: Number,
      diastolicBP: Number,
      bloodSugar: Number,
      bodyTemp: Number,
      heartRate: Number,
      bmi: Number,
      haemoglobin: Number,
    },
    reviewedByDoctor: {
      type: Boolean,
      default: false,
    },
    reviewerDoctorName: {
      type: String,
      default: '',
    },
    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('RiskAssessment', RiskAssessmentSchema);
