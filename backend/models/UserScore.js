const mongoose = require('mongoose');

const userScoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  questionCount: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  timeInSeconds: {
    type: Number,
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

// Índice compuesto para queries rápidas
userScoreSchema.index({ userId: 1, topic: 1, percentage: -1 });
userScoreSchema.index({ topic: 1, percentage: -1, completedAt: -1 });

module.exports = mongoose.model('UserScore', userScoreSchema);
