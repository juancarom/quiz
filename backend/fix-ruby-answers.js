const fs = require('fs');
const path = require('path');

// Leer el archivo all-questions.json
const filePath = path.join(__dirname, 'all-questions.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('🔧 Corrigiendo respuestas incorrectas de Ruby...\n');

// Pregunta 2: ¿Qué símbolo se usa para definir un símbolo en Ruby?
data.ruby[1].options = [
  {
    text: "#",
    isCorrect: false
  },
  {
    text: ":",
    isCorrect: true
  },
  {
    text: "@",
    isCorrect: false
  },
  {
    text: "$",
    isCorrect: false
  }
];
console.log('✅ P2: Corregida - Nueva respuesta: ":" (dos puntos, no "#")');

// Pregunta 4: ¿Qué es un bloque en Ruby?
data.ruby[3].options = [
  {
    text: "Un fragmento de código que puede pasarse a un método",
    isCorrect: true
  },
  {
    text: "Un tipo de variable",
    isCorrect: false
  },
  {
    text: "Una clase especial",
    isCorrect: false
  },
  {
    text: "Un módulo",
    isCorrect: false
  }
];
console.log('✅ P4: Corregida - Nueva respuesta: "Un fragmento de código que puede pasarse a un método"');

// Pregunta 5: ¿Cómo se define una clase en Ruby?
data.ruby[4].options = [
  {
    text: "class MiClase",
    isCorrect: true
  },
  {
    text: "Class MiClase",
    isCorrect: false
  },
  {
    text: "def class MiClase",
    isCorrect: false
  },
  {
    text: "new MiClase",
    isCorrect: false
  }
];
console.log('✅ P5: Corregida - Nueva respuesta: "class MiClase" (con minúsculas)');

// Pregunta 9: ¿Qué es un módulo en Ruby?
data.ruby[8].options = [
  {
    text: "Un módulo que agrupa métodos y constantes reutilizables",
    isCorrect: true
  },
  {
    text: "Un tipo de variable",
    isCorrect: false
  },
  {
    text: "Una clase especial",
    isCorrect: false
  },
  {
    text: "Un método privado",
    isCorrect: false
  }
];
console.log('✅ P9: Corregida - Nueva respuesta: "Un módulo que agrupa métodos y constantes reutilizables"');

// Guardar el archivo actualizado
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('\n✅ Todas las correcciones de Ruby han sido aplicadas exitosamente');
console.log('📊 Total de respuestas corregidas: 4');
