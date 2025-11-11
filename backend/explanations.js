// Explicaciones para preguntas de Ruby
const rubyExplanations = {
  "¿Qué hace el método select en Ruby?": "El método select en Ruby crea una nueva colección (array o hash) que contiene solo los elementos de la colección original que cumplen una condición dada en un bloque. Es un método de filtrado que itera sobre la colección, evalúa el bloque para cada elemento y devuelve los que resultan en true.",
  
  "¿Qué operador compara con regex en Ruby?": "El operador =~ en Ruby se utiliza para comparar un string con una expresión regular (regex). Devuelve la posición del primer match o nil si no encuentra coincidencia. Es muy útil para validaciones de formato.",
  
  "¿Cuál es la forma correcta de sumar todos los elementos de un arreglo en Ruby?": "El método reduce(:+) aplica el operador + entre todos los elementos del array de forma acumulativa. Es una forma elegante y concisa de sumar todos los valores. También puedes usar array.sum que es más explícito.",
  
  "¿Cómo se itera sobre un arreglo en Ruby e imprime cada elemento?": "El método each es el iterador más común en Ruby. Acepta un bloque que se ejecuta para cada elemento del array. La variable entre pipes (|item|) representa cada elemento durante la iteración.",
  
  "¿Cuál es la forma correcta de crear un hash en Ruby?": "En Ruby, los hashes se crean con llaves {}. Puedes usar símbolos como keys con la sintaxis name: 'valor' (desde Ruby 1.9) o la sintaxis hashrocket :name => 'valor'. Los símbolos son más eficientes que strings como keys.",
  
  "¿Cómo se define un método que recibe parámetros opcionales en Ruby?": "Los parámetros opcionales en Ruby se definen asignándoles un valor por defecto con =. Si el método se llama sin ese argumento, usa el valor por defecto. Esto hace los métodos más flexibles.",
  
  "¿Cuál es la forma correcta de filtrar elementos de un arreglo en Ruby?": "El método select filtra elementos basándose en una condición. Devuelve un nuevo array con todos los elementos para los cuales el bloque retorna true. Es similar a filter en otros lenguajes.",
  
  "¿Cómo se maneja un error en Ruby?": "Ruby usa bloques begin-rescue-end para manejo de excepciones. El código que puede fallar va en begin, y rescue captura la excepción. La variable después de => contiene el objeto de la excepción para inspección.",
  
  "¿Cuál es la forma correcta de crear una clase en Ruby con un constructor?": "El método initialize es el constructor en Ruby. Se llama automáticamente cuando creas una instancia con .new. Las variables de instancia se definen con @ y persisten durante la vida del objeto.",
  
  "¿Cómo se concatenan strings en Ruby?": "Ruby ofrece múltiples formas de concatenar strings: el operador +, el método concat, o interpolación con #{}. Todas son válidas, aunque la interpolación suele ser más legible para combinar strings con variables.",
  
  "¿Cuál es la forma correcta de verificar si un elemento existe en un arreglo en Ruby?": "El método include? verifica si un elemento está presente en un array o rango. Devuelve true o false. El signo de interrogación en el nombre es una convención de Ruby para métodos que retornan booleanos.",
  
  "¿Cómo se convierte un string a un entero en Ruby?": "Tanto .to_i como Integer() convierten strings a enteros. to_i es más permisivo (devuelve 0 si falla), mientras que Integer() lanza una excepción si el string no es válido. Ambas son correctas según el caso de uso."
};

// Explicaciones para preguntas de JavaScript
const jsExplanations = {
  "¿Cuál es la forma correcta de hacer una petición GET en JavaScript con fetch?": "La API fetch devuelve una Promise. El primer .then() recibe la respuesta y usa res.json() para parsear el body. El segundo .then() recibe los datos ya parseados. Este patrón de encadenamiento de promises es estándar en JS moderno.",
  
  "¿Cómo se desestructura un objeto en JavaScript?": "La desestructuración usa llaves {} para extraer propiedades de un objeto en variables individuales. Los nombres de las variables deben coincidir con los nombres de las propiedades del objeto. Es una forma concisa de acceder a múltiples propiedades.",
  
  "¿Cuál es la forma correcta de crear una función arrow en JavaScript?": "Las arrow functions usan la sintaxis => y tienen un comportamiento diferente con 'this'. Si el cuerpo es una sola expresión, el return es implícito. Son más concisas que las funciones tradicionales.",
  
  "¿Cómo se usa async/await en JavaScript?": "async declara que una función retorna una Promise. await pausa la ejecución hasta que la Promise se resuelva. Solo puede usarse dentro de funciones async. Hace el código asíncrono más legible, como si fuera síncrono.",
  
  "¿Cuál es la forma correcta de crear una promesa en JavaScript?": "Una Promise se crea con el constructor new Promise(). Recibe una función con dos parámetros: resolve (para éxito) y reject (para error). Las promises representan valores que estarán disponibles en el futuro."
};

// Explicaciones para preguntas de SQL
const sqlExplanations = {
  "¿Cómo se hace un JOIN en SQL para obtener datos de dos tablas?": "Todas las opciones son correctas. JOIN e INNER JOIN son equivalentes. La sintaxis WHERE con múltiples tablas (JOIN implícito) también funciona. Los JOINs combinan filas de dos o más tablas basándose en una columna relacionada.",
  
  "¿Cuál es la forma correcta de crear un índice en SQL?": "CREATE INDEX crea un índice en una columna para acelerar las búsquedas. Los índices mejoran el rendimiento de SELECT pero pueden ralentizar INSERT/UPDATE. Es importante indexar columnas usadas frecuentemente en WHERE y JOIN.",
  
  "¿Cómo se hace un UPDATE condicional en SQL?": "UPDATE modifica registros existentes. SET especifica qué columnas cambiar. WHERE determina qué filas actualizar. Sin WHERE, todas las filas serían actualizadas, lo cual suele ser un error.",
  
  "¿Cuál es la forma correcta de hacer un GROUP BY en SQL con COUNT?": "GROUP BY agrupa filas con valores iguales en columnas especificadas. COUNT(*) cuenta el número de filas en cada grupo. Es fundamental para generar reportes y estadísticas agregadas.",
  
  "¿Cómo se crea una subconsulta en SQL?": "Las subconsultas son queries dentro de otras queries. IN permite verificar si un valor está en el resultado de la subconsulta. Son útiles cuando necesitas datos de una tabla para filtrar otra."
};

// Explicaciones para preguntas de práctica de código
const practiceExplanations = {
  ...rubyExplanations,
  ...jsExplanations,
  ...sqlExplanations
};

module.exports = {
  rubyExplanations,
  jsExplanations,
  sqlExplanations,
  practiceExplanations
};
