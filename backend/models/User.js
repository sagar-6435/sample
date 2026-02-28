const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor', 'hospital', 'superadmin'], required: true },
  phone: String,
  bloodType: String,
  age: Number,
  medicalHistory: [String],
  allergies: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
