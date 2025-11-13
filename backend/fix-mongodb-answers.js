const fs = require('fs');
const path = require('path');

// Leer el archivo all-questions.json
const filePath = path.join(__dirname, 'all-questions.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('🔧 Corrigiendo respuestas incorrectas de MongoDB...\n');

// Pregunta 7: ¿Qué método actualiza un documento en MongoDB?
data.mongodb[6].options = [
  {
    text: "db.collection.updateOne()",
    isCorrect: true
  },
  {
    text: "update",
    isCorrect: false
  },
  {
    text: "db.collection.modify()",
    isCorrect: false
  },
  {
    text: "db.collection.change()",
    isCorrect: false
  }
];
console.log('✅ P7: Corregida - Nueva respuesta: "db.collection.updateOne()"');

// Pregunta 12: ¿Qué método ejecuta el aggregation pipeline en MongoDB?
data.mongodb[11].options = [
  {
    text: "db.collection.aggregate([...])",
    isCorrect: true
  },
  {
    text: "pipeline()",
    isCorrect: false
  },
  {
    text: "db.collection.pipeline()",
    isCorrect: false
  },
  {
    text: "db.aggregate()",
    isCorrect: false
  }
];
console.log('✅ P12: Corregida - Nueva respuesta: "db.collection.aggregate([...])"');

// Guardar el archivo actualizado
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('\n✅ Todas las correcciones de MongoDB han sido aplicadas exitosamente');
console.log('📊 Total de respuestas corregidas: 2');
