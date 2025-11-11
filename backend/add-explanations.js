const fs = require('fs');
const path = require('path');
const explanations = require('./explanations');

// Leer el archivo de preguntas
const questionsPath = path.join(__dirname, 'all-questions.json');
const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));

let updatedCount = 0;

// Agregar explicaciones a las preguntas
Object.keys(questionsData).forEach(topic => {
  questionsData[topic].forEach(question => {
    // Buscar explicación para esta pregunta
    const explanation = explanations.practiceExplanations[question.question];
    
    if (explanation) {
      question.explanation = explanation;
      updatedCount++;
    } else {
      question.explanation = '';
    }
  });
});

// Guardar el archivo actualizado
fs.writeFileSync(questionsPath, JSON.stringify(questionsData, null, 2));

console.log(`✅ ${updatedCount} preguntas actualizadas con explicaciones`);
console.log(`📝 Total de preguntas: ${Object.values(questionsData).reduce((sum, arr) => sum + arr.length, 0)}`);
