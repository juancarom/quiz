const fs = require('fs');
const path = require('path');

// Leer el archivo all-questions.json
const filePath = path.join(__dirname, 'all-questions.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('🔧 Corrigiendo respuestas incorrectas de AWS...\n');

// Pregunta 3: ¿Qué servicio AWS proporciona servidores virtuales?
data.aws[2].options = [
  {
    text: "Amazon EC2 (Elastic Compute Cloud)",
    isCorrect: true
  },
  {
    text: "Elastic Beanstalk",
    isCorrect: false
  },
  {
    text: "Lambda",
    isCorrect: false
  },
  {
    text: "S3",
    isCorrect: false
  }
];
console.log('✅ P3: Corregida - Nueva respuesta: "Amazon EC2 (Elastic Compute Cloud)"');

// Pregunta 6: ¿Qué servicio AWS es para almacenamiento de objetos?
data.aws[5].options = [
  {
    text: "S3 (Simple Storage Service)",
    isCorrect: true
  },
  {
    text: "EC2",
    isCorrect: false
  },
  {
    text: "RDS",
    isCorrect: false
  },
  {
    text: "EBS",
    isCorrect: false
  }
];
console.log('✅ P6: Corregida - Nueva respuesta: "S3 (Simple Storage Service)"');

// Pregunta 10: ¿Qué es AWS Lambda?
data.aws[9].options = [
  {
    text: "Un servicio de computación serverless que ejecuta código sin aprovisionar servidores",
    isCorrect: true
  },
  {
    text: "Una base de datos",
    isCorrect: false
  },
  {
    text: "Un servicio de contenedores",
    isCorrect: false
  },
  {
    text: "Un balanceador de carga",
    isCorrect: false
  }
];
console.log('✅ P10: Corregida - Nueva respuesta: "Un servicio serverless que ejecuta código sin aprovisionar servidores"');

// Guardar el archivo actualizado
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('\n✅ Todas las correcciones de AWS han sido aplicadas exitosamente');
console.log('📊 Total de respuestas corregidas: 3');
