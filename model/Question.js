const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true, trim: true },
    options: {
      type: [String],
      validate: v => Array.isArray(v) && v.length === 4
    },
    correctAnswerIndex: {
      type: Number,
      required: true,
      min: 0,
      max: 3
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);
