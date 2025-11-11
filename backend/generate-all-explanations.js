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
    // Generar explicación más completa basada en la respuesta correcta
    return generateCompleteExplanation(correctAnswers[0], question, topic);
  }
}

function generateCompleteExplanation(answer, question, topic) {
  const answerLower = answer.toLowerCase();
  const questionLower = question.toLowerCase();
  
  // Intentar extraer el concepto principal de la respuesta
  let explanation = '';
  
  // Para Ruby/Rails
  if (topic === 'ruby' || topic === 'rails' || topic === 'practice') {
    if (answerLower.includes('@')) {
      explanation = `Las variables de instancia en Ruby se definen con @ al inicio. Estas variables pertenecen a cada instancia de la clase y mantienen su valor durante toda la vida del objeto. Son privadas por defecto y se acceden mediante métodos getter/setter o attr_accessor.`;
    } else if (answerLower.includes('def ')) {
      explanation = `En Ruby, los métodos se definen con la palabra clave 'def'. ${answer} es la sintaxis correcta. Los métodos encapsulan comportamiento reutilizable y pueden recibir parámetros y retornar valores.`;
    } else if (answerLower.includes('class ') && answerLower.includes('<')) {
      explanation = `La herencia en Ruby se define usando el operador <. ${answer} indica que la clase hereda de otra, obteniendo acceso a sus métodos y atributos. Esto permite reutilizar código y crear jerarquías de clases.`;
    } else if (answerLower.includes('join')) {
      explanation = `El método join en Ruby convierte los elementos de un array en un string, uniéndolos con un separador especificado. Es muy útil para formatear listas y crear strings a partir de colecciones.`;
    } else if (answerLower.includes('split')) {
      explanation = `El método split en Ruby divide un string en un array de substrings basándose en un delimitador. Es el complemento de join y es fundamental para parsear texto.`;
    } else if (answerLower.includes('map')) {
      explanation = `El método map en Ruby transforma cada elemento de una colección aplicando un bloque. Devuelve un nuevo array con los resultados, siendo esencial para procesamiento de datos funcional.`;
    } else if (answerLower.includes('select')) {
      explanation = `El método select en Ruby filtra elementos de una colección según una condición. Devuelve un nuevo array con los elementos que cumplen el criterio del bloque.`;
    } else if (answerLower.includes('each')) {
      explanation = `El método each en Ruby itera sobre cada elemento de una colección ejecutando un bloque. Es el iterador fundamental y siempre devuelve la colección original.`;
    } else if (answerLower.includes('reduce') || answerLower.includes('inject')) {
      explanation = `El método reduce (o inject) en Ruby acumula valores iterando sobre una colección. Es perfecto para sumar elementos, encontrar máximos o construir estructuras complejas.`;
    } else if (answerLower.includes('push') || answerLower.includes('<<')) {
      explanation = `${answer} agrega elementos al final de un array en Ruby. Modifica el array original y es muy eficiente para construir colecciones dinámicamente.`;
    } else if (answerLower.includes('pop') || answerLower.includes('shift') || answerLower.includes('unshift')) {
      explanation = `${answer} manipula arrays en Ruby. pop elimina el último elemento, shift el primero, y unshift agrega al inicio. Son fundamentales para estructuras de datos como pilas y colas.`;
    } else if (answerLower.includes('to_i') || answerLower.includes('to_s') || answerLower.includes('to_f') || answerLower.includes('to_a')) {
      explanation = `Los métodos de conversión como ${answer} transforman objetos entre tipos en Ruby. to_i convierte a entero, to_s a string, to_f a flotante, y to_a a array.`;
    } else if (answerLower.includes('.')) {
      explanation = `${answer} es un método en Ruby. Los métodos se invocan sobre objetos usando el operador punto (.). Este método permite realizar operaciones específicas sobre el objeto que lo contiene.`;
    } else if (answerLower.includes(':')) {
      explanation = `Los símbolos en Ruby (que comienzan con :) son identificadores inmutables más eficientes que strings. ${answer} es la forma correcta. Se usan comúnmente como claves de hash y para representar nombres o estados.`;
    } else {
      explanation = `${answer} es la respuesta correcta en Ruby. Ruby es un lenguaje dinámico y orientado a objetos que prioriza la legibilidad y productividad del desarrollador.`;
    }
  }
  
  // Para NestJS
  else if (topic === 'nestjs') {
    if (answerLower.includes('@')) {
      explanation = `${answer} es un decorador de NestJS. Los decoradores son anotaciones que modifican el comportamiento de clases, métodos o parámetros, añadiendo funcionalidad como routing, validación o inyección de dependencias.`;
    } else if (answerLower.includes('service') || answerLower.includes('provider')) {
      explanation = `${answer} es un concepto clave en NestJS. Los servicios encapsulan la lógica de negocio y se inyectan en controladores mediante Dependency Injection, promoviendo código modular y testeable.`;
    } else if (answerLower.includes('module') || answerLower.includes('módulo')) {
      explanation = `${answer} relacionado con módulos de NestJS. Los módulos organizan la aplicación en componentes cohesivos, agrupando controladores, servicios y otros providers relacionados.`;
    } else {
      explanation = `${answer} es la respuesta correcta en NestJS. NestJS es un framework de Node.js que usa TypeScript y sigue principios de arquitectura similar a Angular.`;
    }
  }
  
  // Para SQL/MySQL
  else if (topic === 'sql' || topic === 'mysql') {
    if (answerLower.includes('select')) {
      explanation = `SELECT es el comando fundamental de SQL para consultar datos. ${answer} permite especificar qué columnas recuperar y de qué tablas. Es la base de todas las operaciones de lectura en bases de datos relacionales.`;
    } else if (answerLower.includes('join')) {
      explanation = `${answer} es un tipo de JOIN en SQL. Los JOINs combinan datos de múltiples tablas basándose en relaciones entre columnas, permitiendo consultas complejas que relacionan información distribuida.`;
    } else if (answerLower.includes('index')) {
      explanation = `${answer} se relaciona con índices en bases de datos. Los índices son estructuras que aceleran las búsquedas creando referencias rápidas a los datos, mejorando significativamente el rendimiento de las consultas.`;
    } else if (answerLower.includes('primary') || answerLower.includes('foreign')) {
      explanation = `${answer} define una relación de clave en SQL. Las claves son fundamentales para la integridad referencial, asegurando que las relaciones entre tablas se mantengan consistentes.`;
    } else {
      explanation = `${answer} es la respuesta correcta en SQL. SQL es el lenguaje estándar para gestionar bases de datos relacionales, usado universalmente para consultar y manipular datos estructurados.`;
    }
  }
  
  // Para Docker
  else if (topic === 'docker') {
    if (answerLower.includes('docker')) {
      explanation = `${answer} es un comando de Docker. Docker permite empaquetar aplicaciones en contenedores ligeros y portables, garantizando que funcionen consistentemente en cualquier entorno.`;
    } else if (answerLower.includes('image') || answerLower.includes('imagen')) {
      explanation = `Las imágenes Docker son plantillas inmutables. ${answer} describe correctamente cómo funcionan. Las imágenes se construyen por capas y contienen todo lo necesario para ejecutar una aplicación.`;
    } else if (answerLower.includes('container') || answerLower.includes('contenedor')) {
      explanation = `Los contenedores son instancias ejecutables de imágenes. ${answer} explica su funcionamiento. Los contenedores comparten el kernel del sistema pero están aislados entre sí.`;
    } else {
      explanation = `${answer} es correcto en el contexto de Docker. Docker revolucionó el desarrollo y despliegue de aplicaciones mediante la containerización.`;
    }
  }
  
  // Para MongoDB
  else if (topic === 'mongodb') {
    if (answerLower.includes('document') || answerLower.includes('documento')) {
      explanation = `${answer} describe documentos en MongoDB. Los documentos son estructuras flexibles similares a JSON que permiten almacenar datos sin un esquema rígido, facilitando la evolución de la aplicación.`;
    } else if (answerLower.includes('collection') || answerLower.includes('colección')) {
      explanation = `${answer} se refiere a colecciones en MongoDB. Las colecciones agrupan documentos relacionados pero sin requerir que todos tengan la misma estructura, ofreciendo flexibilidad en el modelado de datos.`;
    } else if (answerLower.includes('aggregate') || answerLower.includes('agregación')) {
      explanation = `${answer} describe operaciones de agregación. El pipeline de agregación en MongoDB procesa documentos a través de etapas para transformar, filtrar y analizar datos de forma eficiente.`;
    } else {
      explanation = `${answer} es la respuesta correcta para MongoDB. MongoDB es una base de datos NoSQL orientada a documentos, ideal para aplicaciones que requieren flexibilidad en el esquema.`;
    }
  }
  
  // Para POO
  else if (topic === 'poo') {
    if (answerLower.includes('herencia')) {
      explanation = `${answer} describe la herencia en POO. La herencia permite crear jerarquías de clases donde las clases hijas heredan comportamiento de las padres, promoviendo la reutilización de código.`;
    } else if (answerLower.includes('polimorfismo')) {
      explanation = `${answer} explica el polimorfismo. Este principio permite que diferentes clases respondan al mismo mensaje de forma única, facilitando código flexible y extensible.`;
    } else if (answerLower.includes('encapsul')) {
      explanation = `${answer} define la encapsulación. Este principio oculta los detalles internos de implementación, exponiendo solo interfaces públicas y protegiendo la integridad de los datos.`;
    } else if (answerLower.includes('abstrac')) {
      explanation = `${answer} describe la abstracción. Este principio simplifica la complejidad modelando solo las características esenciales, separando qué hace algo de cómo lo hace.`;
    } else {
      explanation = `${answer} es correcto en Programación Orientada a Objetos. POO organiza el código en objetos que combinan datos y comportamiento, facilitando el diseño de sistemas complejos.`;
    }
  }
  
  // Para AWS
  else if (topic === 'aws') {
    if (answerLower.includes('ec2')) {
      explanation = `${answer} describe EC2. Este servicio proporciona servidores virtuales escalables en la nube, permitiendo ejecutar aplicaciones con la capacidad de cómputo exacta que se necesita.`;
    } else if (answerLower.includes('s3')) {
      explanation = `${answer} explica S3. Este servicio de almacenamiento de objetos es altamente escalable y duradero, ideal para almacenar cualquier tipo de datos desde backups hasta archivos multimedia.`;
    } else if (answerLower.includes('lambda')) {
      explanation = `${answer} describe AWS Lambda. Este servicio serverless ejecuta código en respuesta a eventos sin necesidad de gestionar servidores, cobrando solo por el tiempo de ejecución.`;
    } else {
      explanation = `${answer} es correcto para AWS. Amazon Web Services es la plataforma de servicios en la nube más completa, ofreciendo cientos de servicios para compute, storage, bases de datos y más.`;
    }
  }
  
  // Para GraphQL
  else if (topic === 'graphql') {
    if (answerLower.includes('query')) {
      explanation = `${answer} describe queries en GraphQL. Las queries permiten solicitar exactamente los datos necesarios en una sola petición, evitando problemas de over-fetching o under-fetching comunes en REST.`;
    } else if (answerLower.includes('mutation')) {
      explanation = `${answer} explica mutations. Las mutations modifican datos en el servidor, permitiendo crear, actualizar o eliminar información mientras se puede solicitar datos específicos en la respuesta.`;
    } else if (answerLower.includes('schema')) {
      explanation = `${answer} describe el schema de GraphQL. El schema es un contrato que define todos los tipos disponibles y operaciones permitidas, proporcionando documentación automática y validación.`;
    } else {
      explanation = `${answer} es correcto para GraphQL. GraphQL es un lenguaje de consulta que permite al cliente especificar exactamente qué datos necesita, mejorando la eficiencia de las APIs.`;
    }
  }
  
  // Fallback genérico mejorado
  else {
    explanation = `${answer} es la respuesta correcta. Esta opción representa el concepto o implementación adecuada para esta pregunta en el contexto de ${topic}.`;
  }
  
  return explanation;
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
