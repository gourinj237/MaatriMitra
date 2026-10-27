const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Doctor', 'Hospital Administrator', 'ASHA Worker', 'Mother', 'Admin'],
      default: 'Doctor',
      required: true,
    },
    phone: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      default: 'Obstetrics & Gynecology',
    },
    licenseNumber: {
      type: String,
      default: '',
    },
    facilityName: {
      type: String,
      default: 'District Rural General Hospital',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Suspended'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);
