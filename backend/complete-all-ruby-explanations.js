const fs = require('fs');

// Lee el archivo all-questions.json
const data = JSON.parse(fs.readFileSync('./all-questions.json', 'utf8'));

// Obtiene las preguntas de Ruby
const rubyQuestions = data.ruby || [];

// Función para generar explicaciones detalladas basadas en el contenido
function generateDetailedExplanation(question, correctAnswers) {
  const q = question.toLowerCase();
  const answer = correctAnswers[0].toLowerCase();
  
  // Patrones específicos y detallados para Ruby
  
  // Métodos y definiciones
  if (q.includes('define un método') || q.includes('def')) {
    return "Los métodos en Ruby se definen con la palabra clave 'def' seguida del nombre del método: def nombre_metodo...end. Los nombres de métodos usan snake_case por convención. Pueden recibir parámetros: def saludar(nombre), tener valores por defecto: def saludar(nombre='Mundo'), y retornan automáticamente el valor de la última expresión evaluada (no necesitas escribir 'return' explícitamente, aunque puedes). Los métodos son fundamentales para encapsular lógica reutilizable y pueden terminar con ?, ! o = para seguir convenciones Ruby.";
  }
  
  // Proc
  if (q.includes('proc') && !q.includes('lambda')) {
    return "Un Proc en Ruby es un objeto que encapsula un bloque de código reutilizable. Se crea con Proc.new { |x| x * 2 } o proc { |x| x * 2 }. A diferencia de los bloques (que no son objetos), los Procs pueden ser almacenados en variables, pasados como argumentos y ejecutados múltiples veces con .call. Los Procs son flexibles con los argumentos (no lanza error si faltan) y cuando ejecutan 'return', salen del método que contiene al Proc, no solo del Proc mismo. Son la base para lambdas y bloques en Ruby.";
  }
  
  // Hash iteration
  if (q.includes('iterar sobre un hash')) {
    return "Para iterar sobre un hash en Ruby usas 'each' o 'each_pair': hash.each {|key, value| puts key, value}. Ambos métodos son sinónimos y ejecutan un bloque para cada par clave-valor. El bloque recibe dos parámetros: la clave y el valor. También puedes usar 'each_key' para iterar solo sobre las claves, o 'each_value' para iterar solo sobre los valores. A diferencia de arrays donde each recibe un parámetro, con hashes siempre recibes dos (clave y valor).";
  }
  
  // Variables de instancia
  if (q.includes('variables de instancia') && !q.includes('clase')) {
    return "Las variables de instancia en Ruby se definen con @ al inicio, por ejemplo @nombre. Estas variables pertenecen a cada objeto individual (instancia) de la clase y mantienen su valor durante toda la vida del objeto. Son privadas por defecto, lo que significa que no puedes accederlas desde fuera de la clase sin crear métodos getter/setter explícitos (def nombre; @nombre; end) o usar attr_accessor, attr_reader, attr_writer. Cada instancia de la clase tiene su propia copia de las variables de instancia.";
  }
  
  // Singleton method
  if (q.includes('singleton method')) {
    return "Un singleton method en Ruby es un método que pertenece a un objeto específico, no a toda la clase. Se define usando def objeto.metodo...end. Por ejemplo: str = 'Hola'; def str.gritar; self.upcase + '!!!'; end. Ahora solo ese string específico tiene el método gritar, otros strings no. Los singleton methods se almacenan en la singleton class (o eigenclass) del objeto. Son útiles para agregar comportamiento único a instancias individuales sin afectar a otros objetos de la misma clase.";
  }
  
  // Join
  if (q.includes('.join')) {
    return "El método .join convierte un array en un string, uniendo todos sus elementos con un separador especificado: ['a', 'b', 'c'].join('-') devuelve 'a-b-c'. Si no especificas separador ([1,2,3].join), une sin espacios: '123'. Si pasas un espacio ([1,2,3].join(' ')), une con espacios: '1 2 3'. Es muy útil para formatear listas, crear rutas, generar CSV, o cualquier situación donde necesites convertir una colección en texto. Es lo opuesto a .split que convierte strings en arrays.";
  }
  
  // Send
  if (q.includes('método send')) {
    return "El método send en Ruby invoca un método dinámicamente usando su nombre como string o símbolo: objeto.send(:metodo, arg1, arg2). Es útil para metaprogramming porque permite llamar métodos cuyo nombre no conoces hasta tiempo de ejecución. Por ejemplo: 'hola'.send(:upcase) es equivalente a 'hola'.upcase. También puede invocar métodos privados. Se usa en frameworks como Rails para implementar funcionalidad dinámica, como calcular_total podría llamarse con send(:calcular_total).";
  }
  
  // attr_accessor, attr_reader, attr_writer
  if (q.includes('attr_accessor')) {
    return "attr_accessor en Ruby crea automáticamente métodos getter y setter para variables de instancia. Por ejemplo, attr_accessor :nombre es equivalente a escribir: def nombre; @nombre; end y def nombre=(value); @nombre = value; end. Ahora puedes leer (objeto.nombre) y escribir (objeto.nombre = 'Juan') sin crear métodos manualmente. También existen attr_reader (solo lectura) y attr_writer (solo escritura). Es una forma elegante de reducir código boilerplate en las clases Ruby.";
  }
  
  if (q.includes('métodos de attr') && q.includes('múltiple')) {
    return "Los tres métodos de attr en Ruby son: 1) attr_reader crea solo métodos de lectura (getter), 2) attr_writer crea solo métodos de escritura (setter), y 3) attr_accessor crea ambos (getter y setter). Por ejemplo: attr_reader :nombre permite objeto.nombre pero no objeto.nombre=. Son macros de metaprogramming que generan métodos automáticamente, reduciendo código repetitivo. Puedes declarar múltiples atributos a la vez: attr_accessor :nombre, :edad, :email.";
  }
  
  // Super
  if (q.includes('super')) {
    return "La palabra clave 'super' en Ruby llama al método del mismo nombre en la clase padre (superclase). Si escribes super sin paréntesis, pasa automáticamente todos los argumentos del método actual al método padre. Si usas super() con paréntesis vacíos, no pasa argumentos. Si usas super(arg1, arg2), pasas argumentos específicos. Es fundamental para extender funcionalidad de clases padre sin reescribir todo: def initialize(nombre, edad); super(nombre); @edad = edad; end llama al initialize del padre con nombre, luego agrega la lógica adicional.";
  }
  
  // method_missing
  if (q.includes('method_missing')) {
    return "method_missing es un método especial en Ruby que se invoca automáticamente cuando llamas a un método que no existe en un objeto. Puedes sobrescribirlo para implementar comportamiento dinámico: def method_missing(method_name, *args); 'Método no encontrado: #{method_name}'; end. Es muy poderoso para DSLs (Domain Specific Languages) y metaprogramming. Por ejemplo, OpenStruct usa method_missing para permitir obj.cualquier_cosa. Sin embargo, debe usarse con cuidado porque puede hacer el código difícil de debuggear y afecta el rendimiento.";
  }
  
  // Freeze
  if (q.includes('freeze')) {
    return "El método freeze en Ruby hace inmutable un objeto, previniendo cualquier modificación posterior. Una vez que llamas arr.freeze, no puedes agregar, quitar o modificar elementos sin lanzar una FrozenError. Es útil para constantes que deben mantenerse sin cambios: ESTADOS = ['activo', 'inactivo'].freeze. No confundir con dup o clone: freeze no copia el objeto, solo lo congela. Para verificar si un objeto está congelado usa .frozen?. Las strings congeladas son más eficientes en memoria.";
  }
  
  // Range
  if (q.includes('range') && !q.includes('diferencia') && !q.includes('define')) {
    return "Un Range en Ruby representa una secuencia de valores con inicio y fin: (1..10) incluye del 1 al 10, (1...10) incluye del 1 al 9 (excluye el último). Los ranges son objetos iterables que pueden contener números, letras, fechas, etc: ('a'..'z'), (Date.today..Date.today+7). Son muy eficientes en memoria porque no almacenan todos los valores, solo el inicio y el fin. Se usan comúnmente en iteraciones [1..5].each, slicing de arrays arr[2..4], y condiciones case cuando valor.";
  }
  
  if (q.includes('define un range')) {
    return "Los ranges en Ruby se definen con dos puntos (..) o tres puntos (...): (1..10) es un range inclusivo que va de 1 a 10 (incluye el 10), mientras que (1...10) es un range exclusivo que va de 1 a 9 (excluye el 10). La sintaxis es (inicio..fin) o (inicio...fin). Pueden ser de números (1..100), letras ('a'..'z'), fechas, o cualquier objeto que implemente <=> y succ. Los ranges son objetos que responden a métodos como .each, .map, .include?, .first, .last.";
  }
  
  if (q.includes('diferencia') && q.includes('..') && q.includes('...')) {
    return "La diferencia entre .. y ... en Ruby es que .. crea un range inclusivo (incluye el último valor) y ... crea un range exclusivo (excluye el último valor). Por ejemplo: (1..5).to_a devuelve [1,2,3,4,5] mientras que (1...5).to_a devuelve [1,2,3,4]. Es útil para evitar errores off-by-one: arr[0...arr.length] recorre todo el array sin salirse de límites. Piensa en ... como 'hasta pero sin incluir'.";
  }
  
  // Alias
  if (q.includes('alias')) {
    return "La palabra clave 'alias' en Ruby crea un alias (nombre alternativo) para un método existente: alias nuevo_nombre nombre_original. Por ejemplo: alias size length permite usar ambos nombres para el mismo método. Es útil para: 1) Compatibilidad: mantener nombres antiguos al renombrar métodos. 2) Semántica: alias total suma hace el código más legible. 3) Monkey patching: guardar el método original antes de sobrescribirlo: alias metodo_original metodo; def metodo; metodo_original + extras; end. A diferencia de un simple asignación, alias copia el método en ese momento.";
  }
  
  // Undef
  if (q.includes('undef')) {
    return "La palabra clave 'undef' en Ruby elimina completamente la definición de un método, haciendo que deje de existir: undef nombre_metodo. Intentar llamar al método después lanza NoMethodError, incluso si existe en la clase padre. Es diferente de: 1) Redefinir a nil: def metodo; nil; end aún responde. 2) remove_method: que solo elimina de la clase actual, permitiendo herencia. undef elimina por completo, bloqueando incluso la herencia. Se usa raramente, típicamente para eliminar métodos peligrosos o restringir APIs.";
  }
  
  // Ventajas de symbols
  if (q.includes('symbols ventajas') || (q.includes('symbol') && q.includes('múltiple'))) {
    return "Las principales ventajas de los símbolos en Ruby son: 1) Eficiencia en memoria: cada símbolo existe solo UNA vez en memoria (:nombre siempre es el mismo objeto), mientras que 'nombre' crea un nuevo string cada vez. 2) Velocidad: comparar símbolos es más rápido que comparar strings. 3) Inmutabilidad: los símbolos no pueden modificarse, son constantes. 4) Ideales como keys de hash: {nombre: 'Juan', edad: 25} es más eficiente que {'nombre' => 'Juan'}. 5) Semántica: representan identificadores, no datos textuales.";
  }
  
  // String a symbol
  if (q.includes('string') && (q.includes('symbol') || q.includes('símbolo')) && !q.includes('ventajas')) {
    return "Para convertir un string a símbolo en Ruby usas .to_sym o .intern: 'nombre'.to_sym devuelve :nombre. Ambos métodos son equivalentes. Para la conversión inversa (símbolo a string) usas .to_s: :nombre.to_s devuelve 'nombre'. Esto es útil cuando recibes datos como strings (de formularios, JSON, etc.) pero necesitas símbolos para acceder a hashes: params['nombre'] vs params[:nombre]. Recuerda que los símbolos nunca se eliminan de memoria, así que no conviertas strings arbitrarios de usuarios a símbolos.";
  }
  
  // Self
  if (q.includes('self')) {
    return "La palabra clave 'self' en Ruby referencia al objeto actual (el contexto de ejecución). Su significado cambia según el contexto: 1) Dentro de un método de instancia: self es la instancia del objeto. 2) Dentro de la definición de clase: self es la clase misma. 3) Para definir métodos de clase: def self.metodo_clase. 4) Para desambiguar: self.nombre = valor llama al setter, no crea una variable local. self es similar a 'this' en JavaScript o Java, pero más flexible. Siempre hay un self en Ruby.";
  }
  
  // Enumerator
  if (q.includes('enumerator')) {
    return "Un Enumerator en Ruby es un objeto que permite iterar sobre colecciones de forma controlada y perezosa (lazy evaluation). Se crea automáticamente cuando llamas a métodos iteradores sin bloque: [1,2,3].each devuelve un Enumerator. También puedes crearlo explícitamente: Enumerator.new. Los enumerators permiten: 1) Iterar manualmente con .next. 2) Combinar operaciones: (1..Float::INFINITY).lazy.map{|i| i*2}.first(10). 3) Crear iteradores externos. 4) Iterar sobre estructuras personalizadas. Son fundamentales para procesamiento lazy y streams infinitos.";
  }
  
  // Reduce/inject
  if (q.includes('reduce')) {
    return "El método reduce (también llamado inject) en Ruby acumula un valor iterando sobre una colección. Se usa para operaciones de agregación: [1,2,3,4].reduce(0) {|suma, n| suma + n} devuelve 10. El primer parámetro (0) es el valor inicial del acumulador, y el bloque recibe el acumulador y el elemento actual. Si omites el valor inicial, usa el primer elemento: [1,2,3].reduce(:+) suma todos. Casos de uso: sumar, multiplicar, encontrar el máximo, construir hashes a partir de arrays, aplanar estructuras complejas.";
  }
  
  // Select
  if (q.includes('select') && !q.includes('reject')) {
    return "El método select en Ruby filtra elementos de una colección que cumplen una condición. Devuelve un NUEVO array (o hash) con solo los elementos donde el bloque retorna true: [1,2,3,4,5].select {|n| n.even?} devuelve [2,4]. No modifica el array original. Con hashes, devuelve un nuevo hash: {a: 1, b: 2, c: 3}.select {|k,v| v > 1} devuelve {b: 2, c: 3}. Es equivalente a filter en otros lenguajes. Para filtrar \"in-place\" (modificando el original) usa select! con exclamación.";
  }
  
  // Reject
  if (q.includes('reject')) {
    return "El método reject en Ruby es el opuesto de select: filtra elementos que NO cumplen una condición. Devuelve un nuevo array con los elementos donde el bloque retorna false o nil: [1,2,3,4,5].reject {|n| n.even?} devuelve [1,3,5]. Es equivalente a select {|n| !n.even?} pero más legible. Útil para remover elementos no deseados. Para modificar el array original usa reject!. Con hashes también funciona: {a: 1, b: 2, c: 3}.reject {|k,v| v > 1} devuelve {a: 1}. Piensa en reject como un filtro negativo.";
  }
  
  // Map
  if (q.includes('map') && !q.includes('each')) {
    return "El método map en Ruby transforma cada elemento de una colección aplicando un bloque. Devuelve un NUEVO array con los resultados: [1,2,3].map {|n| n * 2} devuelve [2,4,6]. No modifica el array original. Es fundamental para transformaciones de datos: usuarios.map {|u| u.nombre} extrae solo los nombres. Con hashes devuelve array de arrays: {a: 1, b: 2}.map {|k,v| [v, k]} devuelve [[1, :a], [2, :b]]. Para modificar el original usa map!. También tiene alias: collect es equivalente a map.";
  }
  
  // Map vs Each
  if (q.includes('diferencia') && q.includes('map') && q.includes('each')) {
    return "La diferencia principal entre map y each es el valor de retorno: 1) each ejecuta un bloque para cada elemento y retorna la colección ORIGINAL: [1,2,3].each {|n| n * 2} devuelve [1,2,3]. Se usa para efectos secundarios (puts, guardar en DB). 2) map ejecuta un bloque y retorna un NUEVO array con los resultados transformados: [1,2,3].map {|n| n * 2} devuelve [2,4,6]. Se usa para transformar datos. Regla práctica: usa each cuando no te importa el retorno, usa map cuando quieres transformar la colección.";
  }
  
  // Tap
  if (q.includes('tap')) {
    return "El método tap en Ruby ejecuta un bloque y luego retorna el objeto original (no el resultado del bloque). Es útil para debugging y operaciones intermedias: [1,2,3].tap {|arr| puts \"Array: #{arr}\"}.map {|n| n * 2}. El tap imprime pero no afecta el pipeline. También para configurar objetos: Usuario.new.tap {|u| u.nombre = 'Juan'; u.edad = 25; u.save}. La diferencia clave vs then: tap retorna el objeto original, then retorna el resultado del bloque. Tap es como espiar el objeto sin modificar el flujo.";
  }
  
  // Dig
  if (q.includes('dig')) {
    return "El método dig en Ruby navega estructuras anidadas (hashes, arrays) de forma segura, sin lanzar errores si alguna clave no existe: hash.dig(:usuario, :perfil, :nombre) busca hash[:usuario][:perfil][:nombre]. Si cualquier nivel es nil, dig retorna nil en lugar de lanzar NoMethodError. Es equivalente a: hash[:usuario] && hash[:usuario][:perfil] && hash[:usuario][:perfil][:nombre], pero más elegante. También funciona con arrays: data.dig(0, 'usuario', :nombre). Muy útil para APIs y JSON donde la estructura puede variar.";
  }
  
  // Expresiones regulares
  if (q.includes('expresiones regulares') || (q.includes('regex') && !q.includes('operator') && !q.includes('compara') && !q.includes('define') && !q.includes('busca'))) {
    return "Las expresiones regulares (regex) en Ruby son patrones para buscar, validar y manipular texto. Se definen entre barras: /patrón/ o con Regexp.new('patrón'). Ejemplos: /\\d+/ busca números, /^[a-z]+$/ valida solo letras minúsculas. Se usan con operadores (=~, match) y métodos (scan, gsub, split). Ruby usa la sintaxis PCRE (similar a Perl). Son fundamentales para validaciones, parsing, y text processing. Puedes agregar flags: /patrón/i (case-insensitive), /patrón/m (multiline).";
  }
  
  if (q.includes('define una regex')) {
    return "En Ruby defines expresiones regulares con /patrón/ (sintaxis literal) o Regexp.new('patrón') (sintaxis de constructor). La forma literal es más común: /\\d{3}-\\d{4}/ para validar teléfonos. La forma de constructor es útil para patrones dinámicos: Regexp.new(variable). Puedes agregar flags después: /patrón/i para case-insensitive, /patrón/m para multiline, /patrón/x para extended (permite comentarios y espacios). Ejemplos: /[a-z]+/, /^\\w+@\\w+\\.com$/, /hola|chau/. Los símbolos especiales (. * + ? [ ] { } ( ) | ^ $) deben escaparse con \\.";
  }
  
  if (q.includes('operador') && q.includes('regex')) {
    return "El operador =~ en Ruby compara un string con una expresión regular y devuelve la posición del primer match (índice) o nil si no hay coincidencia: 'hola123'.=~ /\\d+/ devuelve 4 (posición donde empieza '123'). Si no hay match: 'hola'.=~ /\\d+/ devuelve nil. Es muy útil en condicionales: if email =~ /@/, porque nil es falsy. También actualiza variables globales especiales: $& (match completo), $1, $2 (grupos de captura), $` (antes del match), $' (después del match). Para invertir la comparación (regex a la izquierda) Ruby permite: /\\d+/ =~ 'hola123'.";
  }
  
  if (q.includes('busca coincidencias')) {
    return "El método .match en Ruby busca coincidencias de una regex y devuelve un objeto MatchData (o nil si no hay match): 'hola123'.match(/\\d+/) devuelve un MatchData con info detallada. El MatchData incluye: [0] el match completo, [1], [2]... los grupos de captura, .begin(0) posición de inicio, .end(0) posición de fin. Ejemplo: 'Juan Perez'.match(/([A-Z]\\w+)\\s+([A-Z]\\w+)/) captura nombre y apellido en grupos. A diferencia de =~ que solo devuelve la posición, match devuelve contexto completo. Para encontrar TODOS los matches usa .scan.";
  }
  
  // Grupos de captura
  if (q.includes('$1') && q.includes('$2')) {
    return "En Ruby, $1, $2, $3, etc. son variables globales que contienen los grupos de captura de la última regex ejecutada. Los grupos se definen con paréntesis en la regex: 'Juan Perez'.match(/([A-Z]\\w+)\\s+([A-Z]\\w+)/); puts $1, $2 imprime 'Juan' y 'Perez'. También puedes acceder via MatchData: m = 'texto'.match(/patrón/); m[1], m[2]. Los grupos de captura son útiles para extraer partes específicas de strings: emails, teléfonos, fechas. Hay grupos con nombre: /(?<nombre>[A-Z]\\w+)/ permite m[:nombre]. Grupos no-capturadores: /(?:patrón)/ agrupa sin crear $1.";
  }
  
  // Gsub
  if (q.includes('gsub') && !q.includes('sub') && !q.includes('diferencia')) {
    return "El método gsub (global substitution) en Ruby reemplaza TODAS las ocurrencias de un patrón en un string: 'hola hola'.gsub('hola', 'chau') devuelve 'chau chau'. Acepta regex: 'abc123def456'.gsub(/\\d+/, 'X') devuelve 'abcXdefX'. También acepta bloques para reemplazos dinámicos: 'abc'.gsub(/[a-z]/) {|letra| letra.upcase} devuelve 'ABC'. No modifica el string original (usa gsub! para modificar in-place). Con grupos de captura puedes referenciar: 'Juan Perez'.gsub(/(\\w+)\\s+(\\w+)/, '\\2, \\1') devuelve 'Perez, Juan'.";
  }
  
  if (q.includes('diferencia') && q.includes('gsub') && q.includes('sub')) {
    return "La diferencia entre gsub y sub es que gsub reemplaza TODAS las ocurrencias de un patrón, mientras que sub reemplaza solo la PRIMERA: 'aaa'.gsub('a', 'b') devuelve 'bbb', pero 'aaa'.sub('a', 'b') devuelve 'baa'. Ambos aceptan strings, regex, y bloques. Ejemplo con regex: 'a1b2c3'.gsub(/\\d/, 'X') => 'aXbXcX', pero 'a1b2c3'.sub(/\\d/, 'X') => 'aXb2c3'. Regla simple: usa sub cuando solo quieres reemplazar la primera ocurrencia, gsub cuando quieres reemplazar todas. Ambos tienen versiones con ! (sub!, gsub!) que modifican el string original.";
  }
  
  // Prepend
  if (q.includes('prepend') && q.includes('módulo')) {
    return "El método prepend en Ruby incluye un módulo en una clase, pero con precedencia ANTES de la clase en la cadena de métodos. Es lo opuesto a include (que inserta después de la clase). Cuando usas prepend MiModulo, los métodos del módulo se buscan ANTES que los de la clase, permitiendo sobrescribir métodos originales: prepend Logger intercepta todos los métodos. La cadena es: singleton methods → prepended modules → clase → included modules → superclass. Se usa para wrappers, logging, validaciones, y patching sin sobrescribir permanentemente.";
  }
  
  if (q.includes('formas de incluir módulos') || (q.includes('módulo') && q.includes('múltiple') && q.includes('incluir'))) {
    return "Las tres formas de incluir módulos en Ruby son: 1) include MiModulo: agrega métodos del módulo como métodos de INSTANCIA de la clase. Los métodos se buscan después de la clase. 2) extend MiModulo: agrega métodos del módulo como métodos de CLASE (o métodos singleton si se usa en un objeto). 3) prepend MiModulo: similar a include pero con precedencia ANTES de la clase, permite sobrescribir métodos. Ejemplo: include Enumerable da .map a instancias; extend Forwardable da macros a la clase; prepend Logger envuelve métodos existentes.";
  }
  
  // Extend
  if (q.includes('extend') && q.includes('métodos de clase')) {
    return "El método extend en Ruby agrega métodos de un módulo como métodos de CLASE (métodos estáticos), no como métodos de instancia. Ejemplo: class MiClase; extend MiModulo; end permite llamar MiClase.metodo_del_modulo. También puedes extender objetos individuales: str = 'hola'; str.extend(MiModulo) agrega métodos singleton solo a ese string. La diferencia con include: include agrega métodos de instancia (objeto.metodo), extend agrega métodos de clase (Clase.metodo). extend es útil para agregar funcionalidad a clases sin herencia o para singleton methods.";
  }
  
  // Comparable
  if (q.includes('comparable')) {
    return "Comparable es un mixin en Ruby que proporciona automáticamente los operadores de comparación (<, <=, ==, >=, >, between?) a cualquier clase que incluya el módulo y defina el método <=>. Una vez que implementas def <=>(otro), obtienes gratis: menor = obj1 < obj2, mayor_o_igual = obj1 >= obj2, entre = obj1.between?(min, max). Ejemplo: class Persona; include Comparable; def <=>(otro); @edad <=> otro.edad; end; end. Ahora puedes comparar personas por edad automáticamente. Es fundamental para ordenar colecciones personalizadas.";
  }
  
  // Operador <=>
  if (q.includes('operador') && q.includes('<=>')) {
    return "El operador <=> (spaceship operator) en Ruby compara dos objetos y devuelve: -1 si el primero es menor, 0 si son iguales, 1 si el primero es mayor, o nil si no son comparables. Ejemplos: 1 <=> 2 devuelve -1, 2 <=> 2 devuelve 0, 3 <=> 2 devuelve 1. Es fundamental para: 1) Implementar Comparable (solo defines <=> y obtienes <, <=, ==, >=, >). 2) Ordenar colecciones: [3,1,2].sort funciona porque Integer define <=>. 3) Crear clases ordenables: implementa <=> y tu clase puede ordenarse con .sort.";
  }
  
  if (q.includes('método debe implementarse') && q.includes('comparable')) {
    return "Para usar el módulo Comparable en Ruby debes implementar el método <=> (spaceship operator). Este método compara el objeto actual (self) con otro objeto y devuelve: -1 si self es menor, 0 si son iguales, 1 si self es mayor. Ejemplo: class Persona; include Comparable; def <=>(otra); @edad <=> otra.edad; end; end. Una vez implementado <=>, Comparable te da gratis: <, <=, ==, >=, >, between?. Es la base del ordenamiento en Ruby: implementa <=> y [array].sort funciona automáticamente.";
  }
  
  // Enumerable
  if (q.includes('enumerable')) {
    return "Enumerable es uno de los módulos más poderosos de Ruby. Proporciona decenas de métodos de iteración y búsqueda (map, select, reject, find, reduce, etc.) a cualquier clase que incluya el módulo y defina el método each. Una vez que implementas def each, obtienes gratis: .map, .select, .reject, .find, .reduce, .any?, .all?, .count, .sort, y muchos más. Es la base de Arrays, Hashes, Ranges. Para crear colecciones personalizadas: class MiColeccion; include Enumerable; def each; yield elemento; end; end. Ahora tiene todos los métodos de iteración.";
  }
  
  // Defined?
  if (q.includes('defined?')) {
    return "El operador defined? en Ruby verifica si una variable, constante, método o expresión está definida. Devuelve un string describiendo el tipo ('local-variable', 'constant', 'method', etc.) o nil si no está definida: defined?(x) devuelve nil si x no existe, 'local-variable' si es una variable local. Es útil para evitar errores: if defined?(Rails) permite código condicional sin lanzar NameError. También funciona con métodos: defined?(objeto.metodo), constantes: defined?(CONSTANTE), variables globales: defined?($var). No confundir con .nil? que verifica si un valor es nil, defined? verifica existencia.";
  }
  
  // __FILE__ y __LINE__
  if (q.includes('__file__')) {
    return "La constante especial __FILE__ en Ruby contiene el nombre del archivo actual que se está ejecutando. Es útil para: 1) Debugging: puts __FILE__ muestra qué archivo tiene el código. 2) Cargar archivos relativos: require_relative File.dirname(__FILE__) + '/otro'. 3) Ejecutar solo como script: if __FILE__ == $0 detecta si el archivo fue ejecutado directamente vs requerido. Junto con __LINE__ (número de línea) y __dir__ (directorio), son herramientas poderosas para introspección y paths dinámicos.";
  }
  
  if (q.includes('__line__')) {
    return "La constante especial __LINE__ en Ruby contiene el número de línea actual en el código fuente. Es útil para: 1) Debugging: puts \"Error en línea #{__LINE__}\" muestra exactamente dónde ocurrió el problema. 2) Logging: logger.debug \"#{__FILE__}:#{__LINE__} - #{mensaje}\" registra ubicación exacta. 3) Testing y metaprogramming. Se actualiza dinámicamente: la primera línea es 1, la segunda es 2, etc. Combinado con __FILE__ y caller permite rastrear exactamente dónde se ejecuta el código, invaluable para debugging.";
  }
  
  // Require y load
  if (q.includes('require') && !q.includes('load') && !q.includes('diferencia') && !q.includes('relative')) {
    return "El método require en Ruby carga un archivo o gema una sola vez, sin importar cuántas veces lo llames: require 'json' carga la librería JSON. Ruby mantiene un registro interno de archivos requeridos en $LOADED_FEATURES, previniendo duplicaciones. Se usa para: 1) Cargar gemas: require 'rails'. 2) Cargar archivos del proyecto: require './lib/utils'. 3) Cargar librerías standard: require 'date'. Solo carga el archivo si no fue cargado antes, optimizando rendimiento. Para forzar recarga usa load. Para paths relativos usa require_relative.";
  }
  
  if (q.includes('diferencia') && q.includes('require') && q.includes('load')) {
    return "La diferencia principal entre require y load es: 1) require carga un archivo solo UNA vez (la primera llamada), llamadas subsecuentes son ignoradas porque Ruby trackea archivos cargados en $LOADED_FEATURES. 2) load carga el archivo CADA vez que lo llames, útil en desarrollo cuando editas código y quieres recargar sin reiniciar. Además: require busca en $LOAD_PATH automáticamente, load necesita path completo o relativo explícito. Regla: usa require para dependencias (gemas, librerías), usa load solo en casos especiales (REPLs, hot-reloading en desarrollo).";
  }
  
  if (q.includes('require_relative')) {
    return "El método require_relative en Ruby carga un archivo relativo a la ubicación del archivo ACTUAL, no relativo al directorio de trabajo: require_relative 'models/user' carga ./models/user.rb desde el directorio donde está el archivo que hace el require. Es más confiable que require './models/user' porque no depende del directorio desde donde ejecutes el script. Útil para proyectos donde los archivos referencian otros archivos en la estructura del proyecto. Solo carga una vez (como require). Ejemplo típico: require_relative '../lib/utils' para subir un nivel y cargar utils.";
  }
  
  // Gems y Bundler
  if (q.includes('gem en ruby') && !q.includes('bundler')) {
    return "Un Gem en Ruby es un paquete de código reutilizable que encapsula funcionalidad específica (librería, framework, herramienta CLI). Es el sistema de distribución de software de Ruby. Los gems se publican en RubyGems.org y se instalan con gem install nombre. Contienen: código Ruby, documentación, gemspec (metadatos: versión, dependencias, autor). Ejemplos famosos: rails, rspec, puma, nokogiri. Los gems permiten compartir código entre proyectos sin copiar archivos. El archivo gemspec define nombre, versión, dependencias. Bundler gestiona gems por proyecto.";
  }
  
  if (q.includes('bundler')) {
    return "Bundler es el gestor de dependencias estándar para Ruby. Resuelve y gestiona las versiones de todas las gemas (gems) que tu proyecto necesita. Usas un Gemfile para declarar dependencias: gem 'rails', '~> 7.0', luego bundle install las instala y genera Gemfile.lock con versiones exactas. Bundler garantiza: 1) Todos los desarrolladores usan las mismas versiones. 2) Las dependencias son consistentes entre entornos (dev, producción). 3) Resolución de conflictos de versiones. También provee bundle exec para ejecutar comandos con las gems correctas. Es esencial en cualquier proyecto Ruby moderno.";
  }
  
  if (q.includes('gemfile')) {
    return "El Gemfile es el archivo que usa Bundler para definir las dependencias (gems) de un proyecto Ruby. Se escribe en DSL de Ruby: gem 'rails', '~> 7.0' especifica la gema y versión. Características: 1) Versionado: gem 'gem', '~> 1.0' (compatible), '>= 1.0' (mínimo), '1.0.0' (exacto). 2) Fuentes: source 'https://rubygems.org'. 3) Grupos: group :development do... para gemas solo en desarrollo. 4) Paths locales: gem 'mygem', path: '../mygem'. Después de editar Gemfile ejecutas bundle install para instalar. Bundler genera Gemfile.lock con versiones exactas (debe commitearse).";
  }
  
  if (q.includes('bundle install') || (q.includes('comando') && q.includes('gemfile'))) {
    return "El comando bundle install (o simplemente bundle) lee el Gemfile de tu proyecto e instala todas las gemas declaradas y sus dependencias. Crea o actualiza el Gemfile.lock con las versiones exactas instaladas. Proceso: 1) Lee Gemfile. 2) Resuelve árbol de dependencias (qué versiones son compatibles). 3) Descarga gems de rubygems.org. 4) Instala en vendor/bundle o globalmente. 5) Genera Gemfile.lock. Si Gemfile.lock existe, instala esas versiones exactas. Para actualizar gems usa bundle update. Para agregar un gem nuevo: agrégalo al Gemfile y ejecuta bundle install.";
  }
  
  // RSpec
  if (q.includes('rspec')) {
    return "RSpec es el framework de testing más popular para Ruby, basado en BDD (Behavior Driven Development). Permite escribir tests con sintaxis natural y legible: describe Usuario do; it 'valida email' do; expect(usuario.email).to match(/@/); end; end. Características: 1) Sintaxis expresiva con describe, context, it, expect. 2) Matchers potentes: eq, include, be_truthy, raise_error. 3) Mocks y stubs: allow(objeto).to receive(:metodo). 4) Hooks: before, after, around para setup. 5) Output descriptivo. Se instala como gem: gem 'rspec', se inicializa con rspec --init, y se ejecuta con rspec spec/.";
  }
  
  if (q.includes('métodos de testing') && q.includes('rspec')) {
    return "Los métodos principales de testing en RSpec son: 1) it: define un ejemplo (test case): it 'suma correctamente'. 2) expect: define una expectativa (assertion): expect(resultado).to eq(5). También: expect{}.to raise_error. 3) describe: agrupa ejemplos relacionados: describe Calculadora. 4) context: agrupa ejemplos en contextos específicos: context 'cuando es negativo'. 5) before/after: setup y teardown: before(:each). 6) let: define variables lazy-loaded: let(:usuario) { Usuario.new }. La estructura básica es: describe... it... expect... Los matchers (eq, include, be) validan el comportamiento.";
  }
  
  // Detectar si alguna respuesta correcta contiene info útil
  if (correctAnswers.length > 0) {
    const firstAnswer = correctAnswers[0];
    
    // Si es código o sintaxis específica, explicar esa sintaxis
    if (firstAnswer.includes('(') || firstAnswer.includes('..') || firstAnswer.includes('=>')) {
      return `La respuesta correcta es: ${firstAnswer}. Esta sintaxis en Ruby es fundamental para el concepto preguntado. Ruby es un lenguaje dinámico y expresivo que prioriza la legibilidad y la felicidad del desarrollador, con una sintaxis elegante que hace el código intuitivo de leer y escribir.`;
    }
  }
  
  // Explicación genérica pero informativa
  return `En Ruby, esto se refiere a un concepto fundamental del lenguaje. Ruby es un lenguaje de programación interpretado, dinámico y completamente orientado a objetos, creado con el objetivo de maximizar la productividad y felicidad del desarrollador. La sintaxis elegante y natural de Ruby hace que el código sea fácil de leer y escribir, siguiendo el principio de "menor sorpresa" donde el comportamiento del lenguaje es intuitivo.`;
}

// Contador de explicaciones completadas
let completedCount = 0;

// Procesa cada pregunta
rubyQuestions.forEach(q => {
  // Solo procesa si la explicación está vacía o es genérica
  const needsExplanation = !q.explanation || 
                          q.explanation.trim() === '' ||
                          q.explanation.includes('es la respuesta correcta en Ruby. Ruby es un lenguaje dinámico');
  
  if (needsExplanation) {
    const correctAnswers = q.options
      .filter(opt => opt.isCorrect)
      .map(opt => opt.text);
    
    q.explanation = generateDetailedExplanation(q.question, correctAnswers);
    completedCount++;
  }
});

// Guarda el archivo actualizado
fs.writeFileSync('./all-questions.json', JSON.stringify(data, null, 2));

console.log(`✅ ${completedCount} explicaciones de Ruby completadas automáticamente`);
console.log(`📊 Total preguntas Ruby: ${rubyQuestions.length}`);
