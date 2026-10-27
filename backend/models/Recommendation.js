const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctorName: {
      type: String,
      default: 'Dr. Ananya Sharma',
    },
    title: {
      type: String,
      required: true,
      default: 'Clinical Care Plan',
    },
    clinicalNotes: {
      type: String,
      required: true,
    },
    dietaryGuidance: {
      type: String,
      default: '',
    },
    medications: [
      {
        medicineName: String,
        dosage: String,
        timing: String,
        duration: String,
      },
    ],
    lifestylePrecautions: [{ type: String }],
    requiresHospitalAdmission: {
      type: Boolean,
      default: false,
    },
    referralHospital: {
      type: String,
      default: '',
    },
    followUpDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Recommendation', RecommendationSchema);
