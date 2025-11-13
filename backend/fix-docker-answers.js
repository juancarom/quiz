const fs = require('fs');
const path = require('path');

// Leer el archivo all-questions.json
const filePath = path.join(__dirname, 'all-questions.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('🔧 Corrigiendo respuestas incorrectas de Docker...\n');

// Pregunta 8: ¿Qué archivo define servicios en Docker Compose?
data.docker[7].options = [
  {
    text: "docker-compose.yml",
    isCorrect: true
  },
  {
    text: "docker.yaml",
    isCorrect: false
  },
  {
    text: "compose.json",
    isCorrect: false
  },
  {
    text: "services.yml",
    isCorrect: false
  }
];
console.log('✅ P8: Corregida - Nueva respuesta: "docker-compose.yml"');

// Pregunta 16: ¿Qué comando elimina recursos Docker no utilizados?
data.docker[15].options = [
  {
    text: "docker system prune",
    isCorrect: true
  },
  {
    text: "docker prune",
    isCorrect: false
  },
  {
    text: "docker clean",
    isCorrect: false
  },
  {
    text: "docker remove unused",
    isCorrect: false
  }
];
console.log('✅ P16: Corregida - Nueva respuesta: "docker system prune"');

// Guardar el archivo actualizado
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('\n✅ Todas las correcciones de Docker han sido aplicadas exitosamente');
console.log('📊 Total de respuestas corregidas: 2');
