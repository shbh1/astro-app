const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  dateOfBirth: {type: Date, required: true}, // New field for date of birth
  role: {type: String, enum: ['client', 'astrologer'], required: true},
  skills: [{type: String}], // Astrologer-specific attribute
  languages: [{type: String}], // Astrologer-specific attribute
  yearsOfExperience: {type: Number}, // Astrologer-specific attribute
  verificationToken: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
