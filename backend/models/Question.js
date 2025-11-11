const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    enum: ['nestjs', 'ruby', 'rails', 'sql', 'mysql', 'mongodb', 'poo', 'docker', 'aws', 'graphql', 'practice']
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    text: String,
    isCorrect: Boolean
  }],
  isMultipleChoice: {
    type: Boolean,
    default: false
  },
  explanation: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);
