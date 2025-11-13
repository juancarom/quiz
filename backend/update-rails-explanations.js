const fs = require('fs');
const path = require('path');

// Leer el archivo all-questions.json
const filePath = path.join(__dirname, 'all-questions.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Nuevas explicaciones para Rails
const railsExplanations = {
  1: `Rails sigue el patrón **MVC**, separando la lógica de negocio (Model), la interfaz (View) y el flujo de peticiones/respuestas (Controller), lo que organiza mejor el código y responsabilidades.`,
  
  2: `ActiveRecord es el ORM de Rails: cada modelo Ruby mapea a una tabla y proporciona métodos listos para usar para operaciones CRUD, asociaciones y validaciones sobre la base de datos.`,
  
  3: `\`rails generate model Nombre\` crea el modelo, la migración y archivos relacionados. Es la forma estándar de definir nuevas tablas/modelos en una app Rails.`,
  
  4: `\`rails db:migrate\` ejecuta todas las migraciones pendientes, aplicando los cambios definidos en los archivos de migración al esquema de la base de datos.`,
  
  5: `En Rails, las migraciones son scripts Ruby que describen cambios en la base de datos (crear tablas, columnas, índices, etc.), permitiendo versionar y evolucionar el esquema de forma segura.`,
  
  6: `Las rutas en Rails se definen en \`config/routes.rb\`, donde se mapean URLs y verbos HTTP a acciones de controladores usando helpers como \`resources\` o \`get/post\`.`,
  
  7: `Un callback es un método del modelo que se ejecuta automáticamente en ciertos momentos del ciclo de vida del registro, como antes de validar, guardar o después de crear.`,
  
  8: `\`after_create\` es un callback que se ejecuta justo después de que un registro haya sido creado y guardado por primera vez en la base de datos.`,
  
  9: `El problema N+1 ocurre cuando se hace una query por registro relacionado. Usar \`includes\`/eager loading carga las asociaciones en una sola consulta adicional, evitando muchas querys pequeñas.`,
  
  10: `Sidekiq es una librería que permite ejecutar trabajos en segundo plano (background jobs) usando Redis, ideal para tareas lentas como emails, procesar archivos o integraciones externas.`,
  
  11: `Un scope es una consulta reutilizable definida en el modelo (por ejemplo \`scope :active, -> { where(active: true) }\`) que devuelve un objeto ActiveRecord::Relation y se puede encadenar.`,
  
  12: `Las validaciones se declaran en el modelo con macros como \`validates :name, presence: true\`, asegurando que los datos cumplan ciertas reglas antes de guardarse.`,
  
  13: `Un helper es un módulo con métodos de ayuda usados en las vistas (por ejemplo para formatear fechas o generar enlaces), manteniendo la lógica de presentación fuera de los controladores.`,
  
  14: `Las asociaciones \`has_many\` se definen en el modelo, por ejemplo \`has_many :items\`, indicando que un registro puede estar relacionado con muchos registros de otra tabla.`,
  
  15: `El Asset Pipeline de Rails gestiona CSS, JS e imágenes: permite concatenar, minificar, precompilar y servir estos archivos de forma eficiente en producción.`,
  
  16: `La configuración de la base de datos se define en \`config/database.yml\`, donde se especifican adaptador, nombre de base de datos, usuario, contraseña y settings por entorno.`,
  
  17: `Un partial es una vista parcial (por ejemplo \`_form.html.erb\`) que representa un fragmento reutilizable de HTML, normalmente renderizado dentro de otras vistas.`,
  
  18: `Devise es una gema muy usada en Rails que proporciona un sistema de autenticación completo: registro, login, recuperación de contraseña, confirmación de email, etc.`,
  
  19: `\`rails server\` o \`rails s\` arrancan el servidor de desarrollo local de Rails, normalmente en \`http://localhost:3000\`, para probar la aplicación.`,
  
  20: `Un concern es un módulo (en \`app/models/concerns\` o \`app/controllers/concerns\`) donde se coloca lógica compartida para incluirla en varios modelos o controladores sin duplicar código.`,
  
  21: `El Asset Pipeline no solo concatena y minifica CSS/JS, también precompila assets y puede procesar imágenes, SASS/SCSS, CoffeeScript, etc., generando versiones optimizadas para producción.`,
  
  22: `Rails trae tres entornos por defecto: \`development\`, \`test\` y \`production\`. Cada uno tiene configuración distinta; aquí se destacan \`test\` y \`production\` como entornos clave para pruebas y despliegue.`,
  
  23: `Strong Parameters obliga a declarar explícitamente qué parámetros se permiten para un modelo, protegiendo de asignación masiva de atributos no deseados o peligrosos.`,
  
  24: `En el controlador, se usa algo como \`params.require(:user).permit(:name, :email)\` para exigir una clave raíz (\`require\`) y listar los atributos permitidos (\`permit\`).`,
  
  25: `Un filtro (como \`before_action\`) es un método del controlador que se ejecuta antes, después o alrededor de una acción, por ejemplo para autenticar usuarios o cargar recursos comunes.`,
  
  26: `\`after_action\` se ejecuta después de la acción y \`around_action\` envuelve la acción antes y después, permitiendo lógica que rodea la ejecución (como medir tiempos, transacciones, etc.).`,
  
  27: `\`render\` genera una respuesta (vista, JSON, texto…) dentro de la misma petición, sin redirigir ni hacer un nuevo request al servidor.`,
  
  28: `\`redirect_to\` envía una redirección HTTP al navegador para que haga una nueva petición a otra URL o acción, cambiando la ruta en el navegador.`,
  
  29: `\`render\` responde directamente en esa misma petición, mientras que \`redirect_to\` manda una redirección, provocando una nueva petición del cliente a otra URL.`,
  
  30: `\`flash\` es un hash especial que permite pasar mensajes (por ejemplo de éxito o error) a la siguiente petición, típico para mostrar avisos después de un \`redirect_to\`.`,
  
  31: `Claves como \`flash[:alert]\` o \`flash[:error]\` se usan para mostrar mensajes de error. También es común \`flash[:notice]\` para mensajes informativos o de éxito.`,
  
  32: `Un layout es una plantilla marco (por ejemplo \`application.html.erb\`) que envuelve al contenido de cada vista, compartiendo cabeceras, menús, pie de página, etc.`,
  
  33: `Por convención, los layouts se guardan en \`app/views/layouts/\`. Rails usará \`application.html.erb\` como layout por defecto si no se indica otro.`,
  
  34: `En un layout, \`yield\` marca el punto donde se insertará el contenido de la vista específica que se está renderizando en esa petición.`,
  
  35: `Los helpers son módulos con métodos que ayudan en las vistas (por ejemplo formatear textos, generar enlaces o botones) y mantienen las vistas más limpias y DRY.`,
  
  36: `\`link_to\` genera un enlace \`<a>\` en HTML. Recibe normalmente el texto a mostrar y la ruta o URL a la que apuntará, además de opciones extra (clases CSS, método, etc.).`,
  
  37: `\`form_with\` es el helper moderno para construir formularios, ya sea asociados a un modelo o no, generando automáticamente campos, acción y método HTTP apropiados.`,
  
  38: `\`belongs_to\` y \`has_one\` son tipos de asociaciones. \`belongs_to\` indica que el modelo tiene una clave foránea a otro, y \`has_one\` indica una relación uno-a-uno desde el otro lado.`,
  
  39: `Una asociación polimórfica permite que un modelo (por ejemplo \`Comment\`) pertenezca a diferentes modelos (\`Post\`, \`Photo\`, etc.) usando columnas como \`commentable_id\` y \`commentable_type\`.`,
  
  40: `Nested resources son rutas anidadas en \`routes.rb\`, por ejemplo \`resources :posts do resources :comments end\`, reflejando que comentarios pertenecen a un post.`,
  
  41: `Un \`namespace\` en rutas agrupa rutas bajo un prefijo y módulo de controladores, por ejemplo \`namespace :admin do ... end\` para rutas y controladores de administración.`,
  
  42: `ActiveJob es la capa de abstracción de Rails para trabajos en segundo plano; define jobs de forma unificada y luego los envía al adaptador de cola que elijas (Sidekiq, Resque, etc.).`,
  
  43: `Resque y Delayed Job son adaptadores de colas soportados por ActiveJob; permiten ejecutar los jobs definidos en Rails usando distintos backends de procesamiento.`,
  
  44: `ActionCable es el framework de WebSockets de Rails, que integra canales en tiempo real dentro de la aplicación para cosas como chats o notificaciones en vivo.`,
  
  45: `Turbo (parte de Hotwire) permite construir experiencias tipo SPA usando HTML sobre el cable, minimizando la necesidad de JavaScript complejo en el frontend.`,
  
  46: `Stimulus es un pequeño framework JavaScript orientado a controlar el HTML existente con controladores ligeros, complementando a Turbo sin reemplazar el HTML renderizado por Rails.`,
  
  47: `Las validaciones personalizadas son métodos propios que implementan reglas de validación específicas que no cubren los helpers estándar como \`presence\`, \`uniqueness\`, etc.`,
  
  48: `Para crear una validación custom defines un método en el modelo y lo registras con \`validate :nombre_del_metodo\`, donde dentro del método agregas errores al objeto si algo no se cumple.`,
  
  49: `\`accepts_nested_attributes_for\` permite que un modelo reciba y guarde atributos de asociaciones relacionadas a través de un mismo formulario (por ejemplo un \`Post\` y sus \`Comments\`).`,
  
  50: `Un Service Object es una clase dedicada a encapsular una pieza de lógica de negocio compleja o un caso de uso (por ejemplo \`CreateOrder\`), manteniendo modelos y controladores más simples.`,
  
  51: `Rack define una interfaz estándar entre servidores web Ruby (Puma, Unicorn…) y frameworks como Rails, permitiendo que la aplicación reciba el \`env\` y devuelva un status, headers y body.`,
  
  52: `Un middleware es un componente Rack que intercepta las peticiones y respuestas (por ejemplo para logging, compresión, cookies, etc.) antes de que lleguen a Rails o salgan al cliente.`,
  
  53: `En \`config/application.rb\` puedes añadir middlewares a la pila con \`config.middleware.use MiMiddleware\`, insertando tu propia lógica en el flujo de peticiones/respuestas.`,
  
  54: `Action Mailer es el módulo de Rails para construir y enviar emails, generando tanto el contenido (texto/HTML) como encargándose de la entrega a través de un servidor SMTP u otros servicios.`,
  
  55: `\`rails generate mailer NombreMailer\` crea un mailer con sus métodos, vistas y archivos de prueba, listo para definir emails a enviar desde la aplicación.`,
  
  56: `Active Storage es la solución integrada de Rails para gestionar archivos subidos (uploads), almacenándolos en disco o en servicios cloud como S3, GCS o Azure.`,
  
  57: `Active Storage soporta múltiples servicios de almacenamiento; aquí se destacan Google Cloud Storage y Azure Storage, además de otros como Amazon S3 y almacenamiento local.`,
  
  58: `\`has_one_attached :avatar\` declara que el modelo tendrá un único archivo adjunto (por ejemplo una foto de perfil), gestionado por Active Storage.`,
  
  59: `\`has_many_attached :images\` declara que el modelo podrá tener múltiples archivos adjuntos (por ejemplo varias fotos), todos manejados por Active Storage.`,
  
  60: `"Convención sobre configuración" significa que Rails asume nombres y estructuras por defecto (carpetas, nombres de tablas, rutas, etc.), reduciendo al mínimo la configuración manual.`,
  
  61: `DRY ("Don't Repeat Yourself") anima a extraer lógica repetida a métodos, helpers, concerns o servicios, manteniendo el código más limpio y fácil de mantener.`,
  
  62: `REST es un estilo arquitectónico donde los recursos se exponen mediante URLs y se manipulan con verbos HTTP (GET, POST, PUT/PATCH, DELETE). Rails estructura sus controladores y rutas siguiendo este estilo.`,
  
  63: `POST se usa típicamente para crear recursos; PUT/PATCH para actualizarlos. Junto con GET y DELETE forman la base de las operaciones REST sobre recursos.`,
  
  64: `\`resources :users\` en \`routes.rb\` genera automáticamente las 7 rutas RESTful estándar (index, show, new, create, edit, update, destroy) para ese recurso.`,
  
  65: `Las acciones RESTful estándar incluyen pares como \`new/create\` (mostrar formulario y crear) y \`edit/update\` (editar y guardar cambios), junto con \`index\`, \`show\` y \`destroy\`.`,
  
  66: `Una \`member\` route es una ruta extra que actúa sobre un recurso concreto (con id), por ejemplo \`/users/:id/activate\`, definida dentro de \`member do ... end\`.`,
  
  67: `Una \`collection\` route actúa sobre el conjunto completo de recursos, sin id, por ejemplo \`/users/search\`, definida dentro de \`collection do ... end\`.`,
  
  68: `ActiveRecord \`enum\` permite mapear un atributo entero a un conjunto de valores simbólicos, generando métodos de ayuda como \`user.admin!\` o \`user.role == "admin"\`.`,
  
  69: `\`counter_cache\` mantiene en una columna (por ejemplo \`posts_count\`) el número de registros asociados, evitando hacer \`COUNT(*)\` cada vez y mejorando el rendimiento.`,
  
  70: `La opción \`touch: true\` en una asociación hace que, al guardar o cambiar el hijo, se actualice el timestamp (\`updated_at\`) del modelo padre asociado.`,
  
  71: `\`dependent\` define qué ocurre con los registros hijos cuando se borra el padre, por ejemplo eliminar los hijos o dejar sus claves foráneas en \`NULL\`.`,
  
  72: `\`dependent: :delete_all\` borra todos los registros asociados directamente en la base de datos, mientras que \`:nullify\` solo pone a \`NULL\` la clave foránea sin borrarlos.`,
  
  73: `\`inverse_of\` indica la asociación inversa entre dos modelos, permitiendo que ActiveRecord reutilice objetos en memoria y evite queries innecesarias.`,
  
  74: `\`delegate\` permite exponer métodos de un objeto asociado desde el modelo actual, por ejemplo \`delegate :name, to: :user\` para llamar \`order.user_name\` de forma más cómoda.`,
  
  75: `En validaciones, \`presence\` se usa como \`validates :name, presence: true\` para asegurar que un atributo no esté en blanco. Además, el método \`presence\` en Ruby on Rails devuelve el valor o \`nil\` si está vacío.`
};

// Actualizar las explicaciones de Rails
data.rails.forEach((question, index) => {
  const explanationNumber = index + 1;
  if (railsExplanations[explanationNumber]) {
    question.explanation = railsExplanations[explanationNumber];
  }
});

// Guardar el archivo actualizado
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ Las 75 explicaciones de Rails han sido actualizadas exitosamente en all-questions.json');
console.log(`📊 Total preguntas Rails: ${data.rails.length}`);
