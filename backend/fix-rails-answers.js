const fs = require('fs');
const path = require('path');

// Leer el archivo all-questions.json
const filePath = path.join(__dirname, 'all-questions.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('🔧 Corrigiendo respuestas incorrectas de Rails...\n');

// Pregunta 5: ¿Qué son las migraciones en Rails?
data.rails[4].options = [
  {
    text: "Cambios versionados en la estructura de la base de datos (migraciones de schema)",
    isCorrect: true
  },
  {
    text: "Movimiento de archivos",
    isCorrect: false
  },
  {
    text: "Actualizaciones del framework",
    isCorrect: false
  },
  {
    text: "Cambios en las rutas",
    isCorrect: false
  }
];
console.log('✅ P5: Corregida - Nueva respuesta: "Cambios versionados en la estructura de la base de datos"');

// Pregunta 6: ¿Cómo se define una ruta en Rails?
data.rails[5].options = [
  {
    text: "En config/routes.rb",
    isCorrect: true
  },
  {
    text: "En el controlador",
    isCorrect: false
  },
  {
    text: "En el modelo",
    isCorrect: false
  },
  {
    text: "En la vista",
    isCorrect: false
  }
];
console.log('✅ P6: Corregida - Nueva respuesta: "En config/routes.rb"');

// Pregunta 13: ¿Qué es un helper en Rails?
data.rails[12].options = [
  {
    text: "Módulos con métodos auxiliares para vistas",
    isCorrect: true
  },
  {
    text: "Un tipo de controlador",
    isCorrect: false
  },
  {
    text: "Una validación especial",
    isCorrect: false
  },
  {
    text: "Un tipo de modelo",
    isCorrect: false
  }
];
console.log('✅ P13: Corregida - Nueva respuesta: "Módulos con métodos auxiliares para vistas"');

// Pregunta 16: ¿Qué archivo contiene la configuración de la base de datos en Rails?
data.rails[15].options = [
  {
    text: "config/database.yml",
    isCorrect: true
  },
  {
    text: "db.config",
    isCorrect: false
  },
  {
    text: "config/db.rb",
    isCorrect: false
  },
  {
    text: "database.json",
    isCorrect: false
  }
];
console.log('✅ P16: Corregida - Nueva respuesta: "config/database.yml"');

// Pregunta 17: ¿Qué es un partial en Rails?
data.rails[16].options = [
  {
    text: "Un fragmento de vista reutilizable",
    isCorrect: true
  },
  {
    text: "Un modelo incompleto",
    isCorrect: false
  },
  {
    text: "Una validación parcial",
    isCorrect: false
  },
  {
    text: "Un controlador auxiliar",
    isCorrect: false
  }
];
console.log('✅ P17: Corregida - Nueva respuesta: "Un fragmento de vista reutilizable"');

// Pregunta 40: ¿Qué es nested resources en Rails?
data.rails[39].options = [
  {
    text: "Rutas anidadas que reflejan relaciones entre recursos (por ejemplo, posts/:post_id/comments)",
    isCorrect: true
  },
  {
    text: "Un tipo de asociación",
    isCorrect: false
  },
  {
    text: "Un modelo anidado",
    isCorrect: false
  },
  {
    text: "Una validación compuesta",
    isCorrect: false
  }
];
console.log('✅ P40: Corregida - Nueva respuesta: "Rutas anidadas que reflejan relaciones entre recursos"');

// Pregunta 41: ¿Qué es un namespace en rutas Rails?
data.rails[40].options = [
  {
    text: "Agrupación de rutas bajo un mismo espacio de nombres",
    isCorrect: true
  },
  {
    text: "Una variable",
    isCorrect: false
  },
  {
    text: "Un tipo de controlador",
    isCorrect: false
  },
  {
    text: "Una configuración de base de datos",
    isCorrect: false
  }
];
console.log('✅ P41: Corregida - Nueva respuesta: "Agrupación de rutas bajo un mismo espacio de nombres"');

// Guardar el archivo actualizado
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('\n✅ Todas las correcciones de Rails han sido aplicadas exitosamente');
console.log('📊 Total de respuestas corregidas: 7');
