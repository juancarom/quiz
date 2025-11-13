const fs = require('fs');

// Todas las explicaciones de MongoDB (preguntas 1-84)
const mongodbExplanations = {
  1: `MongoDB es una base de datos NoSQL **orientada a documentos**, donde cada registro es un documento similar a JSON. Esto permite esquemas flexibles (sin columnas fijas como en SQL) y facilita evolucionar la estructura de datos sin migraciones complejas.`,
  
  2: `Internamente MongoDB almacena los documentos en **BSON (Binary JSON)**, un formato binario inspirado en JSON. BSON soporta más tipos de datos (como \`Date\`, \`ObjectId\`, binarios, etc.) y es más eficiente para almacenamiento y transporte que texto plano JSON.`,
  
  3: `Una **colección** es un grupo de documentos, parecido a una tabla en SQL pero **sin esquema rígido**. En la misma colección podés tener documentos con distintos campos, lo que da mucha flexibilidad para iterar sobre el modelo de datos.`,
  
  4: `Un **documento** es la unidad básica de datos en MongoDB: una estructura similar a JSON con pares clave–valor. Puede incluir tipos simples, arrays y documentos embebidos, lo que permite representar estructuras complejas en un solo registro.`,
  
  5: `\`db.coleccion.insertOne()\` inserta **un solo documento**, mientras que \`insertMany()\` inserta **varios documentos de una vez**. Ambos reciben objetos (o arrays de objetos) en formato similar a JSON y devuelven información sobre la operación (IDs, estado, etc.).`,
  
  6: `\`db.coleccion.find()\` se usa para **consultar documentos** de una colección. Acepta un filtro (query) en forma de objeto, y opcionalmente una proyección para indicar qué campos devolver, muy similar a un \`SELECT ... WHERE\` en SQL.`,
  
  7: `\`db.coleccion.updateOne()\` actualiza **el primer documento que cumple el filtro**, mientras que \`updateMany()\` actualiza **todos los que coinciden**. Se combinan con operadores como \`$set\`, \`$inc\`, etc., para modificar solo los campos necesarios.`,
  
  8: `\`db.coleccion.deleteOne()\` elimina **un solo documento** que cumpla la condición, y \`deleteMany()\` elimina **todos los documentos** que cumplan con el filtro. Es importante usar filtros precisos para evitar borrar más datos de los deseados.`,
  
  9: `El campo \`_id\` es la **clave primaria** de cada documento y es único dentro de la colección. Si no lo especificás al insertar, MongoDB genera automáticamente un \`ObjectId\`, que sirve para identificar y buscar el documento de forma eficiente.`,
  
  10: `Un **índice** es una estructura adicional que MongoDB mantiene para **acelerar las consultas** sobre uno o varios campos. A cambio de algo más de espacio en disco y costo en escrituras, las búsquedas y ordenamientos sobre esos campos se vuelven mucho más rápidas.`,
  
  11: `\`db.coleccion.createIndex()\` crea un índice sobre uno o más campos, por ejemplo:\n\`db.users.createIndex({ email: 1 })\`.\n\nEl \`1\` indica orden ascendente (también existe \`-1\` para descendente); después de crearlo, las consultas que filtren u ordenen por ese campo se aceleran.`,
  
  12: `El **aggregation pipeline** es un framework donde los documentos pasan por **etapas encadenadas** (\`$match\`, \`$group\`, \`$project\`, etc.) para transformarse. Permite hacer reportes, estadísticas, joins simples y transformaciones complejas directamente en la base.`,
  
  13: `En el pipeline de agregación, \`$match\` cumple el rol de **filtrar documentos**, similar a un \`WHERE\` en SQL. Se suele poner al inicio para reducir la cantidad de datos que pasan por las siguientes etapas y así mejorar el rendimiento.`,
  
  14: `\`$group\` se usa para **agrupar documentos** según uno o más campos y calcular agregados (sumas, conteos, promedios, etc.). Es el equivalente a \`GROUP BY\` en SQL dentro del aggregation pipeline.`,
  
  15: `Un **replica set** es un grupo de instancias de MongoDB donde una actúa como **primaria** y las demás como **secundarias**, todas con los mismos datos. Esto proporciona alta disponibilidad: si el primario cae, una secundaria puede ser elegida como nuevo primario.`,
  
  16: `El **sharding** distribuye los datos de una colección en **múltiples servidores (shards)** usando una clave de partición. Así se logra escalabilidad horizontal: más máquinas para manejar más volumen de datos y más carga de consultas/escrituras.`,
  
  17: `\`show dbs\` o \`show databases\` en el shell muestran **todas las bases de datos** existentes en la instancia. Es útil para ver rápidamente qué bases están creadas y cuánto espacio ocupa cada una.`,
  
  18: `El comando \`use nombre\` selecciona la base de datos con ese nombre y, si no existe todavía, se creará cuando insertes datos. A partir de ese momento, cualquier operación \`db.coleccion...\` se ejecuta sobre esa base.`,
  
  19: `\`show collections\` lista **todas las colecciones** de la base de datos actualmente seleccionada. Es similar a listar tablas en una base de datos relacional.`,
  
  20: `Un **embedded document** es un documento **anidado dentro de otro documento** como valor de un campo. Esto permite modelar relaciones "contiene a" (por ejemplo, dirección dentro de usuario) sin tener que hacer joins, aprovechando la naturaleza documental de MongoDB.`,
  
  21: `\`db.coleccion.countDocuments()\` devuelve el **número de documentos** que cumplen un filtro determinado (o todos, si no se pasa filtro). Es útil para estadísticas, paginación y validaciones (por ejemplo, saber cuántos registros existen de cierto tipo).`,
  
  22: `El operador \`$in\` busca documentos donde un campo esté **contenido en una lista de valores**. Por ejemplo, \`{ status: { $in: ["active", "pending"] } }\` devuelve documentos cuyo \`status\` sea cualquiera de esos valores.`,
  
  23: `**MongoDB Atlas** es el servicio de **MongoDB gestionado en la nube (DBaaS)**. Se encarga de provisionar clusters, backups, escalado, monitoreo y seguridad, para que vos solo te preocupes por usar la base de datos y no por administrarla.`,
  
  24: `Por defecto, MongoDB ofrece **consistencia eventual** en lecturas desde réplicas, pero puede garantizar **semánticas ACID** en transacciones multi-documento (en replica sets y clusters sharded). Con read/write concern adecuados podés ajustar el equilibrio entre rendimiento y consistencia.`,
  
  25: `**Mongoose** es un **ODM (Object Document Mapper)** para Node.js que agrega una capa de modelos, esquemas, validación y hooks sobre MongoDB. Ayuda a definir estructuras de datos más rígidas y a trabajar con documentos como objetos de JavaScript.`,
  
  26: `Operadores como \`$gt\` (greater than) y \`$lt\` (less than) se usan para **comparaciones numéricas o de fechas**. Por ejemplo: \`{ age: { $gt: 18, $lt: 65 } }\` busca documentos donde \`age\` esté en ese rango.`,
  
  27: `\`$and\` permite combinar varias condiciones donde **todas deben cumplirse**. Aunque muchas veces se puede omitir (MongoDB aplica \`AND\` implícito entre campos), es útil cuando necesitás combinar expresiones más complejas.`,
  
  28: `\`$or\` combina condiciones donde **basta con que una de ellas sea verdadera**. Por ejemplo: \`{ $or: [ { role: "admin" }, { isSuperUser: true } ] }\` devuelve documentos que cumplan al menos una de esas reglas.`,
  
  29: `Operadores de array como \`$pull\` y \`$addToSet\` permiten **modificar arrays dentro de documentos**. \`$pull\` elimina elementos que cumplan una condición, y \`$addToSet\` agrega un elemento solo si aún no existe, evitando duplicados.`,
  
  30: `\`$push\` **agrega un elemento al final de un array**. Por ejemplo, \`{ $push: { tags: "nuevo" } }\` añade \`"nuevo"\` al array \`tags\`. Se puede combinar con modificadores como \`$each\`, \`$position\` y \`$sort\` para operaciones más avanzadas.`,
  
  31: `\`$pull\` **elimina del array todos los elementos** que cumplan la condición dada. Es muy útil para quitar valores específicos o elementos que coincidan con un subdocumento sin tener que reconstruir el array completo.`,
  
  32: `\`$addToSet\` agrega un elemento a un array **solo si aún no está presente**, tratándolo como un conjunto (set). Esto evita duplicados de forma atómica, algo difícil de garantizar solo desde la lógica de aplicación.`,
  
  33: `La **projection** define **qué campos se devuelven** en los resultados de \`find\`. Podés incluir solo los campos necesarios o excluir los que no quieras, reduciendo el tamaño de respuesta y protegiendo información sensible.`,
  
  34: `Para excluir un campo en la proyección se usa \`{ campo: false }\` o \`{ campo: 0 }\`. Por ejemplo: \`db.users.find({}, { password: 0 })\` devuelve todos los usuarios pero sin el campo \`password\`.`,
  
  35: `En el aggregation pipeline, \`$lookup\` permite hacer una operación similar a un **LEFT JOIN entre colecciones**. Se usa para combinar datos relacionados que están en diferentes colecciones sin necesidad de hacerlo manualmente desde la aplicación.`,
  
  36: `\`$unwind\` **deconstruye un array** en múltiples documentos, creando un documento por cada elemento del array. Es clave cuando querés tratar cada elemento de un array embebido como una fila independiente en el pipeline de agregación.`,
  
  37: `\`$project\` sirve para **remodelar los documentos** dentro del pipeline: incluir/excluir campos, renombrarlos o crear campos calculados. Es el equivalente a elegir columnas y expresiones en un \`SELECT\` de SQL.`,
  
  38: `\`$sort\` ordena los documentos del pipeline por uno o más campos, usando \`1\` para ascendente y \`-1\` para descendente. Es muy útil en reportes y listados donde necesitás un orden específico en la salida.`,
  
  39: `Etapas como \`$group\` y \`$project\` son parte del **conjunto de stages del aggregation pipeline**. Combinándolas (junto a \`$match\`, \`$sort\`, \`$unwind\`, etc.) podés construir consultas analíticas muy potentes directamente en MongoDB.`,
  
  40: `\`$limit\` restringe la salida del pipeline a **un número máximo de documentos**. Es útil para paginación, muestreo de datos o para evitar procesar y devolver más registros de los necesarios.`,
  
  41: `\`$skip\` **omite un número de documentos** al inicio del pipeline. Normalmente se usa junto con \`$limit\` para implementar paginación: por ejemplo, saltar los primeros 20 y devolver los siguientes 10.`,
  
  42: `\`$count\` agrega al pipeline una etapa que **cuenta cuántos documentos** pasan hasta ese punto y devuelve un solo documento con ese valor. Es equivalente a un \`COUNT(*)\` filtrado con las stages anteriores.`,
  
  43: `El **write concern** define **qué nivel de confirmación** se requiere para considerar una escritura exitosa. Por ejemplo, esperar solo confirmación del primario o de la mayoría de los miembros del replica set, impactando en el balance entre seguridad y rendimiento.`,
  
  44: `Valores como \`w: 1\` (confirmado por el primario) o \`w: "majority"\` (confirmado por la mayoría de los nodos) son niveles de write concern. Cuanto más alto el nivel, más garantizada está la persistencia de la escritura, pero también mayor la latencia.`,
  
  45: `El **read concern** controla **qué tan "frescos" y consistentes** deben ser los datos leídos. Por ejemplo, podés permitir lecturas que aún no han sido replicadas completamente o exigir solo datos confirmados por la mayoría.`,
  
  46: `Niveles como \`majority\` o \`linearizable\` indican cuánta **consistencia** se exige al leer. \`majority\` asegura que los datos han sido confirmados por la mayoría del replica set, y \`linearizable\` garantiza la vista más fuerte y actual posible (a costa de rendimiento).`,
  
  47: `El **read preference** indica **de qué miembro del replica set** deben realizarse las lecturas: solo del primario, de secundarios, o estrategias mixtas. Esto permite balancear carga y decidir si priorizar consistencia o disponibilidad/rendimiento.`,
  
  48: `Opciones como \`primaryPreferred\` y \`secondary\` son distintos modos de read preference. \`primaryPreferred\` lee del primario salvo que no esté disponible, y \`secondary\` envía lecturas a secundarios para aligerar al primario.`,
  
  49: `Un **índice compuesto** incluye **más de un campo**, por ejemplo \`{ lastName: 1, firstName: 1 }\`. Es útil cuando las consultas filtran u ordenan por varias columnas en conjunto, mejorando el rendimiento de esas combinaciones.`,
  
  50: `Un **índice de texto** permite hacer **búsquedas de texto completo** sobre uno o varios campos de tipo string. Soporta búsqueda por palabras, lenguaje natural y relevancia, ideal para campos como títulos, descripciones, comentarios, etc.`,
  
  51: `Para crear un índice de texto se usa algo como:\n\`db.coleccion.createIndex({ campo: "text" })\`.\n\nLa idea es declarar qué campo(s) deben tratarse como texto indexado, para luego poder usar consultas con \`$text\` y \`$search\`.`,
  
  52: `Un **índice geoespacial** permite hacer **consultas basadas en ubicación** (puntos, polígonos, distancias). Se usa sobre campos que guardan coordenadas y habilita operaciones como "lugares cerca de mí" o "dentro de un área".`,
  
  53: `Tipos como \`2dsphere\` y \`geoHaystack\` son índices geoespaciales:\n\n* \`2dsphere\` soporta coordenadas en la Tierra (lat/long, GeoJSON).\n* \`geoHaystack\` se pensó para búsquedas por cercanía en áreas pequeñas (aunque hoy se usa mucho más \`2dsphere\`).`,
  
  54: `Un **TTL index (Time To Live)** hace que MongoDB **elimine documentos automáticamente** después de cierto tiempo, basándose en un campo de fecha. Es ideal para logs, sesiones, tokens y datos que caducan.`,
  
  55: `Una **capped collection** es una colección de **tamaño fijo** que, al llenarse, empieza a **sobrescribir los documentos más antiguos**. Mantiene el orden de inserción y no permite borrar documentos individuales, por eso se usa para logs o buffers.`,
  
  56: `Las capped collections se usan para **caches y datos de alta inserción** donde solo importa mantener los registros más recientes. Son muy eficientes para escrituras secuenciales y para escenarios tipo "stream de eventos".`,
  
  57: `\`ObjectId\` es un tipo de dato especial de 12 bytes que MongoDB utiliza normalmente para el campo \`_id\`. Es único, compacto y se puede generar de forma distribuida sin colisiones, ideal como identificador de documentos.`,
  
  58: `Un \`ObjectId\` incluye, entre otras cosas, un **timestamp**, un identificador de **máquina** y de **proceso**, más un contador. Gracias a eso, es único e incremental en el tiempo, lo que facilita ordenar y generar IDs sin coordinar entre nodos.`,
  
  59: `**JSON** es un formato de texto legible por humanos, mientras que **BSON** es su versión **binaria y extendida**, más eficiente para almacenamiento y transmisión. BSON agrega tipos extra (como fechas y binarios) que JSON puro no define.`,
  
  60: `BSON soporta tipos adicionales como **Binary Data** y **ObjectId**, además de otros (Date, Decimal128, etc.). Esto le permite representar de forma nativa datos que en JSON tendrías que emular con strings o formatos custom.`,
  
  61: `La opción **upsert** en una operación de actualización hace que MongoDB **actualice el documento si existe o lo inserte si no existe**. Es decir, combina "update" y "insert" en una sola operación atómica basada en el filtro.`,
  
  62: `\`bulkWrite\` ejecuta **múltiples operaciones de escritura en lote** (insert, update, delete) en una sola llamada. Eso reduce el round-trip con el servidor y puede mejorar mucho el rendimiento en cargas masivas de datos.`,
  
  63: `En \`bulkWrite\` podés incluir operaciones como \`updateOne\`, \`deleteOne\`, \`insertOne\`, etc., en un array. Cada una se ejecuta siguiendo el orden definido, y al final recibís un resumen de cuántos documentos se modificaron, insertaron o borraron.`,
  
  64: `Los **change streams** permiten **escuchar en tiempo real los cambios** que ocurren en una colección, base o cluster. Se basan en el oplog y son ideales para disparar procesos de auditoría, sincronización o notificaciones cuando se modifican datos.`,
  
  65: `Con change streams podés implementar fácilmente **auditoría** (registrar quién cambió qué) y **sincronización** (mantener caches, buscadores o otros sistemas actualizados). Evitan tener que hacer polling continuo sobre la base de datos.`,
  
  66: `Una **session** en MongoDB es un contexto que agrupa operaciones, especialmente útil para **transacciones multi-documento**. Todas las operaciones dentro de la sesión comparten ciertos metadatos y se pueden confirmar o deshacer juntas.`,
  
  67: `Las **transacciones** permiten ejecutar **múltiples operaciones (y documentos) con propiedades ACID**: o se aplican todas o ninguna. Desde MongoDB 4.0 esto es posible en replica sets, y desde 4.2 también en clusters sharded.`,
  
  68: `El **oplog** (operations log) es un log especial en los replica sets que **registra todas las operaciones de escritura** realizadas en el primario. Las secundarias lo leen y aplican para mantenerse sincronizadas con el primario.`,
  
  69: `Un **secondary** es un miembro del replica set que **replica los datos del primario** leyendo del oplog. Puede servir para lecturas (según read preference) y entrar a ser primario si gana una elección tras la caída del actual primario.`,
  
  70: `Un **arbiter** es un miembro del replica set que **solo participa en las votaciones**, pero no almacena datos. Se usa para mantener un número impar de votos y evitar empates sin necesidad de añadir más nodos con datos completos.`,
  
  71: `Se utiliza un arbiter cuando necesitás **un número impar de votos** para elecciones de primario, pero no querés asumir el costo de almacenamiento de otro nodo completo. Aporta quorum sin aumentar capacidad de datos.`,
  
  72: `La propiedad **priority** de un miembro del replica set indica **qué tan probable es que sea elegido primario**. Nodos con mayor priority serán preferidos como primarios, lo que permite controlar cuál nodo debería liderar normalmente.`,
  
  73: `Un **hidden member** es un secondary que **no es visible para los clientes y no puede ser elegido primario**. Se suele usar para tareas especiales como reportes, backups o analytics, evitando impactar en el tráfico normal de la aplicación.`,
  
  74: `Un **delayed member** es un secondary configurado con un **retraso intencional** en la replicación. Sirve como "máquina del tiempo" para recuperar el estado de la base antes de un error lógico (por ejemplo, un borrado masivo accidental).`,
  
  75: `La **shard key** es el campo (o conjunto de campos) que se usa para **particionar los datos entre shards**. Una buena shard key es crítica para repartir la carga y evitar nodos sobrecargados.`,
  
  76: `Elegir una buena shard key implica lograr **buena distribución de datos y carga** y **evitar hotspots** (todas las escrituras cayendo en el mismo shard). Por eso se recomiendan claves con alta cardinalidad y bien distribuidas.`,
  
  77: `Un **chunk** es un **rango de valores de shard key** que agrupa un subconjunto de documentos en un cluster sharded. MongoDB mueve estos chunks entre shards para balancear el almacenamiento y la carga.`,
  
  78: `El **balancer** es el proceso que **redistribuye automáticamente los chunks entre los shards** cuando detecta desequilibrios. Así busca que todos los nodos tengan una cantidad de datos y carga razonablemente similar.`,
  
  79: `El **config server** almacena los **metadatos del cluster sharded**: qué colecciones están shardeadas, qué chunks existen y en qué shard está cada uno. Es la "fuente de verdad" de la topología del cluster.`,
  
  80: `\`mongos\` es el **router de MongoDB** en entornos sharded. Recibe las consultas de los clientes, consulta a los config servers para saber dónde están los datos y las envía a los shards correctos, combinando las respuestas cuando es necesario.`,
  
  81: `**MongoDB Compass** es la **GUI oficial** de MongoDB. Permite conectarse a una base, explorar colecciones, ejecutar consultas, ver estadísticas, diseñar índices y analizar el rendimiento sin usar solo la línea de comandos.`,
  
  82: `**Studio 3T** es un **IDE comercial** muy completo para MongoDB. Ofrece consultas visuales, migraciones, generación de código, comparación de datos, entre otras herramientas avanzadas para administradores y desarrolladores.`,
  
  83: `**Robo 3T (Robomongo)** es un **cliente gráfico gratuito** para MongoDB. Permite explorar bases, ejecutar queries en una consola integrada y ver documentos de forma amigable, siendo una alternativa ligera a otras herramientas.`,
  
  84: `Los **validators** permiten definir **reglas de validación usando JSON Schema** u operadores de expresión para una colección. Así podés imponer ciertas restricciones de "esquema" (campos obligatorios, tipos, rangos) sin perder la flexibilidad general de MongoDB.`
};

// Leer el archivo all-questions.json
const data = JSON.parse(fs.readFileSync('./all-questions.json', 'utf8'));

// Actualizar las explicaciones de MongoDB
let updateCount = 0;
data.mongodb.forEach((question, index) => {
  const questionNumber = index + 1;
  if (mongodbExplanations[questionNumber]) {
    question.explanation = mongodbExplanations[questionNumber];
    updateCount++;
  }
});

// Guardar el archivo actualizado
fs.writeFileSync('./all-questions.json', JSON.stringify(data, null, 2));

console.log(`✅ Las ${updateCount} explicaciones de MongoDB han sido actualizadas exitosamente en all-questions.json`);
console.log(`📊 Total preguntas MongoDB: ${data.mongodb.length}`);
