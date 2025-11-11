// Script para generar explicaciones automáticas para todas las preguntas
const fs = require('fs');
const path = require('path');

// Cargar explicaciones manuales de alta calidad
const manualExplanations = require('./explanations');

// Leer preguntas
const questionsPath = path.join(__dirname, 'all-questions.json');
const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));

// Función para generar explicación basada en la pregunta y respuesta correcta
function generateExplanation(question, correctAnswers, topic) {
  const questionLower = question.toLowerCase();
  
  // Para preguntas con múltiples respuestas correctas, listar todas
  let explanation = '';
  
  if (correctAnswers.length > 1) {
    explanation = `Las respuestas correctas son: ${correctAnswers.map(a => `"${a}"`).join(' y ')}. `;
  } else {
    const correctAnswer = correctAnswers[0];
    
    // Generar explicación contextual basada en palabras clave
    if (questionLower.includes('qué es') || questionLower.includes('que es')) {
      explanation = `${correctAnswer} es la definición correcta. `;
    } else if (questionLower.includes('cómo se') || questionLower.includes('como se')) {
      explanation = `La forma correcta es: ${correctAnswer}. `;
    } else if (questionLower.includes('cuál es') || questionLower.includes('cual es')) {
      explanation = `${correctAnswer} es la opción correcta. `;
    } else if (questionLower.includes('qué hace') || questionLower.includes('que hace')) {
      explanation = `La función o comportamiento es: ${correctAnswer}. `;
    } else {
      explanation = `${correctAnswer} es la respuesta correcta. `;
    }
  }
  
  // Agregar contexto educativo según el tema
  explanation += getEducationalContext(questionLower, correctAnswers[0], topic);
  
  return explanation;
}

function getEducationalContext(questionLower, correctAnswer, topic) {
  // Contextos educativos basados en palabras clave
  const contexts = [];
  
  // Contextos por tema
  if (topic === 'ruby') {
    if (questionLower.includes('método') || questionLower.includes('metodo')) {
      contexts.push('Los métodos en Ruby son fundamentales para organizar y reutilizar código de forma eficiente.');
    } else if (questionLower.includes('clase')) {
      contexts.push('Las clases en Ruby definen la estructura y comportamiento de los objetos en el paradigma orientado a objetos.');
    } else if (questionLower.includes('array') || questionLower.includes('arreglo')) {
      contexts.push('Los arrays en Ruby son colecciones ordenadas de elementos con métodos poderosos para manipulación de datos.');
    }
  } else if (topic === 'nestjs') {
    if (questionLower.includes('decorador')) {
      contexts.push('Los decoradores en NestJS son anotaciones que añaden metadatos y funcionalidad a clases y métodos.');
    } else if (questionLower.includes('guard')) {
      contexts.push('Los Guards en NestJS controlan el acceso a rutas basándose en condiciones como autenticación o permisos.');
    } else if (questionLower.includes('módulo') || questionLower.includes('modulo')) {
      contexts.push('Los módulos en NestJS organizan la aplicación en componentes cohesivos y reutilizables.');
    }
  } else if (topic === 'sql') {
    if (questionLower.includes('select')) {
      contexts.push('SELECT es el comando fundamental para consultar y recuperar datos de tablas en bases de datos relacionales.');
    } else if (questionLower.includes('join')) {
      contexts.push('Los JOINs combinan datos de múltiples tablas basándose en relaciones entre columnas.');
    } else if (questionLower.includes('index') || questionLower.includes('índice')) {
      contexts.push('Los índices mejoran el rendimiento de las consultas pero requieren espacio adicional y mantenimiento.');
    }
  } else if (topic === 'docker') {
    if (questionLower.includes('contenedor')) {
      contexts.push('Los contenedores Docker empaquetan aplicaciones con sus dependencias, garantizando consistencia entre entornos.');
    } else if (questionLower.includes('imagen')) {
      contexts.push('Las imágenes Docker son plantillas inmutables que definen el contenido y configuración de los contenedores.');
    } else if (questionLower.includes('volumen')) {
      contexts.push('Los volúmenes en Docker persisten datos más allá del ciclo de vida de los contenedores.');
    }
  } else if (topic === 'mongodb') {
    if (questionLower.includes('documento')) {
      contexts.push('Los documentos en MongoDB son estructuras JSON flexibles que almacenan datos de forma no relacional.');
    } else if (questionLower.includes('colección') || questionLower.includes('coleccion')) {
      contexts.push('Las colecciones en MongoDB agrupan documentos relacionados sin requerir un esquema fijo.');
    }
  } else if (topic === 'poo') {
    if (questionLower.includes('herencia')) {
      contexts.push('La herencia permite crear clases basadas en otras, reutilizando y extendiendo funcionalidad existente.');
    } else if (questionLower.includes('polimorfismo')) {
      contexts.push('El polimorfismo permite que objetos de diferentes clases respondan de forma única al mismo mensaje.');
    } else if (questionLower.includes('encapsulación') || questionLower.includes('encapsulacion')) {
      contexts.push('La encapsulación oculta los detalles internos de implementación, exponiendo solo interfaces públicas.');
    }
  } else if (topic === 'aws') {
    if (questionLower.includes('ec2')) {
      contexts.push('EC2 proporciona capacidad de cómputo escalable en la nube de AWS.');
    } else if (questionLower.includes('s3')) {
      contexts.push('S3 es el servicio de almacenamiento de objetos altamente escalable y duradero de AWS.');
    } else if (questionLower.includes('lambda')) {
      contexts.push('Lambda permite ejecutar código sin gestionar servidores, cobrando solo por el tiempo de ejecución.');
    }
  } else if (topic === 'graphql') {
    if (questionLower.includes('query')) {
      contexts.push('Las queries en GraphQL permiten al cliente especificar exactamente qué datos necesita, evitando over-fetching.');
    } else if (questionLower.includes('mutation')) {
      contexts.push('Las mutations en GraphQL modifican datos en el servidor, similar a POST/PUT/DELETE en REST.');
    } else if (questionLower.includes('schema')) {
      contexts.push('El schema de GraphQL define los tipos de datos disponibles y las operaciones permitidas en la API.');
    }
  }
  
  // Contexto general si no hay específico
  if (contexts.length === 0) {
    contexts.push(getTopicContext(topic));
  }
  
  return contexts.join(' ');
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
let manualExplanationsKept = 0;

// Crear un Set con todas las preguntas que tienen explicaciones manuales
const allManualExplanations = {
  ...manualExplanations.rubyExplanations,
  ...manualExplanations.jsExplanations,
  ...manualExplanations.sqlExplanations
};

Object.keys(questionsData).forEach(topic => {
  questionsData[topic].forEach(question => {
    // Si esta pregunta tiene explicación manual de alta calidad, NO la sobrescribimos
    if (allManualExplanations[question.question]) {
      manualExplanationsKept++;
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

console.log(`✅ ${totalUpdated} preguntas actualizadas con explicaciones educativas`);
console.log(`� ${manualExplanationsKept} explicaciones manuales de alta calidad conservadas`);
console.log(`📊 Total: ${Object.values(questionsData).reduce((sum, arr) => sum + arr.length, 0)} preguntas`);
