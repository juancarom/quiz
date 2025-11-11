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
  
  // Intentar generar explicación educativa basada en palabras clave de la pregunta
  const educationalExplanation = generateEducationalExplanation(question, questionLower, correctAnswers, topic);
  
  if (educationalExplanation) {
    return educationalExplanation;
  }
  
  // Fallback: explicación básica
  if (correctAnswers.length > 1) {
    return `Las respuestas correctas son: ${correctAnswers.map(a => `"${a}"`).join(' y ')}. ${getTopicContext(topic)}`;
  } else {
    return `${correctAnswers[0]} es la respuesta correcta. ${getTopicContext(topic)}`;
  }
}

function generateEducationalExplanation(question, questionLower, correctAnswers, topic) {
  // Explicaciones específicas por patrones en Ruby
  if (topic === 'ruby' || topic === 'practice') {
    if (questionLower.includes('attr_writer') || questionLower.includes('attr_reader') || questionLower.includes('attr_accessor')) {
      return 'En Ruby, attr_reader crea métodos de lectura (getter), attr_writer crea métodos de escritura (setter), y attr_accessor crea ambos. Estos métodos permiten acceder y modificar variables de instancia sin escribir métodos explícitos, simplificando el código de las clases.';
    }
    if (questionLower.includes('has_many') || questionLower.includes('asociación')) {
      return 'Una asociación has_many en Rails se define en un modelo para indicar que una instancia de ese modelo puede estar asociada con cero o más instancias de otro modelo. Esta relación típicamente requiere que el modelo asociado tenga una columna de clave foránea que apunte al modelo principal.';
    }
    if (questionLower.includes('select') && questionLower.includes('método')) {
      return 'El método select en Ruby filtra elementos de una colección según una condición. Itera sobre cada elemento y devuelve un nuevo array con solo aquellos elementos para los cuales el bloque retorna true. No modifica la colección original.';
    }
    if (questionLower.includes('map') && questionLower.includes('método')) {
      return 'El método map en Ruby transforma cada elemento de una colección aplicando un bloque. Devuelve un nuevo array con los resultados de la transformación, sin modificar el array original. Es fundamental para procesamiento de datos.';
    }
    if (questionLower.includes('each') && questionLower.includes('método')) {
      return 'El método each en Ruby itera sobre cada elemento de una colección ejecutando un bloque de código. Es el iterador más común y siempre devuelve la colección original, siendo útil para efectos secundarios como imprimir o modificar otros objetos.';
    }
    if (questionLower.includes('reduce') || questionLower.includes('sumar')) {
      return 'El método reduce (o inject) en Ruby acumula un valor iterando sobre una colección. Se utiliza frecuentemente para operaciones como sumar todos los elementos, encontrar el máximo, o construir estructuras de datos complejas a partir de colecciones.';
    }
    if (questionLower.includes('to_i') || questionLower.includes('integer') && questionLower.includes('conviert')) {
      return 'Tanto .to_i como Integer() convierten strings a enteros. to_i es más permisivo (devuelve 0 si falla), mientras que Integer() lanza una excepción si el string no es válido. Ambas son correctas según el caso de uso.';
    }
    if (questionLower.includes('lambda') || questionLower.includes('proc')) {
      return 'Tanto lambda como Proc crean bloques reutilizables en Ruby, pero con diferencias sutiles. Lambda verifica el número de argumentos estrictamente y return sale solo del lambda. Proc es más flexible con argumentos y return sale del método contenedor.';
    }
    if (questionLower.includes('gem')) {
      return 'Un Gem en Ruby es un paquete de código reutilizable que encapsula funcionalidad específica. Los gems permiten compartir bibliotecas y herramientas entre proyectos, facilitando el desarrollo al no tener que reinventar soluciones comunes.';
    }
    if (questionLower.includes('singleton')) {
      return 'Un método singleton en Ruby es un método que pertenece a un objeto específico en lugar de a una clase. Se define usando def objeto.metodo, permitiendo comportamiento único para instancias individuales sin afectar a otros objetos de la misma clase.';
    }
    if (questionLower.includes('symbol') || questionLower.includes('símbolo')) {
      return 'Los símbolos en Ruby son identificadores inmutables que comienzan con :. Son más eficientes que strings como claves de hash porque cada símbolo existe solo una vez en memoria, mientras que strings idénticos pueden ocupar múltiples espacios.';
    }
    if (questionLower.includes('block') || questionLower.includes('bloque')) {
      return 'Los bloques en Ruby son fragmentos de código que se pueden pasar a métodos. Se definen con {} para una línea o do...end para múltiples líneas. Los bloques reciben parámetros entre pipes (|param|) y son fundamentales para iteradores y callbacks.';
    }
    if (questionLower.includes('module') || questionLower.includes('módulo')) {
      return 'Los módulos en Ruby permiten compartir métodos entre clases mediante mixins. Se incluyen con include (métodos de instancia) o extend (métodos de clase). También sirven como namespaces para organizar código relacionado.';
    }
    if (questionLower.includes('undef') || questionLower.includes('elimina')) {
      return 'undef en Ruby elimina completamente la definición de un método, haciendo que deje de existir. A diferencia de establecer a nil o redefinir, undef garantiza que el método no puede ser llamado, ni siquiera desde clases padre.';
    }
    if (questionLower.includes('regex') || questionLower.includes('expresión regular')) {
      return 'El operador =~ en Ruby compara strings con expresiones regulares (regex). Devuelve la posición del primer match o nil si no hay coincidencia. Es fundamental para validaciones de formato, búsqueda de patrones y manipulación de texto.';
    }
    if (questionLower.includes('class_eval') || questionLower.includes('instance_eval')) {
      return 'class_eval y instance_eval permiten ejecutar código en el contexto de una clase u objeto. Son herramientas de metaprogramación que permiten definir métodos dinámicamente, acceder a variables de instancia y modificar comportamiento en tiempo de ejecución.';
    }
  }
  
  // Explicaciones específicas por patrones en NestJS
  if (topic === 'nestjs') {
    if (questionLower.includes('decorador')) {
      return 'Los decoradores en NestJS son anotaciones que añaden metadatos y funcionalidad a clases, métodos o parámetros. Utilizan la sintaxis @Nombre y son fundamentales para definir controladores, rutas, inyección de dependencias y validaciones.';
    }
    if (questionLower.includes('guard')) {
      return 'Los Guards en NestJS son clases que implementan la lógica de autorización. Se ejecutan antes que los controladores y determinan si una petición debe procesarse basándose en condiciones como autenticación, roles o permisos específicos.';
    }
    if (questionLower.includes('pipe')) {
      return 'Los Pipes en NestJS transforman o validan datos de entrada antes de que lleguen al controlador. Se usan comúnmente para conversión de tipos, validación de DTOs y sanitización de datos.';
    }
    if (questionLower.includes('módulo') || questionLower.includes('modulo')) {
      return 'Los módulos en NestJS organizan la aplicación en componentes cohesivos. Cada módulo agrupa controladores, servicios y otros providers relacionados, facilitando la modularidad y reutilización del código.';
    }
    if (questionLower.includes('dependency injection') || questionLower.includes('inyección de dependencias')) {
      return 'La inyección de dependencias es un patrón donde las dependencias se proporcionan a una clase en lugar de ser creadas por ella. NestJS usa este patrón para gestionar instancias, mejorar la testabilidad y desacoplar componentes.';
    }
  }
  
  // Explicaciones específicas por patrones en SQL
  if (topic === 'sql' || topic === 'mysql') {
    if (questionLower.includes('join')) {
      return 'Los JOINs combinan filas de dos o más tablas basándose en una columna relacionada. INNER JOIN devuelve solo las coincidencias, LEFT JOIN incluye todos los registros de la tabla izquierda, y RIGHT/FULL JOIN tienen comportamientos similares.';
    }
    if (questionLower.includes('index') || questionLower.includes('índice')) {
      return 'Los índices son estructuras de datos que mejoran la velocidad de las consultas al crear referencias rápidas a los datos. Aunque aceleran las búsquedas, consumen espacio adicional y pueden ralentizar las operaciones de escritura.';
    }
    if (questionLower.includes('group by')) {
      return 'GROUP BY agrupa filas que tienen valores iguales en columnas especificadas. Se usa comúnmente con funciones agregadas como COUNT, SUM, AVG para generar reportes y estadísticas resumidas.';
    }
    if (questionLower.includes('transaction') || questionLower.includes('transacción')) {
      return 'Las transacciones agrupan múltiples operaciones SQL en una unidad atómica. Si alguna operación falla, todas se revierten (ROLLBACK), garantizando la integridad de los datos. Si todas tienen éxito, se confirman con COMMIT.';
    }
    if (questionLower.includes('primary key') || questionLower.includes('clave primaria')) {
      return 'Una clave primaria es una columna o conjunto de columnas que identifica de forma única cada fila de una tabla. No puede contener valores NULL y cada valor debe ser único, siendo fundamental para la integridad referencial.';
    }
  }
  
  // Explicaciones específicas por patrones en Docker
  if (topic === 'docker') {
    if (questionLower.includes('contenedor')) {
      return 'Los contenedores Docker son instancias en ejecución de imágenes. Encapsulan aplicaciones con sus dependencias, garantizando consistencia entre diferentes entornos. Son livianos porque comparten el kernel del sistema operativo host.';
    }
    if (questionLower.includes('imagen')) {
      return 'Las imágenes Docker son plantillas inmutables que contienen el código de la aplicación, runtime, bibliotecas y dependencias. Se construyen por capas, permitiendo reutilización eficiente y versionado mediante tags.';
    }
    if (questionLower.includes('volumen')) {
      return 'Los volúmenes Docker persisten datos más allá del ciclo de vida de los contenedores. Permiten compartir datos entre contenedores y facilitan backups. Son gestionados por Docker y son independientes del sistema de archivos del host.';
    }
    if (questionLower.includes('dockerfile')) {
      return 'Un Dockerfile es un script con instrucciones para construir una imagen Docker. Define el sistema operativo base, copia archivos, instala dependencias y configura el entorno de ejecución de la aplicación.';
    }
  }
  
  // Explicaciones específicas por patrones en MongoDB
  if (topic === 'mongodb') {
    if (questionLower.includes('documento')) {
      return 'Los documentos en MongoDB son estructuras de datos similares a JSON (BSON) que almacenan información de forma flexible. Cada documento puede tener campos diferentes, permitiendo esquemas dinámicos sin necesidad de migraciones.';
    }
    if (questionLower.includes('colección') || questionLower.includes('coleccion')) {
      return 'Las colecciones en MongoDB son grupos de documentos, equivalentes a tablas en bases de datos relacionales. No requieren un esquema fijo, permitiendo almacenar documentos con diferentes estructuras en la misma colección.';
    }
    if (questionLower.includes('agregación') || questionLower.includes('aggregation')) {
      return 'El pipeline de agregación en MongoDB procesa documentos en etapas secuenciales para transformar y analizar datos. Permite operaciones como filtrado, agrupamiento, cálculos y ordenamiento de forma eficiente.';
    }
  }
  
  // Explicaciones específicas por patrones en POO
  if (topic === 'poo') {
    if (questionLower.includes('herencia')) {
      return 'La herencia permite crear nuevas clases basadas en clases existentes, reutilizando y extendiendo su funcionalidad. La clase hija hereda atributos y métodos de la clase padre, pudiendo agregar o sobrescribir comportamiento.';
    }
    if (questionLower.includes('polimorfismo')) {
      return 'El polimorfismo permite que objetos de diferentes clases respondan al mismo mensaje de forma única. Facilita código flexible y extensible, donde una interfaz común puede tener múltiples implementaciones específicas.';
    }
    if (questionLower.includes('encapsulación') || questionLower.includes('encapsulacion')) {
      return 'La encapsulación oculta los detalles internos de implementación, exponiendo solo interfaces públicas. Protege los datos mediante modificadores de acceso (public, private, protected) y promueve el principio de bajo acoplamiento.';
    }
    if (questionLower.includes('abstracción') || questionLower.includes('abstraccion')) {
      return 'La abstracción simplifica la complejidad modelando clases según características esenciales. Las clases abstractas e interfaces definen contratos que las clases concretas deben cumplir, separando qué se hace de cómo se hace.';
    }
  }
  
  // Explicaciones específicas por patrones en AWS
  if (topic === 'aws') {
    if (questionLower.includes('ec2')) {
      return 'EC2 (Elastic Compute Cloud) proporciona servidores virtuales escalables en la nube. Permite elegir tipos de instancia según necesidades de CPU, memoria y almacenamiento, pagando solo por el tiempo de uso.';
    }
    if (questionLower.includes('s3')) {
      return 'S3 (Simple Storage Service) es un servicio de almacenamiento de objetos altamente escalable y duradero. Ofrece 99.999999999% de durabilidad, ideal para backups, hosting de archivos estáticos y data lakes.';
    }
    if (questionLower.includes('lambda')) {
      return 'AWS Lambda ejecuta código sin gestionar servidores (serverless). El código se ejecuta en respuesta a eventos, escalando automáticamente y cobrando solo por el tiempo de ejecución en milisegundos.';
    }
    if (questionLower.includes('rds')) {
      return 'RDS (Relational Database Service) gestiona bases de datos relacionales en la nube. Automatiza tareas como backups, parches y escalado, soportando múltiples motores como MySQL, PostgreSQL y SQL Server.';
    }
  }
  
  // Explicaciones específicas por patrones en GraphQL
  if (topic === 'graphql') {
    if (questionLower.includes('query')) {
      return 'Las queries en GraphQL permiten solicitar exactamente los datos necesarios, evitando over-fetching o under-fetching. El cliente especifica la estructura deseada y el servidor responde con datos en ese formato.';
    }
    if (questionLower.includes('mutation')) {
      return 'Las mutations en GraphQL modifican datos en el servidor. Son equivalentes a operaciones POST, PUT, PATCH y DELETE en REST, pero con la ventaja de poder solicitar datos específicos en la respuesta.';
    }
    if (questionLower.includes('schema')) {
      return 'El schema de GraphQL es un contrato que define todos los tipos de datos disponibles y las operaciones permitidas. Proporciona documentación automática y validación de tipos en tiempo de desarrollo.';
    }
    if (questionLower.includes('resolver')) {
      return 'Los resolvers en GraphQL son funciones que recuperan los datos para cada campo. Determinan cómo y de dónde obtener los datos, pudiendo consultar bases de datos, APIs externas u otras fuentes.';
    }
  }
  
  return null; // No se encontró patrón específico
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
    'practice': 'Esta pregunta evalúa conocimientos prácticos de programación.'
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
