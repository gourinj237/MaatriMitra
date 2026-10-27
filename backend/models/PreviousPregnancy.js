const mongoose = require('mongoose');

const DocumentReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  facility: { type: String, default: 'District Hospital' },
  doctor: { type: String, default: 'Attending OB/GYN' },
  type: { type: String, default: 'Report' },
  summary: { type: String, default: '' },
  findings: [{ type: String }],
  badge: { type: String, default: 'Archived Record' },
});

const PreviousPregnancySchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
      index: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    pregnancyOrder: {
      type: Number,
      default: 1, // 1st pregnancy
    },
    year: {
      type: String,
      default: '2023 - 2024',
    },
    outcome: {
      type: String,
      default: 'Successful Full-Term Delivery',
    },
    gestationWeeksAtDelivery: {
      type: Number,
      default: 38,
    },
    deliveryType: {
      type: String,
      default: 'Spontaneous Vaginal Delivery',
    },
    babyGender: {
      type: String,
      default: 'Female',
    },
    birthWeightKg: {
      type: Number,
      default: 2.85,
    },
    recordedComplications: [{ type: String }],
    documents: [DocumentReportSchema],
    clinicalNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PreviousPregnancy', PreviousPregnancySchema);
