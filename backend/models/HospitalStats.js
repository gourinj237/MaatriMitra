const mongoose = require('mongoose');

const HospitalStatsSchema = new mongoose.Schema(
  {
    facilityName: {
      type: String,
      required: true,
      default: 'District Rural General Hospital',
    },
    reportingDate: {
      type: Date,
      default: Date.now,
    },
    metrics: {
      totalRegisteredMothers: { type: Number, default: 0 },
      activePregnancies: { type: Number, default: 0 },
      highRiskCases: { type: Number, default: 0 },
      mediumRiskCases: { type: Number, default: 0 },
      lowRiskCases: { type: Number, default: 0 },
      completedDeliveriesThisMonth: { type: Number, default: 0 },
      maternalMortalityRatio: { type: Number, default: 0 },
      infantImmunizationRate: { type: Number, default: 98.2 },
    },
    facilityCapacity: {
      maternityBedsTotal: { type: Number, default: 45 },
      maternityBedsOccupied: { type: Number, default: 32 },
      icuBedsTotal: { type: Number, default: 8 },
      icuBedsOccupied: { type: Number, default: 3 },
      ambulancesActive: { type: Number, default: 4 },
      onDutyObstetricians: { type: Number, default: 6 },
      activeAshaWorkers: { type: Number, default: 28 },
    },
    trimesterBreakdown: {
      firstTrimester: { type: Number, default: 0 },
      secondTrimester: { type: Number, default: 0 },
      thirdTrimester: { type: Number, default: 0 },
      postpartum: { type: Number, default: 0 },
    },
    phcCoverage: [
      {
        phcName: String,
        registeredCount: Number,
        highRiskCount: Number,
        assignedDoctor: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('HospitalStats', HospitalStatsSchema);
