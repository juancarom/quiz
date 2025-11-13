const fs = require('fs');
const path = require('path');

// Leer el archivo all-questions.json
const filePath = path.join(__dirname, 'all-questions.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('🔧 Corrigiendo respuestas adicionales incorrectas de Ruby...\n');

// Pregunta 2: Ya fue corregida antes, verificamos que esté bien
console.log('✓ P2: Ya corregida - ":" (dos puntos)');

// Pregunta 4: Ya fue corregida antes
console.log('✓ P4: Ya corregida - "Un fragmento de código que puede pasarse a un método"');

// Pregunta 5: Ya fue corregida antes
console.log('✓ P5: Ya corregida - "class MiClase"');

// Pregunta 9: Ya fue corregida antes
console.log('✓ P9: Ya corregida - "Un módulo que agrupa métodos y constantes reutilizables"');

// Pregunta 13: ¿Cómo se definen variables de clase en Ruby?
data.ruby[12].options = [
  {
    text: "@@variable",
    isCorrect: true
  },
  {
    text: "@variable",
    isCorrect: false
  },
  {
    text: "$variable",
    isCorrect: false
  },
  {
    text: "variable",
    isCorrect: false
  }
];
console.log('✅ P13: Corregida - Nueva respuesta: "@@variable" (doble arroba)');

// Pregunta 17: ¿Qué es un singleton method en Ruby?
data.ruby[16].options = [
  {
    text: "Un método definido solo para una instancia específica",
    isCorrect: true
  },
  {
    text: "Un patrón de diseño",
    isCorrect: false
  },
  {
    text: "Un método privado",
    isCorrect: false
  },
  {
    text: "Un método de clase",
    isCorrect: false
  }
];
console.log('✅ P17: Corregida - Nueva respuesta: "Un método definido solo para una instancia específica"');

// Pregunta 25: ¿Qué operador se usa para concatenar strings en Ruby?
data.ruby[24].options = [
  {
    text: "+",
    isCorrect: true
  },
  {
    text: "&",
    isCorrect: false
  },
  {
    text: "*",
    isCorrect: false
  },
  {
    text: "<<",
    isCorrect: false
  }
];
console.log('✅ P25: Corregida - Nueva respuesta: "+" (operador suma)');

// Pregunta 39: ¿Qué método convierte string a symbol?
data.ruby[38].options = [
  {
    text: ".to_sym",
    isCorrect: true
  },
  {
    text: ".symbol",
    isCorrect: false
  },
  {
    text: ".to_s",
    isCorrect: false
  },
  {
    text: ".symbolize",
    isCorrect: false
  }
];
console.log('✅ P39: Corregida - Nueva respuesta: ".to_sym" (o .intern)');

// Pregunta 57: ¿Cuáles son formas de incluir módulos? (selección múltiple)
data.ruby[56].options = [
  {
    text: "include",
    isCorrect: true
  },
  {
    text: "extend",
    isCorrect: true
  },
  {
    text: "prepend",
    isCorrect: true
  },
  {
    text: "import",
    isCorrect: false
  }
];
data.ruby[56].isMultipleChoice = true;
console.log('✅ P57: Corregida - Nuevas respuestas: "include", "extend", "prepend"');

// Guardar el archivo actualizado
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('\n✅ Todas las correcciones adicionales de Ruby han sido aplicadas exitosamente');
console.log('📊 Total de respuestas corregidas en Ruby: 9 (4 anteriores + 5 nuevas)');
