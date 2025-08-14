const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('../model/Question');

dotenv.config();

const data = [
  { q: "Choose the correct form: She ____ to the gym every day.", o: ["go", "goes", "going", "gone"], a: 1 },
  { q: "Select the synonym of 'rapid'.", o: ["slow", "quick", "late", "lazy"], a: 1 },
  { q: "Pick the correct preposition: I'm interested ___ music.", o: ["on", "at", "in", "for"], a: 2 },
  { q: "Complete: If it rains, we ____ at home.", o: ["stay", "will stay", "stayed", "staying"], a: 1 },
  { q: "Find the error: He don’t like coffee.", o: ["He", "don’t", "like", "coffee"], a: 1 },
  { q: "Choose the correct tense: They ____ the movie already.", o: ["see", "saw", "have seen", "seen"], a: 2 },
  { q: "Which is a countable noun?", o: ["water", "information", "advice", "apple"], a: 3 },
  { q: "Pick the correct article: ____ apple a day keeps the doctor away.", o: ["A", "An", "The", "No article"], a: 1 },
  { q: "Choose the best connector: He was tired, ____ he finished the work.", o: ["so", "but", "because", "although"], a: 0 },
  { q: "Select the correct form: English ____ in many countries.", o: ["speak", "speaks", "is spoken", "spoken"], a: 2 },
  { q: "Choose the right word: The results were ____ than we expected.", o: ["good", "better", "best", "well"], a: 1 },
  { q: "Find the correct spelling.", o: ["definately", "definitely", "definitly", "definitelly"], a: 1 },
  { q: "Choose the correct modal: You ____ wear a seatbelt.", o: ["can", "must", "might", "could"], a: 1 },
  { q: "Pick the correct verb: Neither of them ____ coming.", o: ["are", "were", "is", "be"], a: 2 },
  { q: "Select the antonym of 'increase'.", o: ["rise", "grow", "expand", "decrease"], a: 3 },
  { q: "Choose the correct phrase: She prefers tea ____ coffee.", o: ["than", "over", "to", "for"], a: 2 },
  { q: "Pick the correct order: I have never ____ such a beautiful view.", o: ["saw", "seen", "see", "seeing"], a: 1 },
  { q: "Find the error: There is many people here.", o: ["There", "is", "many", "people"], a: 2 },
  { q: "Choose the correct tag: It's cold today, ____?", o: ["is it", "isn't it", "does it", "doesn't it"], a: 1 },
  { q: "Pick the correct word: She speaks English ____.", o: ["fluent", "fluently", "fluency", "fluentily"], a: 1 },
  { q: "Select the correct form: He has been ____ for two hours.", o: ["wait", "waiting", "waited", "to wait"], a: 1 },
  { q: "Choose the right preposition: We arrived ____ the airport early.", o: ["to", "at", "in", "on"], a: 1 },
  { q: "Find the correct comparison: This task is ____ than the last one.", o: ["difficult", "more difficult", "most difficult", "difficulty"], a: 1 },
  { q: "Choose the correct voice: The letter ____ yesterday.", o: ["delivered", "was delivered", "is delivering", "has delivered"], a: 1 },
  { q: "Pick the correct tense: By 8 pm, they ____ dinner.", o: ["will have finished", "finish", "finished", "have finished"], a: 0 },
  { q: "Select the collocation: Make a ____.", o: ["homework", "mistake", "photo", "walk"], a: 1 },
  { q: "Choose the right article: He is ____ honest man.", o: ["a", "an", "the", "no article"], a: 1 },
  { q: "Pick the correct word: She gave me a good ____.", o: ["advices", "advice", "advise", "advises"], a: 1 },
  { q: "Find the error: She didn’t went to school.", o: ["She", "didn’t", "went", "to school"], a: 2 },
  { q: "Choose the best option: I look forward to ____ from you.", o: ["hear", "hears", "hearing", "heard"], a: 2 }
];

async function run() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to', conn.connection.host);

    await Question.deleteMany({});
    const docs = data.map(it => ({
      questionText: it.q,
      options: it.o,
      correctAnswerIndex: it.a
    }));
    await Question.insertMany(docs);

    const count = await Question.countDocuments();
    console.log(`✅ ${count} ta savol qo‘shildi!`);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

run();
