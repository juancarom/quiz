const fs = require('fs');
const path = require('path');

// Leer el archivo all-questions.json
const filePath = path.join(__dirname, 'all-questions.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('🔧 Corrigiendo respuestas incorrectas de GraphQL...\n');

// Pregunta 4: ¿Qué es una query en GraphQL?
data.graphql[3].options = [
  {
    text: "Una consulta que solicita varios campos o relaciones en una sola llamada",
    isCorrect: true
  },
  {
    text: "Un método para modificar datos",
    isCorrect: false
  },
  {
    text: "Una validación de esquema",
    isCorrect: false
  },
  {
    text: "Un tipo de mutación",
    isCorrect: false
  }
];
console.log('✅ P4: Corregida - Nueva respuesta: "Una consulta que solicita varios campos o relaciones en una sola llamada"');

// Pregunta 10: ¿Cuáles son los tipos raíz en GraphQL?
data.graphql[9].options = [
  {
    text: "Los tipos Query, Mutation y Subscription",
    isCorrect: true
  },
  {
    text: "Query",
    isCorrect: false
  },
  {
    text: "Schema y Type",
    isCorrect: false
  },
  {
    text: "Object y Scalar",
    isCorrect: false
  }
];
console.log('✅ P10: Corregida - Nueva respuesta: "Los tipos Query, Mutation y Subscription"');

// Guardar el archivo actualizado
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('\n✅ Todas las correcciones de GraphQL han sido aplicadas exitosamente');
console.log('📊 Total de respuestas corregidas: 2');
