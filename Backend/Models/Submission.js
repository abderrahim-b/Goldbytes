const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answer: String,
  isCorrect: { type: Boolean, default: false },
  submittedAt: { type: Date, default: Date.now }
});

const Submission = mongoose.model('Submission', challengeSchema);
module.exports = Submission;