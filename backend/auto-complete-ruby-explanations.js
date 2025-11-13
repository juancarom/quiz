// Auto-completar explicaciones de Ruby con formato educativo mejorado
const fs = require('fs');
const path = require('path');

const data = require('./all-questions.json');
let updated = 0;

// Explicaciones educativas detalladas por patrón de pregunta
const educationalPatterns = {
  'range': 'Un Range en Ruby representa una secuencia continua de valores entre un inicio y un fin, creado con .. (inclusivo) o ... (exclusivo). Por ejemplo, (1..5).to_a produce [1,2,3,4,5], mientras (1...5).to_a produce [1,2,3,4]. Los ranges son muy eficientes en memoria porque no almacenan todos los valores, solo el inicio y el fin. Se usan para iteraciones, slicing de arrays, y condiciones en case statements.',
  
  'hash iterar': 'Para iterar sobre un hash en Ruby usa .each o .each_pair, que pasan cada par clave-valor al bloque: hash.each {|key, value| puts "#{key}: #{value}"}. También puedes usar .each_key para iterar solo claves, .each_value para solo valores, o .map para transformar. Los hashes mantienen el orden de inserción desde Ruby 1.9.',
  
  'yield': 'yield en Ruby transfiere el control del método al bloque que fue pasado cuando se llamó. Por ejemplo, def metodo; yield; end permite llamar metodo { puts "hola" }. yield puede pasar argumentos al bloque y recibir su valor de retorno. Es la base de los iteradores en Ruby. Si no se pasa bloque y llamas yield, lanza un error; usa block_given? para verificar primero.',
  
  'variables clase globales': 'Ruby tiene varios tipos de variables: variables de instancia (@var) pertenecen a cada objeto, variables de clase (@@var) son compartidas por todas las instancias, variables globales ($var) son accesibles desde cualquier lugar del programa, y constantes (VAR) deben ser mayúsculas. Las variables locales no tienen prefijo. Cada tipo tiene diferentes alcances y casos de uso.',
  
  'singleton class': 'Una singleton class (o eigenclass) en Ruby es una clase anónima asociada a UN objeto específico. Permite agregar métodos solo a ese objeto sin afectar otros de la misma clase. Se accede con class << obj. Es el mecanismo interno que Ruby usa para métodos de clase (que en realidad son métodos singleton del objeto Class). Es un concepto avanzado de metaprogramming.',
  
  'concatenar string': 'Ruby ofrece varias formas de concatenar strings: el operador + (crea un nuevo string), << (modifica el string original), .concat, o interpolación con #{}. La interpolación es preferida por legibilidad: "Hola #{nombre}". Ten cuidado con + en loops porque crea muchos objetos temporales; usa << o interpolación para mejor rendimiento.',
  
  'convierte string': 'El método .to_s convierte cualquier objeto a su representación en string. Cada clase Ruby puede definir su propia implementación de to_s. Por ejemplo, [1,2].to_s devuelve "[1, 2]", y {a: 1}.to_s devuelve "{:a=>1}". Es útil para debugging y formateo. Para representaciones detalladas para debugging, usa .inspect.',
  
  'método filter': 'Ruby no tiene un método filter(), en su lugar usa select para filtrar elementos. select itera y devuelve un nuevo array con elementos que cumplen la condición del bloque. Su alias es find_all. Para el caso opuesto (rechazar elementos), usa reject. Ejemplos: [1,2,3,4].select {|n| n.even?} devuelve [2,4].',
  
  'qué gem': 'Un Gem en Ruby es un paquete que contiene código, documentación y especificaciones. Se distribuyen vía RubyGems.org y se instalan con gem install nombre. Los gems resuelven dependencias automáticamente. Bundler gestiona gems por proyecto mediante un Gemfile. Gems famosos incluyen Rails, RSpec, Sinatra. Cualquiera puede crear y publicar gems.',
  
  'operador regex': 'El operador =~ en Ruby compara strings con expresiones regulares. Devuelve la posición del primer match (empezando en 0) o nil si no hay coincidencia. Ejemplo: "hello" =~ /ll/ devuelve 2. Su complemento !~ verifica no-coincidencia. Para matches más complejos usa el método .match que devuelve un objeto MatchData con captures y otros detalles.',
  
  'spaceship': 'El operador <=> (spaceship) compara dos objetos y devuelve -1 si el primero es menor, 0 si son iguales, o 1 si el primero es mayor. Es fundamental para ordenamiento: sort usa <=> internamente. Cualquier clase que defina <=> puede incluir el módulo Comparable para obtener <, <=, ==, >=, > gratis. Ejemplo: 1 <=> 2 devuelve -1.',
  
  'método map': 'El método .map (alias: collect) transforma cada elemento de una colección aplicando un bloque y devuelve un nuevo array con los resultados. No modifica el original. Ejemplo: [1,2,3].map {|n| n * 2} devuelve [2,4,6]. Para transformar y modificar el array original, usa .map!. Es fundamental en programación funcional para transformaciones de datos.',
  
  'método reduce': 'reduce (alias: inject) acumula un valor iterando sobre una colección. Toma un acumulador y el elemento actual en cada iteración. Ejemplos: [1,2,3].reduce(:+) suma todos (devuelve 6), [1,2,3].reduce(1, :*) multiplica todos (devuelve 6). Puedes usarlo con bloque: reduce(0) {|sum, n| sum + n**2} suma los cuadrados. Es muy poderoso para operaciones de agregación.',
  
  'method missing': 'method_missing es un método hook que Ruby llama cuando intentas invocar un método inexistente en un objeto. Se usa para metaprogramming: interceptar llamadas y manejarlas dinámicamente. ActiveRecord lo usa para finders dinámicos. Cuidado: puede hacer el código confuso y más lento. Siempre define respond_to_missing? junto con method_missing para consistencia.',
  
  'frozen': 'Un objeto frozen en Ruby no puede ser modificado. Se congela con .freeze y se verifica con .frozen?. Útil para constantes que deben ser inmutables. Una vez frozen, cualquier intento de modificación lanza FrozenError. Los strings literales pueden ser congelados por defecto con # frozen_string_literal: true. Los objetos frozen pueden ser más rápidos porque Ruby puede optimizarlos.',
  
  'ternary': 'El operador ternario en Ruby es condición ? valor_si_true : valor_si_false. Es una forma concisa de if/else para asignaciones simples. Ejemplo: edad >= 18 ? "adulto" : "menor". Úsalo para expresiones simples; para lógica compleja, if/else es más legible. Ruby también tiene unless (if negado) y modificadores: puts "adulto" if edad >= 18.'
};

data.ruby.forEach((q, idx) => {
  // Si ya tiene una explicación mejorada (más de 150 caracteres), skip
  if (q.explanation && q.explanation.length > 150 && !q.explanation.includes('es la respuesta correcta en Ruby. Ruby es un lenguaje')) {
    return;
  }
  
  const questionLower = q.question.toLowerCase();
  
  // Buscar patrón que coincida
  for (const [pattern, explanation] of Object.entries(educationalPatterns)) {
    if (questionLower.includes(pattern.toLowerCase())) {
      q.explanation = explanation;
      updated++;
      console.log(`✓ Pregunta ${idx + 1}: ${q.question.substring(0, 50)}...`);
      return;
    }
  }
  
  // Si no matcheó ningún patrón, dejar la explicación actual
});

// Guardar
fs.writeFileSync(path.join(__dirname, 'all-questions.json'), JSON.stringify(data, null, 2));

console.log(`\n✅ ${updated} explicaciones de Ruby completadas automáticamente`);
console.log(`📊 Total preguntas Ruby: ${data.ruby.length}`);
