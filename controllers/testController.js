const Question = require('../models/Question');

exports.submitAnswers = async (req, res) => {
  try {
    const { answers } = req.body; // [{questionId, selectedIndex}, ...]
    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: 'answers[] is required' });
    }

    const ids = answers.map(a => a.questionId);
    const questions = await Question.find({ _id: { $in: ids } }).lean();

    const questionMap = new Map(questions.map(q => [String(q._id), q]));
    let correct = 0;
    const details = answers.map(a => {
      const q = questionMap.get(String(a.questionId));
      if (!q) return { questionId: a.questionId, correct: false, reason: 'not_found' };
      const isCorrect = a.selectedIndex === q.correctAnswerIndex;
      if (isCorrect) correct += 1;
      return {
        questionId: a.questionId,
        selectedIndex: a.selectedIndex,
        correctAnswerIndex: q.correctAnswerIndex,
        correct: isCorrect
      };
    });

    const total = answers.length;
    const percent = total ? Math.round((correct / total) * 100) : 0;

    res.json({ correct, total, percent, details });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
