const mongoose = require('mongoose');

const NewbornSchema = new mongoose.Schema(
  {
    babyId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    babyName: {
      type: String,
      default: 'Baby of Mother',
    },
    motherName: {
      type: String,
      required: true,
    },
    motherId: {
      type: String,
      required: true,
    },
    birthDateTime: {
      type: Date,
      default: Date.now,
    },
    gender: {
      type: String,
      enum: ['Female', 'Male', 'Other'],
      required: true,
    },
    birthWeightKg: {
      type: Number,
      required: true,
    },
    birthLengthCm: {
      type: Number,
      default: 50,
    },
    headCircumferenceCm: {
      type: Number,
      default: 34.5,
    },
    gestationalWeeksAtBirth: {
      type: Number,
      default: 39,
    },
    deliveryType: {
      type: String,
      default: 'Normal Vaginal Delivery',
    },
    apgarScore1Min: {
      type: Number,
      default: 8,
    },
    apgarScore5Min: {
      type: Number,
      default: 9,
    },
    healthStatus: {
      type: String,
      default: 'Healthy / Stable',
    },
    facilityName: {
      type: String,
      default: 'District Rural General Hospital',
    },
    clinicalRoom: {
      type: String,
      default: 'Maternity Labor Suite 2',
    },
    immunizationsGiven: [{ type: String }],
    attendingDoctor: {
      type: String,
      default: 'Dr. Ananya Sharma',
    },
    attendingPediatrician: {
      type: String,
      default: 'Dr. Suniti Rao, MD (Pediatrics)',
    },
    ashaWorker: {
      type: String,
      default: 'Sunita Devi',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Newborn', NewbornSchema);
