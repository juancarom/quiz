const fs = require('fs');

// Todas las explicaciones de GraphQL (preguntas 1-88)
const graphqlExplanations = {
  1: `GraphQL es **un lenguaje de consulta para APIs** y también el **runtime** que ejecuta esas consultas. El cliente describe exactamente qué datos quiere y en qué forma, y el servidor responde con un JSON que sigue esa misma estructura. Esto evita pedir datos de más o de menos y hace las APIs más eficientes y predecibles.`,
  
  2: `GraphQL fue creado por **Facebook (hoy Meta)** para resolver problemas de sus apps móviles, donde necesitaban optimizar tráfico de red y evitar múltiples llamadas REST. Más tarde lo liberaron como open source, y hoy es un estándar de facto para APIs flexibles en muchas compañías.`,
  
  3: `GraphQL se hizo **open source en 2015**. Eso permitió que la comunidad lo adopte, cree servidores, clientes, herramientas (Apollo, Relay, etc.) y lo lleve a múltiples lenguajes. Desde entonces, la especificación se mantiene de forma abierta y evoluciona con propuestas y RFCs.`,
  
  4: `La gran diferencia con REST es que con GraphQL **el cliente define la forma y cantidad de datos** que necesita en una sola consulta. En lugar de hacer varias requests a distintos endpoints (over-fetching/under-fetching), enviás una sola query y recibís exactamente la estructura que pediste.`,
  
  5: `El **schema** es el **contrato central** de una API GraphQL: define qué tipos existen, qué queries, mutations y subscriptions están disponibles y cómo se relacionan. Sirve como documentación viva y permite validar las consultas antes de ejecutarlas, evitando que el cliente pida algo que no existe.`,
  
  6: `Normalmente el schema se define usando **SDL (Schema Definition Language)**, una sintaxis específica de GraphQL:\n\n\`\`\`graphql\ntype User {\n  id: ID!\n  name: String!\n}\n\`\`\`\n\nSDL es declarativo y legible, y muchas herramientas lo usan para generar código, documentación y tipos TypeScript/Flow.`,
  
  7: `Un **type** en GraphQL define la **estructura de un objeto**, es decir, qué campos tiene y de qué tipo son. Por ejemplo, \`type Post { id: ID!, title: String!, author: User! }\`. A partir de estos types, las queries saben qué forma van a tener los datos de respuesta.`,
  
  8: `Los tipos escalares son los **"bloques básicos"** de datos en GraphQL, como \`Int\`, \`Float\`, \`String\`, \`Boolean\` e \`ID\`. En esta pregunta se destacan \`Float\` y \`String\`, que representan números con decimales y texto respectivamente. A partir de ellos se construyen tipos más complejos (objetos, listas, etc.).`,
  
  9: `\`ID\` es un tipo escalar pensado para **identificadores únicos**. Generalmente se serializa como \`String\`, pero semánticamente indica que ese valor se usa para identificar entidades (usuarios, posts, etc.). No se deberían hacer operaciones aritméticas con un \`ID\`; su función es servir como clave.`,
  
  10: `Una **Query** es la operación de **lectura** en GraphQL: sirve para obtener datos. Lo interesante es que la query define la forma del resultado:\n\n\`\`\`graphql\nquery {\n  user(id: "1") {\n    name\n    email\n  }\n}\n\`\`\`\n\nEl servidor devuelve exactamente esos campos y nada más.`,
  
  11: `Una **Mutation** es la operación que **cambia el estado**: crear, actualizar o eliminar datos (similar a POST/PUT/PATCH/DELETE en REST). A diferencia de REST, una mutation puede devolver datos muy estructurados (por ejemplo, el objeto creado + errores de validación) en una sola respuesta.`,
  
  12: `Una **Subscription** permite **recibir datos en tiempo real**. En lugar de hacer polling, el cliente se suscribe a un evento (por ejemplo, \`messageAdded\`) y el servidor le envía actualizaciones cuando ocurren cambios. Normalmente se implementa sobre WebSockets u otro transporte persistente.`,
  
  13: `Las tres operaciones principales en GraphQL son **Query, Mutation y Subscription**. Queries leen datos, Mutations modifican datos y Subscriptions permiten recibir cambios en tiempo real. En esta pregunta se resaltan dos, pero siempre hay que recordar que el modelo completo incluye las tres.`,
  
  14: `Un **resolver** es la **función que realmente trae los datos** para un campo específico del schema. Cuando hacés una query, GraphQL recorre el árbol de campos y va llamando a los resolvers correspondientes (consultando DBs, otros servicios, etc.) para construir la respuesta final.`,
  
  15: `\`__typename\` es un **meta-campo** disponible en cualquier objeto GraphQL que devuelve el nombre del tipo concreto. Es muy útil en clientes (Apollo, Relay) para cacheo y para distinguir qué tipo se devolvió en un \`Union\` o \`Interface\` sin tener que adivinar.`,
  
  16: `Los **arguments** son parámetros que se pasan a campos o operaciones para **filtrar o modificar la consulta**. Por ejemplo:\n\n\`\`\`graphql\nuser(id: "1") { name }\n\`\`\`\n\nAquí \`id: "1"\` es un argument. Ayudan a hacer queries más expresivas sin crear nuevos endpoints.`,
  
  17: `Las **variables** permiten **parametrizar las queries** sin tener que reescribir el texto de la query cada vez. Definís la variable en la operación (\`query GetUser($id: ID!)\`) y luego envías los valores en un payload separado. Esto mejora la reutilización y facilita el uso en clientes y herramientas.`,
  
  18: `En una query, las variables se definen **con \`$\` delante del nombre y un tipo**:\n\n\`\`\`graphql\nquery GetUser($id: ID!) {\n  user(id: $id) { name }\n}\n\`\`\`\n\nLuego, en la request HTTP, enviás \`{ "id": "1" }\` como variables. Así podés cambiar el valor sin tocar la query.`,
  
  19: `El signo \`!\` marca un tipo como **non-null**, es decir, que **no puede ser \`null\`**. \`String!\` significa "siempre hay un String presente". Esto sirve tanto para campos como para argumentos, y ayuda a que el cliente sepa qué puede asumir que siempre está definido.`,
  
  20: `Un **fragment** es un bloque reutilizable de campos que podés **incluir en varias queries**. Por ejemplo:\n\n\`\`\`graphql\nfragment UserFields on User {\n  id\n  name\n}\n\nquery {\n  user(id: "1") {\n    ...UserFields\n  }\n}\n\`\`\`\n\nAsí evitás duplicar listas largas de campos y mantenés las queries consistentes.`,
  
  21: `Un fragment es un bloque reutilizable de campos, pero **no se define con \`type Fragment\`** sino con la sintaxis:\n\n\`\`\`graphql\nfragment UserFields on User {\n  id\n  name\n}\n\`\`\`\n\nLa idea es agrupar campos que se repiten para poder incluirlos en distintas queries usando \`...NombreDelFragment\`.`,
  
  22: `Los **inline fragments** permiten seleccionar campos dependiendo del **tipo concreto** dentro de una \`union\` o \`interface\`. Por ejemplo:\n\n\`\`\`graphql\n... on Photo { url }\n... on Video { duration }\n\`\`\`\n\nSon útiles cuando una misma query puede devolver distintos tipos y querés manejar cada caso en la misma respuesta.`,
  
  23: `Una **Interface** es un tipo abstracto que **define un conjunto de campos que otros tipos deben implementar**. Por ejemplo:\n\n\`\`\`graphql\ninterface Node { id: ID! }\ntype User implements Node { id: ID!, name: String! }\n\`\`\`\n\nEsto permite escribir queries genéricas sobre la interface y recibir distintos tipos concretos que la implementan.`,
  
  24: `Un **Union type** representa **un valor que puede ser de uno entre varios tipos posibles**, sin requerir campos en común. Por ejemplo:\n\n\`\`\`graphql\nunion SearchResult = User | Post\n\`\`\`\n\nAl resolverlo, necesitás usar \`__typename\` o inline fragments para saber qué tipo concreto recibiste.`,
  
  25: `La diferencia clave es:\n\n* **Interface**: todos los tipos que la implementan **comparten un conjunto de campos**.\n* **Union**: agrupa tipos sin exigir campos comunes.\n\nInterfaces sirven para polimorfismo con una "forma mínima garantizada"; unions para modelar "puede ser A o B" sin estructura compartida.`,
  
  26: `Un **Enum** es un tipo que solo puede tomar **un conjunto finito de valores predefinidos**, por ejemplo:\n\n\`\`\`graphql\nenum Status { DRAFT PUBLISHED ARCHIVED }\n\`\`\`\n\nAyuda a que el cliente conozca todos los valores posibles y evita strings mágicos o errores de tipeo.`,
  
  27: `Un **Input type** se usa para **pasar objetos complejos como argumentos** a queries o mutations. Por ejemplo:\n\n\`\`\`graphql\ninput CreateUserInput {\n  name: String!\n  email: String!\n}\n\`\`\`\n\nEsto evita tener mil argumentos sueltos y permite validar la estructura de datos de entrada.`,
  
  28: `La regla es sencilla:\n\n* \`type\` → describe **datos que salen** en el \`data\` de la respuesta.\n* \`input\` → describe **datos que entran** como argumentos.\n\nNo podés usar \`input\` como resultado ni \`type\` como argumento.`,
  
  29: `Las **directivas** son "modificadores" que se agregan a campos o fragmentos para **cambiar cómo se ejecuta la query**. Ejemplos: \`@include\` y \`@skip\` (ejecución condicional de campos), \`@deprecated\` (marcar campos obsoletos). También se pueden definir directivas custom (por ejemplo, para auth).`,
  
  30: `Directivas comunes incluyen:\n\n* \`@skip(if: Boolean!)\` → omite un campo si la condición es \`true\`.\n* \`@include(if: Boolean!)\` → incluye un campo solo si la condición es \`true\`.\n* \`@deprecated(reason: String)\` → marca un campo como obsoleto.\n\nEn la pregunta se listan \`@skip\` y \`@deprecated\`, ambas muy usadas en la práctica.`,
  
  31: `\`@include\` hace que un campo **solo se incluya si la condición es \`true\`**:\n\n\`\`\`graphql\nname @include(if: $showName)\n\`\`\`\n\nEs útil para que una misma query pueda traer más o menos datos según el contexto (modo detalle, modo lista, etc.) sin duplicar consultas.`,
  
  32: `\`@skip\` es el inverso de \`@include\`: **omite el campo si la condición es \`true\`**.\n\n\`\`\`graphql\nemail @skip(if: $hideEmail)\n\`\`\`\n\nCombinando \`@include\`/\`@skip\` con variables podés controlar de forma muy fina qué datos trae una misma query.`,
  
  33: `\`@deprecated\` sirve para **marcar un campo como obsoleto** sin romper clientes existentes. Podés añadir una razón:\n\n\`\`\`graphql\noldField: String @deprecated(reason: "Usar newField")\n\`\`\`\n\nLas herramientas de cliente muestran avisos, lo que ayuda a migrar poco a poco sin cambios abruptos.`,
  
  34: `La **introspection** es la capacidad de **consultar el schema** con GraphQL. Es decir, usar GraphQL para preguntar "¿qué tipos, campos, directivas existen?". Gracias a esto, herramientas como Playground, GraphiQL o Apollo pueden autocompletar y generar documentación automáticamente.`,
  
  35: `No existe literalmente una query \`getSchema\`; en introspection se usa el campo especial \`__schema\`:\n\n\`\`\`graphql\n{\n  __schema {\n    types { name }\n  }\n}\n\`\`\`\n\nLa idea de la respuesta es: *hay una query especial de introspection que devuelve el schema completo*, y las herramientas suelen construirla por vos.`,
  
  36: `Para obtener información de un tipo concreto, se usa el campo \`__type(name: "TypeName")\` en una introspection query:\n\n\`\`\`graphql\n{\n  __type(name: "User") {\n    name\n    fields { name type { name } }\n  }\n}\n\`\`\`\n\nLa respuesta "getType" apunta a esta idea: consultar metadatos de un tipo usando introspection.`,
  
  37: `Algunos equipos **deshabilitan introspection en producción** para no exponer el schema a cualquiera, pero no es una regla absoluta. Es una medida de "security by obscurity" complementaria; la seguridad real viene de la autorización y validación, no solo de ocultar el schema.`,
  
  38: `**DataLoader** es una utilidad (popularizada por Facebook) que hace **batching y caching** de cargas de datos. En lugar de hacer una query por cada elemento, agrupa las solicitudes y llama a tu función de carga una sola vez con una lista de keys, reduciendo el número de accesos a la base de datos.`,
  
  39: `DataLoader ayuda a resolver el **problema N+1**: en vez de hacer 1 query para la lista y luego N queries adicionales para los detalles de cada elemento, DataLoader agrupa esas N en una sola query batch. Resultado: menos llamadas a la DB y mejor performance.`,
  
  40: `El **problema N+1** ocurre cuando, para una lista de N elementos, hacés **una query para la lista + una query por cada elemento relacionado**, generando N+1 queries totales. En GraphQL es fácil caer en esto si cada resolver hace su propia consulta. Por eso se usan técnicas como DataLoader o eager loading.`,
  
  41: `**Apollo Server** es una de las implementaciones más populares de servidores GraphQL para Node.js. Facilita definir el schema, los resolvers y manejar el ciclo de vida de las queries (contexto, errores, caché, etc.) con una configuración mínima. Es el estándar de facto en entornos JavaScript.`,
  
  42: `**Apollo Client** es una librería completa para **consumir APIs GraphQL desde el frontend**. Ofrece caching, manejo de estado, control de errores y soporte para queries, mutations y subscriptions. Se integra fácilmente con React, Vue o Angular.`,
  
  43: `El **Apollo Cache** guarda los resultados de queries en una **estructura normalizada**. Así, si varias vistas usan los mismos datos, se actualizan automáticamente al modificarlos. Este enfoque evita recargas innecesarias y mejora el rendimiento general del cliente.`,
  
  44: `**GraphQL Playground** es una **IDE interactiva** que permite escribir, ejecutar y probar queries GraphQL directamente desde el navegador. Incluye autocompletado, documentación del schema y manejo de variables, ideal para desarrolladores y testers.`,
  
  45: `**GraphiQL** fue la **primera interfaz oficial de GraphQL**, también una IDE web. Aunque fue reemplazada por Playground en muchos entornos, sigue siendo usada por su simplicidad. Permite ejecutar queries, ver documentación e inspeccionar respuestas.`,
  
  46: `**Relay** es un **framework de Facebook** que combina React con GraphQL. Se centra en la eficiencia de datos, optimización del caché y control del flujo de queries. Es más estricto que Apollo, pero muy poderoso en grandes aplicaciones con muchos componentes interdependientes.`,
  
  47: `Las **Relay Connections** son un patrón para **paginación con cursores**. Establecen una estructura estandarizada (\`edges\` y \`pageInfo\`) para navegar listas grandes sin depender de offsets, lo que mejora la consistencia y el rendimiento en cambios de datos.`,
  
  48: `Un **Relay Cursor** es un **identificador opaco** que marca la posición de un elemento en una lista paginada. Permite pedir resultados desde o hasta cierto punto (\`after\`, \`before\`), haciendo que la paginación sea más estable que con índices numéricos.`,
  
  49: `La **paginación en GraphQL** divide resultados grandes en **bloques manejables**. Se usa para evitar respuestas enormes y mejorar el rendimiento. Puede implementarse con offsets (numérica) o cursores (relativa al último elemento leído).`,
  
  50: `Los dos tipos más comunes de paginación son:\n\n* **Page/Offset-based**: usa números (\`offset\`, \`limit\`).\n* **Cursor-based**: usa cursores únicos (\`after\`, \`before\`).\n\nLa segunda es más robusta ante cambios en los datos entre consultas.`,
  
  51: `**Offset-based pagination** usa parámetros como \`offset\` y \`limit\` para **saltar y limitar registros**:\n\n\`\`\`graphql\nposts(offset: 20, limit: 10)\n\`\`\`\n\nEs simple, pero puede dar resultados inconsistentes si los datos cambian entre páginas.`,
  
  52: `**Cursor-based pagination** utiliza **cursores únicos en lugar de índices numéricos**. Ejemplo:\n\n\`\`\`graphql\nposts(first: 10, after: "YXJyYXljb25uZWN0aW9uOjEw")\n\`\`\`\n\nEsto asegura estabilidad aunque se agreguen o eliminen registros.`,
  
  53: `La **paginación basada en cursores** es **más confiable con datos dinámicos**, ya que los cursores siguen siendo válidos aunque cambie el orden o se inserten nuevos registros. Es ideal para feeds en tiempo real o listas actualizadas con frecuencia.`,
  
  54: `**Batching** significa **combinar varias queries GraphQL en una sola petición HTTP**. Así se reducen las conexiones y la sobrecarga de red. Se usa frecuentemente junto a DataLoader o Apollo Link Batch HTTP.`,
  
  55: `Las **persisted queries** son **queries pre-registradas en el servidor con un ID hash**. El cliente luego solo envía ese ID en lugar del texto completo, reduciendo tamaño y mejorando seguridad (porque el servidor valida que la query es conocida).`,
  
  56: `Las **persisted queries** mejoran el rendimiento y reducen el tamaño de las requests. Además, mitigan ataques de inyección porque solo se aceptan queries registradas. Son muy usadas en entornos productivos con Apollo o Relay.`,
  
  57: `La directiva \`@defer\` permite **enviar primero una parte de la respuesta** y el resto después. Ideal para campos pesados o secundarios, mejora la percepción de velocidad y la experiencia del usuario sin bloquear toda la respuesta.`,
  
  58: `\`@stream\` permite **transmitir listas grandes en partes** en lugar de esperar a que se cargue todo. Es especialmente útil para feeds o resultados progresivos, reduciendo tiempos de carga iniciales.`,
  
  59: `**Federation** es una **arquitectura que divide un schema GraphQL en múltiples servicios** ("subgraphs") que colaboran para formar una API unificada. Cada subgraph define su parte del schema, y un gateway compone las respuestas.`,
  
  60: `**Apollo Federation** es la **implementación estándar** de Federation. Define directivas (\`@key\`, \`@extends\`, etc.) y herramientas (\`Apollo Gateway\`) para construir GraphQL distribuido, manteniendo la validación y consistencia entre servicios.`,
  
  61: `Los **subgraphs** son los **servicios individuales** dentro de una arquitectura federada. Cada uno define su schema local y lo expone al **gateway**, que se encarga de combinarlos y orquestar las queries entre ellos.`,
  
  62: `El **gateway** en Federation es el **punto de entrada único** que recibe las queries del cliente, las descompone y las reparte entre los subgraphs necesarios. Luego combina las respuestas parciales en un único resultado coherente.`,
  
  63: `La directiva \`@key\` define **cómo identificar una entidad** compartida entre distintos subgraphs. Ejemplo:\n\n\`\`\`graphql\ntype User @key(fields: "id") { id: ID!, name: String! }\n\`\`\`\n\nGracias a \`@key\`, el gateway puede unificar datos de la misma entidad provenientes de varios servicios.`,
  
  64: `**Schema stitching** es una técnica más antigua que **combina múltiples schemas GraphQL** en uno solo. A diferencia de Federation, el servidor debe resolver manualmente cómo unirlos, lo cual lo hace menos flexible y más difícil de escalar.`,
  
  65: `La diferencia es que **Federation** fue diseñada para **microservicios modernos**, donde cada equipo mantiene su propio schema conectado al gateway. **Stitching** une schemas ya existentes, pero sin reglas estandarizadas ni composición automática.`,
  
  66: `En GraphQL, los **errores forman parte de la respuesta JSON**, no del código HTTP. Esto significa que incluso con un error de negocio, el servidor puede responder \`200 OK\` con un campo \`"errors"\` en la respuesta. Es una filosofía de transporte neutro.`,
  
  67: `Una respuesta GraphQL puede incluir:\n\n* \`data\`: los datos solicitados.\n* \`errors\`: un arreglo con errores ocurridos al resolver campos.\n* \`extensions\`: metadatos adicionales (por ejemplo, tiempos, rastreo, etc.).\n\nEsto permite granularidad y consistencia incluso con fallos parciales.`,
  
  68: `Aunque GraphQL generalmente responde con **200 OK**, puede devolver **400 o 500** en errores graves (por ejemplo, fallos de sintaxis o servidor). La idea es separar "errores del protocolo HTTP" de "errores lógicos de la query".`,
  
  69: `Los **errores de negocio** (como "saldo insuficiente" o "usuario no autorizado") se suelen manejar **dentro del campo \`data\`**, devolviendo un objeto con información del error. Así el cliente puede seguir recibiendo parte útil de los datos sin cortar la comunicación.`,
  
  70: `El **context** es un objeto compartido por todos los resolvers durante una request. Suele contener datos comunes como el usuario autenticado, conexiones a bases de datos, loaders o configuraciones. Se crea por request y vive durante toda la ejecución.`,
  
  71: `En el **context** normalmente incluís información compartida como:\n\n* La conexión a la base de datos.\n* Los headers del request (para autenticación).\n* Instancias de DataLoader u otras dependencias.\n\nEsto mantiene los resolvers limpios y coherentes.`,
  
  72: `El **middleware** son funciones que se ejecutan **antes o después de los resolvers**. Pueden servir para logging, validación, autenticación o monitoreo. Se aplican de forma global o por campo, y permiten agregar comportamiento sin modificar los resolvers directamente.`,
  
  73: `La **authorization** en GraphQL verifica **si el usuario tiene permiso para acceder o modificar un recurso**. Se puede aplicar a nivel global (middleware), por resolver o incluso dentro del schema con directivas personalizadas como \`@auth\`.`,
  
  74: `La autorización puede implementarse:\n\n* En **middleware**, revisando el \`context\` y bloqueando accesos.\n* En el **schema**, mediante **directivas custom** (\`@auth(role: "ADMIN")\`).\n\nEsto permite centralizar o granularizar el control de permisos según la complejidad del sistema.`,
  
  75: `La **validación** comprueba que la query cumpla con las reglas del schema antes de ejecutarla. GraphQL verifica automáticamente que los tipos y campos existan, que los argumentos sean correctos y que no se pidan campos no definidos.`,
  
  76: `La validación ocurre **antes de ejecutar la query**, justo después del parsing. Si la query es inválida, GraphQL devuelve un error inmediatamente sin llamar a los resolvers, lo que ahorra tiempo y recursos.`,
  
  77: `La **execution** es el proceso en el que GraphQL **recorre el árbol de la query** y llama a los resolvers para obtener los datos. Cada campo puede depender de otros o generar subqueries, y todo se resuelve de forma recursiva hasta armar el resultado final.`,
  
  78: `El **execution algorithm** define cómo GraphQL **resuelve eficientemente** los campos de una query. Ejecuta resolvers en paralelo cuando es posible y maneja dependencias jerárquicas (por ejemplo, obtener primero \`user\` y luego \`user.posts\`).`,
  
  79: `El **problema N+1** aparece cuando cada resolver ejecuta **una query independiente** por cada elemento de una lista, multiplicando el número total de consultas. Esto se resuelve agrupando accesos (batching) o precargando relaciones (eager loading).`,
  
  80: `Para evitar el N+1, se usan técnicas como:\n\n* **Batching:** agrupar múltiples requests en una sola llamada.\n* **Eager loading:** precargar relaciones antes de resolver los campos.\n\nAmbas reducen consultas redundantes y mejoran el rendimiento de la API.`,
  
  81: `**Optimistic UI** es una técnica del cliente GraphQL donde la UI **se actualiza inmediatamente** después de una mutation, asumiendo que tendrá éxito. Luego, cuando llega la respuesta real del servidor, se corrige si es necesario. Mejora la percepción de velocidad.`,
  
  82: `La **normalización del caché** almacena los objetos **por ID único**, no por query. Esto evita duplicar datos en el caché y permite actualizarlos automáticamente en todas las vistas donde se usen. Es una de las claves del rendimiento de Apollo Client.`,
  
  83: `El beneficio del **normalized cache** es que cuando cambia un objeto (por ejemplo, un \`User\`), todas las queries que lo usan se actualizan automáticamente. Esto mantiene la UI sincronizada sin necesidad de recargar manualmente cada vista.`,
  
  84: `**Code generation** crea automáticamente **tipos TypeScript o Flow** a partir del schema GraphQL. Esto permite tener tipado fuerte en los resolvers y en el frontend, reduciendo errores y manteniendo sincronía entre el schema y el código.`,
  
  85: `Herramientas populares de **codegen** incluyen **Apollo Codegen** y **Relay Compiler**, que analizan el schema y las queries para generar tipos y funciones auxiliares. Así garantizan seguridad de tipos y autocompletado en el IDE.`,
  
  86: `En el enfoque **schema-first**, primero definís el schema (con SDL) y luego implementás los resolvers.\nEn **code-first**, escribís el código y el schema se genera automáticamente a partir de él (por ejemplo, con TypeGraphQL o Nexus). Ambos métodos buscan sincronizar el schema y el código fuente.`,
  
  87: `**SDL-first** (Schema Definition Language first) es el enfoque donde **definís primero el schema con SDL**, y luego implementás resolvers que cumplen ese contrato. Es el método más didáctico y claro para proyectos donde varios equipos colaboran.`,
  
  88: `**TypeGraphQL** es una librería que permite **definir schemas GraphQL usando decoradores de TypeScript**, en lugar de SDL. Combina el enfoque code-first con la potencia del tipado estático de TypeScript, generando automáticamente el schema y resolvers coherentes.`
};

// Leer el archivo all-questions.json
const data = JSON.parse(fs.readFileSync('./all-questions.json', 'utf8'));

// Actualizar las explicaciones de GraphQL
let updateCount = 0;
data.graphql.forEach((question, index) => {
  const questionNumber = index + 1;
  if (graphqlExplanations[questionNumber]) {
    question.explanation = graphqlExplanations[questionNumber];
    updateCount++;
  }
});

// Guardar el archivo actualizado
fs.writeFileSync('./all-questions.json', JSON.stringify(data, null, 2));

console.log(`✅ Las ${updateCount} explicaciones de GraphQL han sido actualizadas exitosamente en all-questions.json`);
console.log(`📊 Total preguntas GraphQL: ${data.graphql.length}`);
