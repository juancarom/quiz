const fs = require('fs');
const path = require('path');

// Ruta al archivo de preguntas
const questionsFilePath = path.join(__dirname, 'all-questions.json');

// Leer el archivo JSON
const data = JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));

// Explicaciones de MySQL
const mysqlExplanations = {
  1: `MySQL es un **RDBMS (Relational DataBase Management System)**, es decir, un sistema que almacena los datos en **tablas relacionadas entre sí mediante claves**. Usa SQL como lenguaje de consulta y está pensado para trabajar con datos estructurados, con soporte de transacciones, índices, vistas, etc.`,
  
  2: `El motor de almacenamiento **por defecto** en MySQL moderno es **InnoDB**. Este motor soporta transacciones ACID, claves foráneas, bloqueo a nivel de fila y recuperación ante fallos, por eso es el más usado para aplicaciones de negocio donde la integridad de datos es importante.`,
  
  3: `\`SHOW DATABASES;\` lista **todas las bases de datos** que el servidor MySQL conoce y a las que el usuario tiene permiso de ver. Es un comando de administración básico para orientarse en un servidor y saber qué bases existen antes de trabajar con alguna.`,
  
  4: `\`USE nombre;\` cambia el **contexto actual** a la base de datos indicada. A partir de ese momento, cualquier sentencia que no especifique el nombre de la base (como \`SELECT * FROM tabla;\`) se ejecuta sobre esa base por defecto, simplificando las consultas.`,
  
  5: `\`SHOW TABLES;\` muestra **todas las tablas** de la base de datos seleccionada con \`USE\`. Es el equivalente a decir "muéstrame qué entidades están definidas en este esquema" y es un paso típico al explorar una base que no conocés.`,
  
  6: `\`DESCRIBE tabla;\` o \`DESC tabla;\` muestra la **estructura de la tabla**: nombre de columnas, tipo de dato, si aceptan \`NULL\`, claves, valores por defecto, etc. Es muy útil para entender cómo están definidos los campos antes de escribir consultas o inserts.`,
  
  7: `El tipo **\`VARCHAR\`** se usa para **texto corto o de longitud variable**, por ejemplo nombres, emails, títulos. Definís un límite máximo (ej. \`VARCHAR(100)\`) pero cada fila ocupa solo el espacio necesario para el texto real, ahorrando espacio comparado con tipos de longitud fija.`,
  
  8: `Los tipos **\`INT\`** o **\`INTEGER\`** representan **números enteros** (sin decimales). Se usan para IDs, contadores, cantidades, etc. Soportan rangos de valores grandes y, combinados con \`AUTO_INCREMENT\`, son ideales para claves primarias numéricas.`,
  
  9: `El tipo **\`DATE\`** almacena **solo la fecha** (año, mes, día) sin hora. Es adecuado para representar cumpleaños, fechas de creación, vencimientos, etc. Cuando necesitás fecha y hora se usan otros tipos como \`DATETIME\` o \`TIMESTAMP\`.`,
  
  10: `El atributo **\`AUTO_INCREMENT\`** hace que MySQL **genere automáticamente un valor secuencial** para esa columna en cada nueva fila, típicamente usado en claves primarias. Así evitás tener que calcular IDs manualmente y reducís el riesgo de colisiones.`,
  
  11: `**InnoDB** es el motor que **implementa transacciones ACID**, bloqueo a nivel de fila y claves foráneas en MySQL. Esto significa que podés hacer \`COMMIT\` / \`ROLLBACK\`, garantizar integridad referencial y tener un mejor aislamiento entre transacciones concurrentes.`,
  
  12: `Hacer backup **copiando archivos directamente** corresponde a un **backup físico**: se copian los archivos de datos del servidor. Esto solo es seguro si se hace correctamente (por ejemplo, con el servidor detenido o usando técnicas específicas del motor), y suele complementarse o sustituirse por herramientas lógicas como \`mysqldump\` o backups hot de InnoDB.`,
  
  13: `MySQL escucha por defecto en el puerto **3306**, que es el puerto estándar asociado a este motor. Saber el puerto es clave para que los clientes (apps, CLI, herramientas gráficas) puedan conectarse al servidor sin problemas.`,
  
  14: `El comando de "optimizar" tabla (aquí representado como **\`CLEAN TABLE nombre\`**) hace referencia a las operaciones de **mantenimiento que reorganizan y compactan** el almacenamiento de una tabla. Estas acciones (en MySQL real con comandos como \`OPTIMIZE TABLE\`) pueden recuperar espacio y mejorar el rendimiento de ciertas consultas.`,
  
  15: `Un índice **\`FULLTEXT\`** está diseñado para **búsqueda de texto natural** sobre columnas \`VARCHAR\` o \`TEXT\`. Permite consultas del tipo \`MATCH(columna) AGAINST('palabras' IN NATURAL LANGUAGE MODE)\`, mucho más eficientes y relevantes que un simple \`LIKE '%texto%'\`.`,
  
  16: `\`CHECK TABLE nombre;\` se usa para **verificar la integridad** y el estado interno de una tabla. Permite detectar problemas de corrupción o inconsistencias a nivel de estructura y, según el motor, puede sugerir o requerir acciones de reparación.`,
  
  17: `Un **stored procedure** es un **bloque de sentencias SQL almacenadas en el servidor** que se ejecuta como una unidad con \`CALL\`. Encapsula lógica de negocio cerca de los datos, permite reutilizar código y puede mejorar rendimiento al reducir el tráfico entre aplicación y base.`,
  
  18: `\`CREATE USER\` sirve para **definir un nuevo usuario de MySQL**, especificando nombre y, opcionalmente, host y contraseña. Separar la creación del usuario de la asignación de permisos (\`GRANT\`) ayuda a tener una gestión de seguridad más clara y controlada.`,
  
  19: `\`GRANT permisos ON base.tabla TO usuario;\` asigna **privilegios específicos** (SELECT, INSERT, UPDATE, etc.) sobre una base o tabla a un usuario. Es la forma estándar de implementar el **principio de mínimo privilegio**, dando solo los accesos necesarios.`,
  
  20: `\`FLUSH PRIVILEGES;\` indica a MySQL que **recargue las tablas de privilegios** (como \`mysql.user\`) en memoria. Es útil cuando se han hecho cambios manuales sobre ellas y se quiere que el servidor aplique esos cambios sin reiniciar.`,
  
  21: `El **query cache** almacenaba los **resultados de consultas SELECT** para devolvérselos directamente si se repetía la misma consulta sobre los mismos datos. Esto podía mejorar el rendimiento en cargas de lectura repetitivas, aunque tenía limitaciones y complejidades que llevaron a su deprecación en versiones modernas.`,
  
  22: `**phpMyAdmin** es una herramienta web muy popular para **administrar MySQL desde el navegador**. Permite crear bases, tablas, ejecutar consultas, hacer backups, gestionar usuarios y más, sin necesidad de usar la línea de comandos.`,
  
  23: `Un **trigger** es un tipo de objeto que se ejecuta **automáticamente** antes o después de una operación \`INSERT\`, \`UPDATE\` o \`DELETE\` sobre una tabla. Se usa para validar datos, mantener auditorías, actualizar tablas derivadas u otras acciones que deben ocurrir en respuesta a cambios.`,
  
  24: `\`SHOW VARIABLES;\` muestra las **variables de sistema y de configuración** que MySQL tiene activas (como \`innodb_buffer_pool_size\`, \`max_connections\`, etc.). Esto es clave para entender cómo está tuneado el servidor y diagnosticar problemas de rendimiento.`,
  
  25: `El **binary log (binlog)** es un archivo donde MySQL registra **todas las operaciones que modifican datos** (INSERT, UPDATE, DELETE, cambios de estructura). Se usa para replicación (los esclavos reproducen esas operaciones) y para recuperación punto en el tiempo después de restaurar un backup.`,
  
  26: `Tanto el **general query log** como el **binary log** son tipos de logs importantes:\n\n* El *general query log* registra casi todas las consultas que llegan al servidor (útil para debug).\n* El *binary log* registra las modificaciones de datos para replicación y recuperación.\n\nCada uno cumple un rol distinto en administración y diagnóstico.`,
  
  27: `El **slow query log** guarda las **consultas que tardan más de un umbral configurado**. Es una herramienta fundamental para detectar qué queries son candidatas a optimización (índices, reescritura, cambios de diseño, etc.).`,
  
  28: `\`EXPLAIN\` (o \`EXPLAIN ANALYZE\` en versiones más nuevas) muestra el **plan de ejecución** que MySQL planea usar para una consulta: qué índices utilizará, cómo hará los joins, cuántas filas estima leer, etc. Leer bien \`EXPLAIN\` es clave para optimizar SQL.`,
  
  29: `El **query optimizer** es el componente del motor que decide **la mejor estrategia para ejecutar una consulta**, dada la estructura de las tablas, los índices y las estadísticas. El mismo SQL se puede ejecutar de formas muy diferentes, y el optimizador busca el plan más eficiente.`,
  
  30: `MySQL soporta varios **motores de almacenamiento**; entre ellos:\n\n* **MyISAM**, antiguo motor por defecto, rápido en lecturas pero sin transacciones ni FK.\n* **Memory (HEAP)**, que almacena datos en memoria RAM para acceso muy rápido (pero volátil).\n\nElegir el motor adecuado depende del caso de uso y requisitos de integridad/rendimiento.`,
  
  31: `La diferencia clave es que **InnoDB** soporta **transacciones ACID y claves foráneas**, mientras que **MyISAM** no. MyISAM suele ser más simple y rápido para lecturas sin muchas escrituras, pero InnoDB es el estándar actual cuando se necesita integridad y concurrencia segura.`,
  
  32: `El **buffer pool** de InnoDB es un área de memoria donde se **cachean páginas de datos e índices**. Cuanto más grande (hasta un límite razonable del servidor), más operaciones se pueden resolver desde memoria en lugar de disco, mejorando mucho el rendimiento.`,
  
  33: `Las **foreign keys** (claves foráneas) en InnoDB son **constraints que vinculan filas de tablas distintas** (por ejemplo, \`orders.customer_id\` → \`customers.id\`). Garantizan integridad referencial: no podés tener referencias a filas que no existen, y podés definir qué pasa cuando se borra o actualiza el registro padre.`,
  
  34: `\`ON DELETE CASCADE\` indica que, si se elimina la fila **padre**, MySQL eliminará **automáticamente todas las filas hijas** relacionadas. Esto es útil para mantener las tablas limpias de registros huérfanos sin tener que borrar manualmente en la aplicación.`,
  
  35: `Opciones como **\`SET NULL\`** y **\`RESTRICT\`** controlan qué sucede cuando se borra o actualiza el registro referenciado:\n\n* \`SET NULL\`: pone el campo foráneo en \`NULL\` para "desvincular" el hijo.\n* \`RESTRICT\`: impide la eliminación/actualización si hay registros hijos.\n\nEstas reglas ayudan a modelar distintas políticas de integridad.`,
  
  36: `**\`AUTO_INCREMENT\`** hace que la columna genere **valores numéricos secuenciales** automáticamente. Esto simplifica la creación de claves primarias únicas, especialmente cuando muchas filas se insertan concurrentemente.`,
  
  37: `\`ALTER TABLE tabla AUTO_INCREMENT = 1;\` permite **reiniciar el contador** de \`AUTO_INCREMENT\` a un valor específico. Es útil, por ejemplo, tras borrar muchos registros y querer que los próximos IDs arranquen desde un número más bajo (respetando que no existan filas con ese ID).`,
  
  38: `**\`ENUM\`** define una columna que solo puede tomar **uno de varios valores predefinidos** (por ejemplo, \`'activo', 'inactivo', 'pendiente'\`). Esto limita el dominio de valores posibles y puede simplificar validaciones, aunque también acopla la lista al esquema.`,
  
  39: `El tipo **\`SET\`** permite almacenar **cero o más valores** de una lista predefinida en una sola columna, como si fuera un conjunto de flags. Es útil cuando un registro puede tener múltiples opciones simultáneamente (por ejemplo, "roles" simples), aunque para modelos complejos se prefiere normalizar.`,
  
  40: `\`CHAR\` y \`VARCHAR\` almacenan texto, pero:\n\n* **\`CHAR(n)\`** es de **longitud fija**: se rellena con espacios y es eficiente para datos siempre del mismo tamaño (ej. códigos).\n* **\`VARCHAR(n)\`** es de **longitud variable**, ideal cuando las longitudes cambian mucho y querés ahorrar espacio.`,
  
  41: `Usás **\`CHAR\`** cuando el dato tiene **tamaño constante** (códigos de país, hashes de longitud fija, etc.), lo que puede ser más eficiente y predecible. Usás **\`VARCHAR\`** cuando la longitud varía (nombres, descripciones cortas) para no desperdiciar espacio de almacenamiento.`,
  
  42: `El tipo **\`TEXT\`** sirve para **cadenas largas**, como comentarios extensos, descripciones, contenido de artículos, etc. A diferencia de \`VARCHAR\`, está pensado para textos mucho más grandes y se almacena de forma algo diferente internamente.`,
  
  43: `MySQL ofrece varios tamaños de \`TEXT\`, como **\`TEXT\`** y **\`MEDIUMTEXT\`**, que se diferencian por la **cantidad máxima de caracteres** que pueden almacenar. Elegir el tipo correcto ayuda a balancear espacio de almacenamiento y necesidades reales de longitud.`,
  
  44: `Un **\`BLOB\` (Binary Large Object)** se usa para almacenar **datos binarios**: imágenes, archivos, contenido cifrado, etc. A diferencia de \`TEXT\`, no se asume codificación de caracteres, sino bytes "crudos", tal como los recibe la aplicación.`,
  
  45: `El tipo **\`JSON\`** en MySQL permite guardar **documentos JSON de forma nativa**, con validación de formato y funciones para manipularlos (\`JSON_SET\`, \`JSON_EXTRACT\`, etc.). Es útil para datos semi–estructurados dentro de un modelo principalmente relacional.`,
  
  46: `Funciones como **\`JSON_SET\`** y **\`JSON_ARRAY\`** son utilidades para **crear y modificar valores JSON** dentro de MySQL:\n\n* \`JSON_ARRAY\` construye un array JSON.\n* \`JSON_SET\` permite actualizar o agregar claves dentro de un documento JSON existente.\n\nEsto permite operar sobre JSON sin tener que traerlo y procesarlo en la aplicación.`,
  
  47: `La **partición** de una tabla es una técnica donde MySQL **divide físicamente la tabla en varias partes**, pero la sigue presentando lógicamente como una sola. Esto puede mejorar rendimiento y manejo de datos grandes (por ejemplo, por rango de fechas).`,
  
  48: `Entre los esquemas de particionamiento están:\n\n* **\`LIST\`**, que asigna filas a particiones según valores concretos de una columna.\n* **\`HASH\`**, que reparte filas automáticamente usando una función hash.\n\nCada estrategia sirve para distintos patrones de acceso y distribución de datos.`,
  
  49: `La **replicación** en MySQL es el proceso en el que un **servidor maestro envía sus cambios a uno o más esclavos** (réplicas). Esto permite escalado de lecturas, alta disponibilidad y backups más seguros, ya que hay copias adicionales de los datos.`,
  
  50: `Tipos de replicación como la **semi-síncrona** y la **Group Replication** agregan diferentes niveles de **consistencia y tolerancia a fallos**:\n\n* Semi-síncrona: el maestro espera confirmación de al menos una réplica.\n* Group Replication: ofrece un grupo de nodos con consenso y conmutación automática.`,
  
  51: `Un entorno **master-slave** (maestro–esclavo) tiene un servidor **maestro que recibe las escrituras** y uno o varios **esclavos que replican esos cambios**. Las lecturas pueden distribuirse a las réplicas para aliviar la carga del maestro.`,
  
  52: `**MySQL Cluster** es una solución que combina MySQL con un motor distribuido y **replicación síncrona**, orientado a alta disponibilidad y tolerancia a fallos. La idea es que la base siga disponible incluso si caen algunos nodos del cluster.`,
  
  53: `Con la opción **file-per-table**, InnoDB almacena cada tabla en **su propio archivo de datos** en lugar de un gran tablespace compartido. Esto facilita tareas como mover tablas, liberar espacio cuando se borran y aislar problemas de almacenamiento.`,
  
  54: `Un **tablespace** en InnoDB es un **contenedor lógico de almacenamiento** donde residen las páginas de datos e índices. Podés tener un tablespace global compartido o múltiples tablespaces por tabla, según la configuración (\`file-per-table\`, tablespaces generales, etc.).`,
  
  55: `La base **\`INFORMATION_SCHEMA\`** expone **metadatos del servidor**: qué tablas existen, columnas, índices, permisos, caracteres, etc. No almacena datos de negocio, sino información sobre la estructura y configuración de la base de datos.`,
  
  56: `**\`PERFORMANCE_SCHEMA\`** es una base especial que recopila **métricas detalladas de rendimiento**: tiempos de ejecución, esperas de locks, uso de I/O, etc. Es muy útil para tunear el servidor y encontrar cuellos de botella sin depender solo de logs externos.`,
  
  57: `El **thread pool** es un mecanismo para **gestionar conexiones reutilizando threads**, en lugar de crear uno por conexión. Esto reduce el overhead de creación de threads y mejora la escalabilidad cuando hay muchas conexiones simultáneas.`,
  
  58: `MySQL **no soporta vistas materializadas nativas**, por lo que si las necesitás debes simularlas con tablas físicas que se actualizan mediante procedimientos, triggers o eventos. La idea es guardar resultados precalculados para acelerar ciertas consultas pesadas.`,
  
  59: `El **Event Scheduler** permite definir **tareas programadas** que se ejecutan dentro del propio servidor MySQL (parecido a un cron interno). Podés usarlo para limpiezas periódicas, agregados, rotaciones de datos, etc., sin depender de scripts externos.`,
  
  60: `\`CREATE EVENT\` se usa para **definir un evento programado**, indicando cuándo y con qué frecuencia se ejecuta, y qué sentencia SQL corre. Es una forma de automatizar tareas repetitivas directamente en la base de datos.`,
  
  61: `\`LOAD DATA INFILE\` es una de las formas más rápidas de **importar datos masivamente desde un archivo de texto** (por ejemplo CSV) a una tabla. Permite definir separadores, comillas, salto de líneas, etc., y es ideal para cargas iniciales o integraciones batch.`,
  
  62: `\`mysqldump\` es una herramienta de línea de comandos que **exporta bases de datos a un archivo de texto con sentencias SQL** (\`CREATE TABLE\`, \`INSERT\`, etc.). Ese archivo luego se puede usar para restaurar la base o migrarla a otro servidor.`,
  
  63: `Opciones como **\`--single-transaction\`** y **\`--no-data\`** modifican el comportamiento de \`mysqldump\`:\n\n* \`--single-transaction\`: hace un dump consistente usando una transacción, sin bloquear las tablas mucho tiempo.\n* \`--no-data\`: exporta solo la estructura (DDL) sin filas, útil para clonar esquemas.`,
  
  64: `\`mysqlimport\` es una herramienta complementaria que **importa archivos de datos** (por ejemplo generados por \`SELECT ... INTO OUTFILE\` o formatos CSV) directamente en tablas. Internamente usa \`LOAD DATA INFILE\`, pero ofrece una interfaz más conveniente desde CLI.`,
  
  65: `\`REPAIR TABLE\` intenta **reparar estructuras corruptas** de ciertas tablas (especialmente MyISAM). Se usa cuando se detectan errores de integridad física en la tabla, aunque en motores modernos como InnoDB se prefieren otros mecanismos de recuperación.`,
  
  66: `\`ANALYZE TABLE\` **actualiza las estadísticas** de distribución de datos que usa el optimizador de consultas. Tener estadísticas precisas ayuda a que el optimizador elija mejores planes de ejecución (por ejemplo, decidir qué índice usar y en qué orden hacer joins).`,
  
  67: `El **query cache** almacenaba resultados de consultas SELECT para reutilizarlos, pero en MySQL 8.0 fue **deprecado y eliminado** porque generaba problemas de contención y escalabilidad. La respuesta aclara esto: existía como caché de resultados, pero ya no se recomienda ni está disponible en versiones recientes.`,
  
  68: `Se deprecó el query cache porque, en entornos con muchas escrituras, **invalidar continuamente la caché** y manejar los locks internos generaba **cuellos de botella**. En lugar de eso, hoy se prefiere caché a nivel de aplicación, proxies o soluciones externas como Redis.`,
  
  69: `\`innodb_buffer_pool_size\` es uno de los parámetros más importantes de MySQL: define **cuánta memoria se reserva para el buffer pool de InnoDB**. Un valor adecuado (grande pero no excesivo) permite que la mayoría de accesos a datos/índices ocurran en memoria, mejorando el rendimiento.`,
  
  70: `\`max_connections\` define el **número máximo de conexiones simultáneas** que el servidor MySQL aceptará. Si se alcanza este límite, nuevas conexiones serán rechazadas, por lo que hay que dimensionarlo según la carga esperada y los recursos de la máquina.`,
  
  71: `\`wait_timeout\` indica cuántos **segundos una conexión inactiva** puede permanecer abierta antes de que el servidor la cierre. Un valor muy alto puede dejar muchas conexiones "muertas" consumiendo recursos; uno muy bajo puede cerrar conexiones legítimas si la aplicación no las usa frecuentemente.`,
  
  72: `Herramientas gráficas como **MySQL Workbench** y **Adminer** permiten **administrar MySQL con interfaz visual**: ejecutar consultas, diseñar esquemas, ver estadísticas y gestionar usuarios. Son muy útiles tanto para desarrollo como para operaciones.`,
  
  73: `**MySQL Workbench** es la **herramienta oficial** de MySQL para diseño y administración. Incluye modelado de bases (diagramas ER), ejecución de consultas, migraciones, monitoreo y otras funciones que centralizan las tareas típicas de DBA.`,
  
  74: `**pt-query-digest** es una herramienta de Percona que analiza **logs de consultas** (slow log, general log, tcpdump, etc.) para identificar las queries más costosas. Agrupa, ordena y resume las consultas para ayudar a priorizar la optimización.`,
  
  75: `**ProxySQL** es un **proxy de alto rendimiento** específico para MySQL que ofrece **balanceo de carga, routing avanzado, caché, filtrado de queries**, y más. Se coloca entre la aplicación y el cluster MySQL para gestionar mejor la distribución del tráfico.`,
  
  76: `**Percona Server** es un **fork de MySQL** con mejoras de rendimiento, diagnósticos y herramientas adicionales. Mantiene compatibilidad con MySQL, pero añade funcionalidades avanzadas muy valoradas en entornos de alta carga.`,
  
  77: `**MariaDB** es otro **fork de MySQL**, creado por los desarrolladores originales, que mantiene alta compatibilidad a nivel de protocolo y SQL, pero incorpora motores de almacenamiento y características adicionales. Además, su desarrollo es más abierto y comunitario.`,
  
  78: `Las diferencias entre MySQL y MariaDB incluyen **características extra en MariaDB** (nuevos motores, funciones, optimizaciones) y un **modelo de desarrollo más abierto**. Aun así, en muchos casos las aplicaciones pueden conectarse a uno u otro con cambios mínimos.`,
  
  79: `El **adaptive hash index** es una optimización de InnoDB que **construye automáticamente índices hash en memoria** para accesos frecuentes, basándose en el uso de los índices B-Tree. Esto acelera ciertos patrones de lectura repetitiva sin que el DBA tenga que definir nada extra.`,
  
  80: `El **change buffer** de InnoDB es una **caché para operaciones sobre índices secundarios** cuando las páginas afectadas aún no están en memoria. En lugar de leerlas inmediatamente de disco, acumula los cambios y los aplica más tarde, reduciendo I/O aleatorio.`,
  
  81: `El **doublewrite buffer** protege contra **páginas parcialmente escritas** en caso de caída del sistema. Antes de escribir una página al tablespace definitivo, InnoDB la escribe en este buffer; así, si ocurre un fallo en medio de la escritura, aún hay una copia consistente para recuperarse.`,
  
  82: `Los **redo logs** registran las **operaciones de modificación** que realizan las transacciones. En caso de caída, InnoDB los usa para **reaplicar cambios pendientes** y garantizar que todas las transacciones comprometidas (COMMIT) se reflejen correctamente en los datos.`,
  
  83: `Los **undo logs** guardan la información necesaria para **revertir cambios** de una transacción si se hace \`ROLLBACK\`. Además, permiten implementar **MVCC (Multi-Version Concurrency Control)**, de modo que las lecturas puedan ver versiones consistentes de las filas mientras otras transacciones las modifican.`
};

// Actualizar las explicaciones
data.mysql.forEach((question, index) => {
  const explanationKey = index + 1;
  if (mysqlExplanations[explanationKey]) {
    question.explanation = mysqlExplanations[explanationKey];
  }
});

// Guardar el archivo actualizado
fs.writeFileSync(questionsFilePath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ Las 83 explicaciones de MySQL han sido actualizadas exitosamente en all-questions.json');
console.log(`📊 Total preguntas MySQL: ${data.mysql.length}`);
