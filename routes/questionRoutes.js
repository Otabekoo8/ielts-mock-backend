const express = require('express');
const router = express.Router();
const {
  createQuestion,
  getAllQuestionsAdmin,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionsForTest
} = require('../controllers/questionController');

// Health
router.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Public (test)
router.get('/questions', getQuestionsForTest);

// Admin CRUD (auth yo‘q – minimal talab)
router.post('/admin/questions', createQuestion);
router.get('/admin/questions', getAllQuestionsAdmin);
router.get('/admin/questions/:id', getQuestionById);
router.put('/admin/questions/:id', updateQuestion);
router.delete('/admin/questions/:id', deleteQuestion);

module.exports = router;
