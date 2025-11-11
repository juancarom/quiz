const mongoose = require('mongoose');
const Question = require('./models/Question');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Cargar preguntas del archivo JSON generado
const questionsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'all-questions.json'), 'utf-8')
);

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Conectado a MongoDB');
  
  // Limpiar colección existente
  await Question.deleteMany({});
  console.log('🗑️  Colección limpiada');
  
  // Insertar preguntas
  const questions = [];
  for (const [topic, topicQuestions] of Object.entries(questionsData)) {
    for (const q of topicQuestions) {
      questions.push({
        topic,
        question: q.question,
        options: q.options,
        isMultipleChoice: q.isMultipleChoice,
        explanation: q.explanation || ''
      });
    }
  }
  
  await Question.insertMany(questions);
  console.log(`✅ ${questions.length} preguntas insertadas`);
  
  // Mostrar resumen
  const summary = await Question.aggregate([
    { $group: { _id: '$topic', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  
  console.log('\n📊 Resumen por tema:');
  summary.forEach(s => {
    console.log(`   ${s._id}: ${s.count} preguntas`);
  });
  
  process.exit(0);
})
.catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
