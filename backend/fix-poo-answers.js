const fs = require('fs');
const path = require('path');

// Leer el archivo all-questions.json
const filePath = path.join(__dirname, 'all-questions.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('🔧 Corrigiendo respuestas incorrectas de POO...\n');

// Pregunta 12: ¿Qué principio protege el acceso directo a los datos?
data.poo[11].options = [
  {
    text: "Encapsulación",
    isCorrect: true
  },
  {
    text: "Herencia",
    isCorrect: false
  },
  {
    text: "Polimorfismo",
    isCorrect: false
  },
  {
    text: "Abstracción",
    isCorrect: false
  }
];
console.log('✅ P12: Corregida - Nueva respuesta: "Encapsulación"');

// Pregunta 15: ¿Qué es polimorfismo?
data.poo[14].options = [
  {
    text: "Objetos distintos pueden responder al mismo mensaje de forma diferente",
    isCorrect: true
  },
  {
    text: "Herencia múltiple",
    isCorrect: false
  },
  {
    text: "Ocultar datos",
    isCorrect: false
  },
  {
    text: "Crear clases abstractas",
    isCorrect: false
  }
];
console.log('✅ P15: Corregida - Nueva respuesta: "Objetos distintos pueden responder al mismo mensaje de forma diferente"');

// Pregunta 21: ¿Qué es una instancia?
data.poo[20].options = [
  {
    text: "Un objeto creado a partir de una clase",
    isCorrect: true
  },
  {
    text: "Una variable estática",
    isCorrect: false
  },
  {
    text: "Un método de clase",
    isCorrect: false
  },
  {
    text: "Una interfaz",
    isCorrect: false
  }
];
console.log('✅ P21: Corregida - Nueva respuesta: "Un objeto creado a partir de una clase"');

// Pregunta 35: ¿Qué son los métodos de clase?
data.poo[34].options = [
  {
    text: "Métodos estáticos o de clase, definidos con self",
    isCorrect: true
  },
  {
    text: "Métodos privados",
    isCorrect: false
  },
  {
    text: "Métodos heredados",
    isCorrect: false
  },
  {
    text: "Métodos abstractos",
    isCorrect: false
  }
];
console.log('✅ P35: Corregida - Nueva respuesta: "Métodos estáticos o de clase, definidos con self"');

// Guardar el archivo actualizado
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('\n✅ Todas las correcciones de POO han sido aplicadas exitosamente');
console.log('📊 Total de respuestas corregidas: 4');
