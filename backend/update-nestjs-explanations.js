const fs = require('fs');
const path = require('path');

// Ruta al archivo de preguntas
const questionsFilePath = path.join(__dirname, 'all-questions.json');

// Leer el archivo JSON
const data = JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));

// Explicaciones de NestJS
const nestjsExplanations = {
  1: `En NestJS los decoradores son anotaciones como \`@Controller()\`, \`@Get()\`, \`@Injectable()\`, etc., que añaden **metadatos** y definen el **comportamiento** de clases, métodos o parámetros. Gracias a ellos el framework sabe qué es un controlador, qué método es una ruta, qué clase es inyectable, etc.`,
  
  2: `La Dependency Injection es un patrón donde las clases **reciben sus dependencias** en lugar de crearlas con \`new\`. NestJS tiene un contenedor de inyección que se encarga de construir e inyectar los providers, lo que hace el código más desacoplado y fácil de testear.`,
  
  3: `Un Guard se ejecuta **antes** del controlador y decide si una petición puede continuar o no. Típicamente se usa para autenticación, autorización por roles o cualquier regla de acceso, devolviendo \`true\` (se permite) o \`false\` (se bloquea).`,
  
  4: `El decorador \`@Controller()\` marca una **clase como controlador HTTP**, asociando un prefijo de ruta opcional. Dentro de esa clase se definen los handlers (métodos) que responderán a las distintas rutas y métodos HTTP.`,
  
  5: `En NestJS el decorador para una ruta GET es \`@Get()\` (en el test aparece como \`@HttpGet\`). Este decorador se pone sobre un método de un controlador para indicarle al framework que ese método responderá a peticiones HTTP GET en una ruta determinada.`,
  
  6: `Un Pipe es una clase que implementa \`PipeTransform\` y se ejecuta **antes de que el controlador reciba los datos**, para **transformarlos** (p.ej. de string a número) o **validarlos** (por ejemplo, usando DTOs con \`class-validator\`).`,
  
  7: `Un Interceptor se ejecuta **antes y/o después** del handler del controlador, y sirve para lógica transversal: logging, métricas, transformación de respuestas, manejo de errores, timeouts… Eso lo hace muy útil también como herramienta de debugging.`,
  
  8: `El decorador indicado (\`@Component\`) se usa para marcar una clase como **inyectable** por el contenedor de Nest, es decir, como un provider. En versiones actuales de NestJS se usa \`@Injectable()\`, pero la idea es la misma: que la clase pueda ser inyectada en otras.`,
  
  9: `Un módulo es una clase decorada con \`@Module()\` que agrupa **controladores, providers y otros módulos** relacionados. Sirve para organizar la aplicación en partes cohesivas (por dominio o funcionalidad) y es la unidad básica de modularidad en NestJS.`,
  
  10: `NestJS se integra con Swagger/OpenAPI mediante el paquete \`@nestjs/swagger\`, usando decoradores como \`@ApiTags()\`, \`@ApiProperty()\`, etc. Esto permite **generar documentación interactiva** de la API automáticamente a partir del código.`,
  
  11: `El Event Loop de Node.js es el mecanismo que permite ejecutar **código asíncrono en un solo hilo**, gestionando callbacks, Promises, I/O y timers. NestJS corre sobre Node, así que toda su lógica HTTP y asíncrona se apoya en este Event Loop.`,
  
  12: `Un Exception Filter es una **capa de manejo centralizado de errores**: captura excepciones lanzadas en controladores/servicios y define cómo transformarlas en respuestas HTTP (status code, mensaje, body, etc.), en lugar de dejar que revienten sin control.`,
  
  13: `En el test se menciona MVVM, pero en la práctica NestJS se basa en una **arquitectura modular por capas** (controladores, servicios, repositorios, etc.) con fuerte uso de inyección de dependencias. La idea central es separar responsabilidades y hacer el código escalable y mantenible.`,
  
  14: `El decorador \`@Body()\` extrae el **cuerpo (body) de la petición HTTP** y lo inyecta como argumento en el método del controlador. Suele mapearse a un DTO para validar y tipar los datos que envía el cliente.`,
  
  15: `DTO significa realmente **Data Transfer Object** (no Database Type Object): es una clase que describe la forma de los datos que se envían o reciben (por ejemplo, en el body), y suele usarse junto con \`class-validator\` para validar inputs en NestJS.`,
  
  16: `El decorador \`@Inject()\` le dice al contenedor de Nest **qué token de provider debe inyectar** en ese parámetro o propiedad. Normalmente no hace falta usarlo explícitamente (Nest resuelve por tipo), pero es útil con tokens personalizados o valores de configuración.`,
  
  17: `Un middleware en NestJS es una **función que se ejecuta antes de los guards, pipes y controladores**, típica del stack de Express/Fastify. Sirve para tareas como logging, CORS, parseo de body especial, o añadir propiedades al \`req\` global.`,
  
  18: `Los Guards tienen acceso al **\`ExecutionContext\`**, lo que les permite leer detalles de la petición (como usuario, ruta, handler, etc.), y deben devolver **\`true\` o \`false\`** (o un \`Observable/Promise\` de eso) para indicar si la petición continúa o se bloquea.`,
  
  19: `NestJS implementa una **arquitectura modular con inyección de dependencias**: todo se organiza en módulos, que exportan e importan providers entre sí, y un contenedor central resuelve las dependencias automáticamente.`,
  
  20: `Los Providers son **clases que pueden ser inyectadas** (servicios, repositorios, factories, etc.). Se registran en el array \`providers\` de un módulo y luego Nest los puede inyectar en controladores u otros providers usando el sistema de DI.`,
  
  21: `La validación en NestJS suele hacerse con **DTOs + \`class-validator\` + \`ValidationPipe\`**. El pipe toma el body/query/params, lo transforma en una instancia del DTO y ejecuta las reglas de validación, lanzando errores automáticamente si los datos no son válidos.`,
  
  22: `\`@Param()\` extrae **parámetros de ruta** (por ejemplo \`/users/:id\`) de la URL. Podés usar \`@Param('id') id: string\` para obtener un parámetro concreto, o \`@Param()\` sin argumentos para recibir todos en un objeto.`,
  
  23: `\`ExecutionContext\` es un objeto que extiende \`ArgumentsHost\` y ofrece **información detallada del contexto actual**: tipo de contexto (HTTP, WebSocket, RPC), handler, clase, request/response, etc. Es clave en guards, interceptors y decorators personalizados.`,
  
  24: `\`useValue\` y \`useFactory\` son formas de **definir providers personalizados**:\n\n* \`useValue\`: registra un valor u objeto literal.\n* \`useFactory\`: registra un provider creado mediante una función factory, que puede depender de otros providers.`,
  
  25: `\`@Query()\` se usa para extraer **query parameters** de la URL (por ejemplo \`?page=1&limit=10\`). Igual que con otros decoradores, podés pedir un parámetro específico (\`@Query('page')\`) o todos a la vez (\`@Query()\`).`,
  
  26: `Un Custom Decorator de parámetro se crea con \`createParamDecorator\` y permite **encapsular lógica repetitiva de extracción de datos** del \`ExecutionContext\` (por ejemplo, sacar el usuario autenticado, un header concreto, etc.) en un decorador reutilizable.`,
  
  27: `\`@Res()\` inyecta directamente el **objeto de respuesta** de Express o Fastify, para que puedas manipularlo de forma manual (status, headers, cookies, etc.). Al usarlo, normalmente tenés que gestionar la respuesta tú mismo (en vez de dejar que Nest la serialice).`,
  
  28: `Un Dynamic Module es un módulo que **devuelve su configuración en tiempo de ejecución**, típicamente mediante métodos estáticos como \`forRoot()\`/\`forRootAsync()\`. Esto permite configurar providers (por ejemplo, conexiones a DB) con valores dinámicos o asíncronos.`,
  
  29: `Hooks como \`OnApplicationBootstrap\` y \`OnModuleDestroy\` son **lifecycle hooks** que se ejecutan en momentos concretos del ciclo de vida de la app: al finalizar el bootstrap, al destruir módulos, etc. Son útiles para inicializar o liberar recursos.`,
  
  30: `El \`Reflector\` es una utilidad de Nest que simplifica la **lectura de metadatos definidos por decoradores** (por ejemplo, con \`@SetMetadata()\` o decoradores de Swagger). Es muy común en guards e interceptors que necesitan leer permisos o roles configurados.`,
  
  31: `\`@SetMetadata(key, value)\` asocia **metadatos personalizados** a un handler o clase. Luego esos metadatos se pueden leer con el \`Reflector\` dentro de un guard o interceptor (por ejemplo, para implementar \`@Roles('admin')\`).`,
  
  32: `Un Exception Filter personalizado es una clase que implementa \`ExceptionFilter\` y define un método \`catch(exception, host)\`, donde **transformás excepciones en respuestas HTTP** a tu gusto (status, estructura de JSON, logging, etc.).`,
  
  33: `La paginación suele implementarse leyendo **query parameters** (por ejemplo \`page\`, \`limit\`) y usando métodos de ORM como \`skip()\` y \`take()\` (TypeORM) o \`offset\`/\`limit\` en otros ORMs para devolver solo el segmento de resultados deseado.`,
  
  34: `\`@UploadedFile()\` y \`@UploadedFiles()\` se usan junto con los File Interceptors para **recibir archivos subidos** (single o múltiples) en un endpoint. Internamente suelen usar \`multer\` para manejar multipart/form-data.`,
  
  35: `Una Circular Dependency ocurre cuando **dos providers se necesitan mutuamente** (A depende de B y B depende de A), lo que genera problemas al resolver el grafo de dependencias. Es un problema de diseño que Nest puede mitigar con herramientas como \`forwardRef()\`.`,
  
  36: `\`forwardRef()\` se usa en \`@Inject()\` o en \`imports\` de módulos para **romper dependencias circulares**: en lugar de referenciar directamente un provider/módulo, se pasa una función que Nest resolverá más tarde, cuando todo esté registrado.`,
  
  37: `\`@nestjs/config\` es un módulo oficial para gestionar **configuración y variables de entorno** de forma tipada y centralizada. Permite cargar \`.env\`, definir esquemas de validación y exponer un \`ConfigService\` inyectable en cualquier provider.`,
  
  38: `\`@nestjs/typeorm\` es el módulo que integra **TypeORM** con NestJS: facilita configurar la conexión a la base de datos, registrar entidades, usar repositorios inyectables y aprovechar los módulos dinámicos (\`TypeOrmModule.forRoot\`, \`forFeature\`, etc.).`,
  
  39: `NestJS ofrece una **arquitectura escalable y modular**, que facilita crecer por features y equipos, y una **integración de testing** (módulo de pruebas, \`TestingModule\`, mocks, etc.) que hace más sencillo escribir tests unitarios y de integración.`,
  
  40: `\`@UseInterceptors()\` aplica uno o varios **interceptors** a nivel de controlador o de método. Esto permite añadir lógica transversal (logging, transformación de respuesta, caching, etc.) sin mezclarla con la lógica de negocio del handler.`,
  
  41: `\`@nestjs/swagger\` genera documentación **OpenAPI/Swagger** a partir de tus controladores y DTOs, usando decoradores para describir rutas, parámetros, cuerpos, respuestas, etc., y exponiendo una UI interactiva (Swagger UI) para probar la API.`,
  
  42: `La autenticación JWT suele hacerse con \`@nestjs/jwt\` y Passport: definís una **estrategia JWT** (\`JwtStrategy\`), usás guards como \`AuthGuard('jwt')\` y generás tokens desde un servicio de auth. Nest integra todo esto de forma bastante automática.`,
  
  43: `Una Strategy de Passport en NestJS es una **clase que implementa una forma concreta de autenticación** (JWT, local, Google, etc.). Extiende de una estrategia de Passport y se integra con guards como \`AuthGuard('jwt')\` para proteger rutas.`,
  
  44: `\`@ApiProperty()\` se usa sobre propiedades de DTOs para **describirlas en Swagger** (tipo, ejemplo, descripción, requerido, etc.). Esto hace que los modelos aparezcan correctamente documentados en el schema OpenAPI.`,
  
  45: `\`@HttpCode(status)\` permite fijar explícitamente el **código de estado HTTP** que devolverá un handler (por ejemplo, \`@HttpCode(204)\` para un delete sin body), en lugar de usar los status por defecto que Nest asigna según el método HTTP.`,
  
  46: `Con \`@nestjs/websockets\` y decoradores como \`@WebSocketGateway()\`, \`@SubscribeMessage()\` podés crear **gateways WebSocket** que aceptan conexiones en tiempo real (por ejemplo, usando Socket.IO), integrados con el modelo de módulos y DI de Nest.`,
  
  47: `\`@nestjs/microservices\` es un módulo que permite construir **microservicios** en NestJS usando distintos **transportes** (TCP, Redis, MQTT, NATS, Kafka, etc.), con un modelo de mensajes (request/response, event-based) consistente.`,
  
  48: `Entre los transportes soportados por \`@nestjs/microservices\` están **Redis** y **MQTT**, que permiten que los microservicios se comuniquen mediante un broker de mensajes (pub/sub, topics) en lugar de HTTP directo.`,
  
  49: `\`@Header(name, value)\` establece **headers HTTP personalizados** en la respuesta de un handler, por ejemplo para controlar caché, tipo de contenido o cabeceras propias de la aplicación.`,
  
  50: `\`APP_FILTER\` es un **token especial** que permite registrar un Exception Filter como **filtro global** en el provider array (\`{ provide: APP_FILTER, useClass: ... }\`), de modo que se aplique a todas las rutas de la aplicación.`,
  
  51: `\`APP_PIPE\` es el token que se usa para registrar un **Pipe global** (por ejemplo, \`ValidationPipe\`) a través del sistema de providers \`{ provide: APP_PIPE, useClass: ValidationPipe }\`, aplicándolo a todas las peticiones automáticamente.`,
  
  52: `\`APP_GUARD\` permite registrar un **Guard global** que se ejecutará para todas las rutas, sin necesidad de usar \`@UseGuards()\` en cada controlador. Es típico para un guard de autenticación o roles por defecto.`,
  
  53: `El paquete \`@nestjs/throttler\` implementa **rate limiting**: define cuántas peticiones se pueden hacer por IP/usuario en un periodo de tiempo. Se integra mediante un módulo (\`ThrottlerModule\`) y un guard (\`ThrottlerGuard\`), configurable por decoradores.`,
  
  54: `Un Health Check es un endpoint (por ejemplo \`/health\`) que devuelve el **estado de la aplicación**: si está viva, si la DB responde, si los servicios externos están OK, etc. Es clave para orquestadores como Kubernetes o load balancers.`,
  
  55: `\`@nestjs/terminus\` es el módulo oficial para Health Checks: provee un **\`HealthCheckService\` y varios indicators** (base de datos, Redis, gRPC, etc.) para que definas un endpoint que compruebe todos los componentes críticos de la app.`,
  
  56: `\`@nestjs/schedule\` permite **programar tareas** con cron jobs, timeouts e intervals dentro de NestJS, integradas como providers. Es útil para tareas recurrentes como limpiezas, sincronizaciones, notificaciones, etc.`,
  
  57: `El decorador \`@Cron()\` marca un método como **tarea programada** que se ejecuta siguiendo una expresión cron (por ejemplo, cada minuto, cada día a las 3 AM, etc.), usando el módulo \`@nestjs/schedule\`.`,
  
  58: `El \`Logger\` integrado de NestJS es una clase que ofrece **métodos de logging por nivel** (\`log\`, \`error\`, \`warn\`, \`debug\`, \`verbose\`) y se integra con el sistema de logs del framework, permitiendo personalizar formato y destino si es necesario.`,
  
  59: `Entre los niveles de log de NestJS están **\`error\`** (para fallos graves) y **\`warn\`** (para situaciones anómalas pero no fatales). Además existen otros niveles como \`log\`, \`debug\` y \`verbose\` para distintos grados de detalle de salida.`
};

// Actualizar las explicaciones
data.nestjs.forEach((question, index) => {
  const explanationKey = index + 1;
  if (nestjsExplanations[explanationKey]) {
    question.explanation = nestjsExplanations[explanationKey];
  }
});

// Guardar el archivo actualizado
fs.writeFileSync(questionsFilePath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ Las 59 explicaciones de NestJS han sido actualizadas exitosamente en all-questions.json');
console.log(`📊 Total preguntas NestJS: ${data.nestjs.length}`);
