const Question = require('../models/Question');

// Admin: Create
exports.createQuestion = async (req, res) => {
  try {
    const { questionText, options, correctAnswerIndex } = req.body;
    if (!questionText || !options || options.length !== 4 || correctAnswerIndex == null) {
      return res.status(400).json({ message: 'Invalid payload' });
    }
    const q = await Question.create({ questionText, options, correctAnswerIndex });
    res.status(201).json(q);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Admin: Read all
exports.getAllQuestionsAdmin = async (_req, res) => {
  try {
    const list = await Question.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Admin: Read one
exports.getQuestionById = async (req, res) => {
  try {
    const q = await Question.findById(req.params.id);
    if (!q) return res.status(404).json({ message: 'Not found' });
    res.json(q);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Admin: Update
exports.updateQuestion = async (req, res) => {
  try {
    const { questionText, options, correctAnswerIndex } = req.body;
    const q = await Question.findByIdAndUpdate(
      req.params.id,
      { questionText, options, correctAnswerIndex },
      { new: true, runValidators: true }
    );
    if (!q) return res.status(404).json({ message: 'Not found' });
    res.json(q);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Admin: Delete
exports.deleteQuestion = async (req, res) => {
  try {
    const q = await Question.findByIdAndDelete(req.params.id);
    if (!q) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted', id: q._id });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Public: Get questions for test (no correct answers exposed)
exports.getQuestionsForTest = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit, 10);
    if (isNaN(limit) || limit <= 0) limit = 30; // default 30
    const all = await Question.find({}, { questionText: 1, options: 1 }).lean();

    // shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }

    res.json(all.slice(0, limit));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
