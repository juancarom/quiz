// Script para generar explicaciones automáticas para todas las preguntas
const fs = require('fs');
const path = require('path');

// Leer preguntas
const questionsPath = path.join(__dirname, 'all-questions.json');
const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));

// Función para generar explicación basada en la pregunta y respuesta correcta
function generateExplanation(question, correctAnswers, topic) {
  const correctAnswer = correctAnswers[0]; // Primera respuesta correcta
  
  // Intentar generar explicación contextual
  return `La respuesta correcta es: "${correctAnswer}". ${getTopicContext(topic)}`;
}

function getTopicContext(topic) {
  const contexts = {
    'nestjs': 'NestJS es un framework de Node.js que utiliza TypeScript y está inspirado en Angular.',
    'ruby': 'Ruby es un lenguaje de programación dinámico, orientado a objetos y de sintaxis elegante.',
    'rails': 'Ruby on Rails es un framework web MVC que sigue el principio de convención sobre configuración.',
    'sql': 'SQL es el lenguaje estándar para gestionar y manipular bases de datos relacionales.',
    'mysql': 'MySQL es uno de los sistemas de gestión de bases de datos relacionales más populares.',
    'mongodb': 'MongoDB es una base de datos NoSQL orientada a documentos que almacena datos en formato JSON.',
    'poo': 'La Programación Orientada a Objetos organiza el código en objetos que combinan datos y comportamiento.',
    'docker': 'Docker es una plataforma que permite empaquetar aplicaciones en contenedores ligeros y portables.',
    'aws': 'AWS (Amazon Web Services) es la plataforma de servicios en la nube más completa del mercado.',
    'graphql': 'GraphQL es un lenguaje de consulta para APIs que permite al cliente solicitar exactamente los datos que necesita.',
    'practice': 'Esta es una pregunta práctica de código que evalúa conocimientos de sintaxis y mejores prácticas.'
  };
  return contexts[topic] || '';
}

// Generar explicaciones para todas las preguntas
let totalUpdated = 0;
let alreadyHasExplanation = 0;

Object.keys(questionsData).forEach(topic => {
  questionsData[topic].forEach(question => {
    // Si ya tiene explicación, no la sobrescribimos
    if (question.explanation && question.explanation.trim() !== '') {
      alreadyHasExplanation++;
      return;
    }
    
    // Obtener respuestas correctas
    const correctAnswers = question.options
      .filter(opt => opt.isCorrect)
      .map(opt => opt.text);
    
    if (correctAnswers.length > 0) {
      question.explanation = generateExplanation(question.question, correctAnswers, topic);
      totalUpdated++;
    } else {
      question.explanation = getTopicContext(topic);
      totalUpdated++;
    }
  });
});

// Guardar
fs.writeFileSync(questionsPath, JSON.stringify(questionsData, null, 2));

console.log(`✅ ${totalUpdated} preguntas actualizadas con explicaciones generadas`);
console.log(`📝 ${alreadyHasExplanation} preguntas ya tenían explicación`);
console.log(`📊 Total: ${Object.values(questionsData).reduce((sum, arr) => sum + arr.length, 0)} preguntas`);
