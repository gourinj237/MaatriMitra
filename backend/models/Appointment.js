const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
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
    patientName: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      default: 'Dr. Ananya Sharma',
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      default: '10:30 AM',
    },
    visitType: {
      type: String,
      enum: ['Routine Trimester Checkup', 'High-Risk Followup', 'Ultrasound Scan', 'Postpartum Review', 'Emergency Consult'],
      default: 'Routine Trimester Checkup',
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Completed', 'Cancelled', 'Missed'],
      default: 'Upcoming',
    },
    location: {
      type: String,
      default: 'Primary Health Center (PHC) Rampur - Room 4',
    },
    clinicalNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);
