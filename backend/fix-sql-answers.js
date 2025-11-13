const fs = require('fs');
const path = require('path');

// Leer el archivo all-questions.json
const filePath = path.join(__dirname, 'all-questions.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('🔧 Corrigiendo respuestas incorrectas de SQL...\n');

// P4: "¿Qué comando actualiza datos existentes?"
// Respuesta correcta: UPDATE
data.sql[3].options = [
  { text: "UPDATE", isCorrect: true },
  { text: "CHANGE", isCorrect: false },
  { text: "MODIFY", isCorrect: false },
  { text: "ALTER", isCorrect: false }
];
console.log('✅ P4: Corregida - Nueva respuesta: "UPDATE"');

// P5: "¿Qué comando elimina filas de una tabla?"
// Respuesta correcta: DELETE
data.sql[4].options = [
  { text: "DELETE", isCorrect: true },
  { text: "DROP", isCorrect: false },
  { text: "REMOVE", isCorrect: false },
  { text: "TRUNCATE", isCorrect: false }
];
console.log('✅ P5: Corregida - Nueva respuesta: "DELETE"');

// P11: "¿Qué tipo de JOIN devuelve todas las filas de la tabla izquierda?"
// Respuesta correcta: LEFT JOIN
data.sql[10].options = [
  { text: "LEFT JOIN", isCorrect: true },
  { text: "RIGHT JOIN", isCorrect: false },
  { text: "INNER JOIN", isCorrect: false },
  { text: "FULL JOIN", isCorrect: false }
];
console.log('✅ P11: Corregida - Nueva respuesta: "LEFT JOIN"');

// P18: "¿Qué comando inicia una transacción?"
// Respuesta correcta: BEGIN TRANSACTION (también válido START TRANSACTION o BEGIN)
data.sql[17].options = [
  { text: "BEGIN TRANSACTION", isCorrect: true },
  { text: "START TRANSACTION", isCorrect: true },
  { text: "INIT TRANSACTION", isCorrect: false },
  { text: "OPEN TRANSACTION", isCorrect: false }
];
data.sql[17].isMultipleChoice = true;
console.log('✅ P18: Corregida - Nuevas respuestas: "BEGIN TRANSACTION", "START TRANSACTION"');

// Guardar el archivo actualizado
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('\n✅ Todas las correcciones de SQL han sido aplicadas exitosamente');
console.log('📊 Total de respuestas corregidas en SQL: 4 (P4, P5, P11, P18)');
