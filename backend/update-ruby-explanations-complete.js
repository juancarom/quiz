const fs = require('fs');
const path = require('path');

// Leer el archivo all-questions.json
const filePath = path.join(__dirname, 'all-questions.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('🔧 Actualizando las 74 explicaciones de Ruby...\n');

// Nuevas explicaciones para Ruby
const rubyExplanations = {
  1: `Ruby es un lenguaje de programación interpretado, dinámico y totalmente orientado a objetos. Prioriza la legibilidad y la productividad del desarrollador, con una sintaxis muy cercana al lenguaje natural. Al ser interpretado, el código se ejecuta directamente sin pasar por un paso de compilación previo.`,
  
  2: `Un símbolo en Ruby se define anteponiendo dos puntos al nombre, por ejemplo \`:nombre\` o \`:status\`. Los símbolos son identificadores inmutables que se almacenan una sola vez en memoria, por eso son muy usados como keys en hashes y para representar estados o nombres constantes.`,
  
  3: `Los métodos se definen con la palabra reservada \`def\` seguida del nombre, y se cierran con \`end\`, por ejemplo: \`def saludar(nombre); "Hola #{nombre}"; end\`. Por convención, los nombres de métodos usan snake_case y pueden terminar en \`?\`, \`!\` o \`=\` según su intención. El valor de retorno es la última expresión evaluada, por lo que muchas veces no hace falta usar \`return\` explícito.`,
  
  4: `Un bloque en Ruby es un fragmento de código anónimo que se pasa a un método, por ejemplo \`array.each { |x| puts x }\` o \`do ... end\`. Los parámetros del bloque se indican entre \`| |\`. Los bloques son la base de muchos iteradores y permiten escribir código muy expresivo sin necesidad de definir métodos con nombre.`,
  
  5: `Las clases se definen con la palabra clave \`class\` en minúsculas seguida del nombre de la clase en CamelCase, por ejemplo \`class Usuario ... end\`. Dentro de la clase se definen métodos y variables de instancia que describen el comportamiento y el estado de los objetos creados con \`Usuario.new\`.`,
  
  6: `Un \`Proc\` es un objeto que encapsula un bloque de código para poder guardarlo en variables, pasarlo como argumento y ejecutarlo más tarde con \`call\`. Se crea con \`Proc.new { |x| x * 2 }\` o \`proc { ... }\`. A diferencia de los lambdas, los \`Proc\` son más laxos con la cantidad de argumentos y un \`return\` dentro de ellos sale del método que los contiene.`,
  
  7: `Un lambda es un tipo especial de \`Proc\` que se comporta más parecido a un método normal. Se crea con \`lambda { |x| x * 2 }\` o \`->(x) { x * 2 }\`. Valida estrictamente la cantidad de argumentos y un \`return\` dentro del lambda solo sale del lambda, no del método que lo contiene.`,
  
  8: `La herencia se declara con el operador \`<\`: \`class Hijo < Padre\`. La clase hija hereda los métodos y comportamiento de la clase padre, pudiendo sobrescribir métodos (\`override\`) o añadir otros nuevos. Ruby soporta herencia simple, por lo que cada clase solo puede tener una superclase directa.`,
  
  9: `Un módulo (\`module\`) es un contenedor de métodos y constantes que no puede instanciarse. Se usa principalmente para compartir comportamiento entre clases mediante mixins (\`include\`, \`extend\`, \`prepend\`) y como namespace para organizar código y evitar colisiones de nombres. Es una alternativa flexible a la herencia para reutilizar lógica.`,
  
  10: `\`each\` es el iterador básico de Ruby para arrays y otras colecciones. Ejecuta el bloque que recibe para cada elemento: \`[1,2,3].each { |n| puts n }\`. Devuelve la colección original, por lo que es ideal cuando queremos efectos secundarios (imprimir, acumular, etc.) y no transformar la colección.`,
  
  11: `\`initialize\` es el método constructor de una clase y se llama automáticamente cuando haces \`MiClase.new(...)\`. Allí se suelen recibir parámetros y se inicializan variables de instancia (\`@variable\`) que representarán el estado del objeto. No se invoca explícitamente; siempre va ligado a \`.new\`.`,
  
  12: `Las variables de instancia comienzan con \`@\`, por ejemplo \`@nombre\`. Cada objeto tiene sus propias copias de estas variables, que viven mientras viva la instancia. No son accesibles directamente desde fuera de la clase, por lo que se exponen mediante métodos o usando \`attr_reader\`, \`attr_writer\` o \`attr_accessor\`.`,
  
  13: `Las variables de clase usan \`@@\` (doble arroba), por ejemplo \`@@contador\`. Son compartidas por todas las instancias de la clase y también por las subclases. Se usan para almacenar estado común (como contadores globales), pero pueden ser confusas; muchas veces se prefiere usar variables de instancia de clase (\`@variable\` dentro del contexto de la clase).`,
  
  14: `El operador \`||=\` equivale a \`variable = variable || valor\`. Es decir, asigna el valor solo si la variable es \`nil\` o \`false\`. Por ejemplo, \`@cache ||= calcular_valor\` inicializa \`@cache\` solo una vez. Es muy usado para valores por defecto y *memoization*.`,
  
  15: `Duck typing significa que Ruby se fija en lo que un objeto **puede hacer** (sus métodos) y no en su clase exacta. "Si camina como pato y hace cuac como pato, lo tratamos como pato". Por ejemplo, cualquier objeto que implemente \`each\` puede usarse donde se espera algo enumerable, sin importar su tipo concreto.`,
  
  16: `El manejo de excepciones se hace con \`begin ... rescue ... end\`. Dentro de \`begin\` se pone el código que puede fallar y en \`rescue\` se captura la excepción, opcionalmente con una variable \`rescue MiError => e\`. Se pueden añadir bloques \`else\` (si no hubo error) y \`ensure\` (se ejecuta siempre, haya error o no).`,
  
  17: `Un *singleton method* es un método definido solo en una instancia concreta, no en toda la clase. Por ejemplo: \`def objeto.saludar; "hola"; end\`. Ese método existe únicamente para \`objeto\` y no para otras instancias de la misma clase. Ruby lo implementa usando la *singleton class* (o *eigenclass*) de ese objeto.`,
  
  18: `Metaprogramación es la capacidad de Ruby de modificar clases, métodos y objetos en tiempo de ejecución. Esto incluye definir métodos dinámicamente (\`define_method\`), abrir clases existentes, interceptar mensajes con \`method_missing\` y generar DSLs. Es muy poderosa y usada en frameworks como Rails, pero debe usarse con moderación para no perder claridad.`,
  
  19: `El método \`to_i\` convierte un string a entero: \`"42".to_i #=> 42\`. Es tolerante con entradas no numéricas: si no encuentra números al inicio, devuelve 0, y si el string empieza con números y luego texto, toma solo la parte numérica (\`"10abc".to_i #=> 10\`). Para una conversión más estricta se puede usar \`Integer("42")\`.`,
  
  20: `Un \`Hash\` es una colección de pares clave-valor, por ejemplo \`{ nombre: "Ana", edad: 30 }\`. Las claves suelen ser símbolos o strings y se accede con \`hash[:nombre]\`. Es similar a un diccionario en Python u objeto "plano" en JavaScript, y es fundamental para pasar opciones y representar datos estructurados.`,
  
  21: `Los hashes se recorren con \`each\` o \`each_pair\`, que ceden al bloque tanto la clave como el valor: \`hash.each { |clave, valor| puts "#{clave}: #{valor}" }\`. Ambos métodos devuelven el propio hash y permiten trabajar cómodamente con pares clave-valor.`,
  
  22: `\`yield\` se usa dentro de un método para ejecutar el bloque que se le pasó a ese método. Por ejemplo: \`def envoltorio; puts "antes"; yield; puts "después"; end\`. Si llamas \`envoltorio { puts "bloque" }\`, el bloque se ejecuta en el punto donde aparece \`yield\`. Puedes pasar argumentos: \`yield(arg1, arg2)\`.`,
  
  23: `Ruby tiene varios tipos de variables: locales (\`nombre\`), de instancia (\`@nombre\`), de clase (\`@@nombre\`) y globales (\`$nombre\`). Las variables de clase (\`@@var\`) comparten valor entre todas las instancias de la clase, mientras que las globales (\`$var\`) son accesibles desde cualquier parte del programa, por lo que deben usarse con mucho cuidado.`,
  
  24: `La *singleton class* (o *eigenclass*) es una clase oculta que Ruby crea para cada objeto. En ella se guardan los métodos definidos solo para ese objeto (singleton methods). Se puede abrir con la sintaxis \`class << objeto ... end\`. Permite dar comportamiento único a una instancia sin afectar al resto.`,
  
  25: `El operador más común para concatenar strings es \`+\`, por ejemplo \`"Hola " + "mundo"\`. También se usan \`<<\` y \`concat\`, que modifican el string receptor in-place. Elegir entre \`+\` o \`<<\` depende de si quieres crear un nuevo objeto o mutar el existente.`,
  
  26: `\`Array#join\` une los elementos de un array en un solo string, usando opcionalmente un separador: \`["a", "b", "c"].join(",") #=> "a,b,c"\`. Es muy útil para mostrar listas formateadas y generar líneas de texto a partir de colecciones.`,
  
  27: `\`send\` permite invocar un método por su nombre (string o símbolo) de forma dinámica: \`obj.send(:saludar, "Ana")\` es equivalente a \`obj.saludar("Ana")\`. Es útil para metaprogramación, aunque en código moderno se prefiere \`public_send\` cuando no quieres saltarte la visibilidad de métodos privados.`,
  
  28: `\`attr_accessor :nombre\` define automáticamente dos métodos en la clase: \`nombre\` (getter) y \`nombre=\` (setter) para la variable de instancia \`@nombre\`. Evita escribir manualmente métodos triviales y hace el código más conciso. Sus "hermanos" son \`attr_reader\` (solo lectura) y \`attr_writer\` (solo escritura).`,
  
  29: `Los métodos de ayuda para exponer variables de instancia son \`attr_reader\` (solo getter), \`attr_writer\` (solo setter) y \`attr_accessor\` (getter y setter). Se definen a nivel de clase y generan automáticamente métodos de acceso para las variables de instancia indicadas.`,
  
  30: `\`super\` llama al método con el mismo nombre definido en la superclase. Si se usa sin paréntesis, pasa los mismos argumentos que recibió el método actual; si se usa como \`super()\`, no pasa ninguno. Es esencial cuando quieres extender el comportamiento del método padre en lugar de reemplazarlo por completo.`,
  
  31: `\`method_missing\` se ejecuta cuando un objeto recibe un mensaje (llamada de método) que no tiene definido. Puedes sobrescribirlo para manejar métodos "dinámicos", crear DSLs o delegar llamadas. Es potente, pero conviene usarlo con cuidado y siempre acompañarlo de una implementación coherente de \`respond_to_missing?\`.`,
  
  32: `\`object.freeze\` marca un objeto como inmutable: a partir de ese momento, cualquier intento de modificarlo lanzará un error \`FrozenError\`. Se usa para garantizar que cierto estado no cambie, por ejemplo valores constantes, configuraciones o estructuras compartidas.`,
  
  33: `Un \`Range\` representa un intervalo de valores, por ejemplo \`1..10\` o \`'a'..'z'\`. Puede ser inclusivo o exclusivo en el límite superior. Los ranges se usan para iterar, comparar valores dentro de un rango, generar secuencias, y también en expresiones regulares y case/when.`,
  
  34: `Un range se define usando dos o tres puntos: \`1..10\` incluye del 1 al 10, mientras que \`1...10\` incluye del 1 al 9 (excluye el último). También se pueden hacer ranges de letras (\`'a'..'z'\`). Son objetos de la clase \`Range\` y se pueden usar con \`each\`, \`include?\`, etc.`,
  
  35: `En un range \`a..b\`, el límite superior \`b\` está incluido; en \`a...b\`, el límite superior está excluido. Por ejemplo, \`(1..3).to_a #=> [1,2,3]\` mientras que \`(1...3).to_a #=> [1,2]\`. Esta diferencia es clave cuando trabajas con índices o límites de bucles.`,
  
  36: `La palabra clave \`alias\` crea un nombre alternativo para un método ya existente. Por ejemplo: \`alias :nuevo_nombre :viejo_nombre\`. Ambos nombres apuntan al mismo método. Es útil cuando quieres cambiar el comportamiento de un método pero conservar una referencia al original.`,
  
  37: `\`undef\` elimina la definición de un método en la clase o módulo actual, de modo que no puede ser llamado ni siquiera con \`super\`. Por ejemplo: \`undef :to_s\` hace que esa clase no tenga \`to_s\` disponible. Es más radical que simplemente redefinir el método.`,
  
  38: `Los símbolos (\`:nombre\`) son inmutables y se almacenan solo una vez en memoria, por eso son más ligeros que los strings a la hora de representar etiquetas o keys. Son ampliamente usados como claves de hashes (\`{ status: :ok }\`) y para representar estados o tipos de forma eficiente.`,
  
  39: `El método estándar para convertir un string a símbolo es \`String#to_sym\`, por ejemplo \`"nombre".to_sym #=> :nombre\`. También existe \`intern\`, que es equivalente. Esto se usa mucho cuando recibes datos como texto y quieres trabajar con símbolos de forma más eficiente.`,
  
  40: `\`self\` representa el objeto actual en el contexto donde se está ejecutando el código. Dentro de un método de instancia, \`self\` es la instancia; dentro del contexto de clase, \`self\` es la propia clase. Se usa para llamar métodos de la misma clase/objeto y para definir métodos de clase (\`def self.metodo\`).`,
  
  41: `Un \`Enumerator\` encapsula una secuencia y la lógica para recorrerla, permitiendo iterar más tarde o de formas avanzadas. Muchos métodos como \`each\` devuelven un enumerador si no se les pasa un bloque: \`array.each\` devuelve un \`Enumerator\` que luego puedes encadenar con otros métodos (\`map\`, \`with_index\`, etc.).`,
  
  42: `\`reduce\` (alias \`inject\`) recorre una colección acumulando un resultado en cada paso. Por ejemplo, \`[1,2,3].reduce(0) { |acc, n| acc + n } #=> 6\`. Es muy útil para sumar, multiplicar, combinar hashes o construir estructuras más complejas a partir de una colección.`,
  
  43: `\`select\` recorre una colección y devuelve una **nueva** con solo los elementos para los que el bloque devuelve \`true\`. Por ejemplo, \`[1,2,3,4].select { |n| n.even? } #=> [2,4]\`. En hashes, devuelve un hash filtrado por clave/valor según la condición del bloque.`,
  
  44: `\`reject\` es el complemento de \`select\`: devuelve una nueva colección con los elementos para los que el bloque devuelve \`false\` o \`nil\`. Por ejemplo, \`[1,2,3,4].reject { |n| n.even? } #=> [1,3]\`. También funciona sobre hashes, devolviendo un hash sin las entradas rechazadas.`,
  
  45: `\`map\` aplica el bloque a cada elemento de la colección y devuelve un nuevo array con los resultados: \`[1,2,3].map { |n| n * 2 } #=> [2,4,6]\`. No modifica la colección original (a menos que uses \`map!\`). Es central para un estilo de programación más funcional.`,
  
  46: `\`each\` se usa para iterar por efectos secundarios (imprimir, guardar, etc.) y devuelve la colección original. \`map\`, en cambio, construye y devuelve un **nuevo** array con los valores transformados. Si necesitas un resultado transformado, usa \`map\`; si solo quieres recorrer, \`each\`.`,
  
  47: `\`tap\` llama al bloque pasándole el objeto receptor y luego devuelve ese mismo objeto. Por ejemplo: \`usuario.tap { |u| u.nombre = "Ana"; puts u.inspect }\`. Es útil para inicializar objetos en cadena y para depurar sin romper cadenas de métodos.`,
  
  48: `\`dig\` permite acceder a valores anidados en hashes, arrays u objetos similares sin levantar errores si algo es \`nil\`. Por ejemplo: \`data.dig(:usuario, :perfil, :email)\` devuelve \`nil\` si alguna de esas claves intermedias no existe, en lugar de lanzar \`NoMethodError\`.`,
  
  49: `Las expresiones regulares (regex) son patrones que describen conjuntos de cadenas de texto. En Ruby se usan para buscar, validar y reemplazar texto, por ejemplo \`/\\A\\d{3}\\z/\` para tres dígitos. Están integradas en muchos métodos de \`String\` como \`match\`, \`gsub\`, \`scan\`, etc.`,
  
  50: `Una regex se define normalmente encerrando el patrón entre barras \`/.../\`, por ejemplo \`/\\d+/\`, o usando \`Regexp.new("patrón")\`. La forma con barras es la más común y soporta flags como \`/i\` para case-insensitive.`,
  
  51: `El operador \`=~\` compara un string con una expresión regular. Devuelve el índice de la primera coincidencia o \`nil\` si no hay match: \`"abc123" =~ /\\d+/ #=> 3\`. Se usa mucho en condicionales y también establece variables globales como \`$&\`, \`$1\`, \`$2\`, etc. para los grupos coincidentes.`,
  
  52: `\`String#match\` (o \`Regexp#match\`) busca una coincidencia y devuelve un objeto \`MatchData\` con información detallada del match y sus grupos de captura, o \`nil\` si no hay coincidencia. Por ejemplo: \`"ana@example.com".match(/(.+)@(.+)/)\` te permite acceder a los grupos con \`m[1]\`, \`m[2]\`, etc.`,
  
  53: `Después de una coincidencia de regex, \`$1\`, \`$2\`, \`$3\`, etc. contienen los valores de los grupos de captura 1, 2, 3, en orden. Por ejemplo, \`/(\\d+)-(\\d+)/.match("10-20")\` hace que \`$1 == "10"\` y \`$2 == "20"\`. Son variables globales especiales de Ruby.`,
  
  54: `\`gsub\` ("global substitute") reemplaza **todas** las apariciones de un patrón (string o regex) por otro string o por el resultado de un bloque. Por ejemplo: \`"hola mundo".gsub("o", "0") #=> "h0la mund0"\`. No modifica el original a menos que uses \`gsub!\`.`,
  
  55: `\`sub\` reemplaza solo la **primera** coincidencia del patrón, mientras que \`gsub\` reemplaza todas. Por ejemplo: \`"foo foo".sub("foo","bar") #=> "bar foo"\` \`"foo foo".gsub("foo","bar") #=> "bar bar"\`.`,
  
  56: `\`prepend\` inserta un módulo en la cadena de ancestros **antes** de la propia clase, de modo que sus métodos tienen prioridad sobre los métodos de la clase. Es útil para decorar o interceptar comportamiento sin modificar directamente la implementación original.`,
  
  57: `Los módulos se pueden "mezclar" de varias formas: \`include\`: añade los métodos del módulo como **métodos de instancia** de la clase. \`extend\`: añade los métodos del módulo como **métodos de clase** del objeto/clase donde se usa. \`prepend\`: como \`include\`, pero con mayor precedencia que los métodos de la clase. Estas tres formas permiten reutilizar comportamiento sin herencia.`,
  
  58: `\`extend\` agrega los métodos de un módulo como métodos **de clase** (o del objeto sobre el que se llama). Por ejemplo: \`class Usuario; extend MiModulo; end\` hace que los métodos de \`MiModulo\` se puedan llamar como \`Usuario.metodo_modulo\`.`,
  
  59: `\`Comparable\` es un módulo que, al incluirlo en una clase, genera operadores como \`<\`, \`<=\`, \`==\`, \`>=\` y \`>\` a partir de la implementación del operador \`<=>\`. Es útil para definir objetos que se pueden ordenar naturalmente, como Fechas, Dinero, etc.`,
  
  60: `Para aprovechar \`Comparable\`, la clase debe implementar el operador \`<=>\`, conocido como *spaceship operator*. Debe devolver \`-1\` si \`self\` es menor, \`0\` si es igual y \`1\` si es mayor que el otro objeto. Con eso, \`Comparable\` genera el resto de operadores de comparación.`,
  
  61: `\`Enumerable\` es un módulo que aporta muchos métodos de colecciones (\`map\`, \`select\`, \`reduce\`, \`any?\`, etc.) siempre que la clase implemente al menos un método \`each\`. Arrays, Hashes y muchos otros tipos lo incluyen, lo que permite un estilo uniforme de trabajo con colecciones.`,
  
  62: `\`defined?\` es un operador que devuelve una cadena describiendo qué está definido (\`"local-variable"\`, \`"method"\`, etc.) o \`nil\` si no lo está. Se usa para comprobar la existencia de variables, métodos o constantes sin lanzar errores.`,
  
  63: `El operador \`<=>\` compara dos objetos y devuelve \`-1\` si el receptor es menor, \`0\` si son iguales y \`1\` si es mayor. Es la base de \`Comparable\` y se usa internamente para ordenar arrays (\`sort\`) y otras operaciones de comparación.`,
  
  64: `\`__FILE__\` es una constante mágica que contiene la ruta del archivo Ruby donde se está evaluando ese código. Se usa, por ejemplo, para construir rutas relativas (\`File.dirname(__FILE__)\`) o para saber desde qué archivo se ejecuta un script.`,
  
  65: `\`__LINE__\` es una constante mágica que devuelve el número de línea actual dentro del archivo Ruby. Es útil para logging, debugging y para generar mensajes de error que indiquen de dónde vienen.`,
  
  66: `\`require\` carga un archivo (o gema) y evalúa su contenido, pero solo la primera vez que se invoca para ese path. Si se llama de nuevo con el mismo archivo, no lo recarga. Es la forma habitual de traer dependencias a tu código.`,
  
  67: `\`require\` carga un archivo solo una vez por ejecución (lo marca como cargado) mientras que \`load\` vuelve a cargar y reevaluar el archivo **cada vez** que se llama. \`load\` se usa cuando necesitas recargar código dinámicamente, como en scripts o REPLs.`,
  
  68: `\`require_relative\` funciona como \`require\`, pero interpreta la ruta de forma relativa al archivo donde se escribe la llamada, no al \`$LOAD_PATH\`. Es muy útil para organizar proyectos pequeños o librerías donde los archivos están en carpetas cercanas.`,
  
  69: `Un *gem* es un paquete de código Ruby reutilizable que se puede distribuir e instalar fácilmente (por ejemplo, \`rails\`, \`rspec\`, \`devise\`). Define su metadata y dependencias en un \`gemspec\` y se instala normalmente con \`gem install\` o a través de Bundler.`,
  
  70: `Bundler es la herramienta estándar para gestionar dependencias (gems) en proyectos Ruby. Lee el \`Gemfile\`, resuelve versiones compatibles y genera un \`Gemfile.lock\`. Luego, \`bundle exec\` garantiza que tu aplicación use exactamente las versiones definidas.`,
  
  71: `El \`Gemfile\` es el archivo donde declaras las dependencias de tu proyecto Ruby: qué gems necesitas y opcionalmente sus versiones o grupos (\`group :test do ... end\`). Bundler lo usa como fuente de verdad para instalar y bloquear las versiones.`,
  
  72: `\`bundle install\` lee el \`Gemfile\`, resuelve y descarga las gems necesarias (y sus dependencias) y actualiza el \`Gemfile.lock\`. Es el comando que se ejecuta al configurar un proyecto Ruby o Rails recién clonado.`,
  
  73: `RSpec es un framework de testing para Ruby basado en BDD (Behavior-Driven Development). Permite describir el comportamiento esperado del código con una sintaxis muy legible, usando bloques \`describe\`, \`context\`, \`it\` y expectativas con \`expect(...).to\`.`,
  
  74: `En RSpec, \`it\` define un ejemplo o caso de prueba (\`it "hace algo" do ... end\`) y \`expect\` se usa para definir aserciones (\`expect(resultado).to eq(42)\`). Juntos permiten expresar de forma clara qué comportamiento se espera del código bajo prueba.`
};

// Actualizar las explicaciones de Ruby
data.ruby.forEach((question, index) => {
  const explanationNumber = index + 1;
  if (rubyExplanations[explanationNumber]) {
    question.explanation = rubyExplanations[explanationNumber];
  }
});

// Guardar el archivo actualizado
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ Las 74 explicaciones de Ruby han sido actualizadas exitosamente en all-questions.json');
console.log(`📊 Total preguntas Ruby: ${data.ruby.length}`);
console.log('\n🎉 Ruby completado con explicaciones de alta calidad!');
