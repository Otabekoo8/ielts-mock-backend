const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Question = require('./model/Question');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB ulanadi
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB ulandi'))
  .catch(err => console.error(err));

// ------------------ ADMIN CRUD ------------------

// Barcha savollarni olish
app.get('/api/questions', async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

// Yangi savol qo‘shish
app.post('/api/questions', async (req, res) => {
  const newQ = new Question(req.body);
  await newQ.save();
  res.status(201).json(newQ);
});

// Savol tahrirlash
app.put('/api/questions/:id', async (req, res) => {
  const updatedQ = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedQ);
});

// Savol o‘chirish
app.delete('/api/questions/:id', async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ message: 'Savol o‘chirildi' });
});

// ------------------ USER FUNKSIYALAR ------------------

// Tasodifiy 30 ta savol olish
app.get('/api/test', async (req, res) => {
  const questions = await Question.aggregate([{ $sample: { size: 30 } }]);
  res.json(questions);
});

// Javoblarni tekshirish
app.post('/api/test/result', async (req, res) => {
  const { answers } = req.body; // [{id, answerIndex}]
  let correctCount = 0;

  for (let ans of answers) {
    const question = await Question.findById(ans.id);
    if (question && question.correctAnswerIndex === ans.answerIndex) {
      correctCount++;
    }
  }

  const percentage = ((correctCount / answers.length) * 100).toFixed(2);
  res.json({ correctCount, percentage });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server ${PORT} portida ishlayapti`));
