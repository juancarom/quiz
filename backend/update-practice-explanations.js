const fs = require('fs');
const path = require('path');

// Ruta al archivo de preguntas
const questionsFilePath = path.join(__dirname, 'all-questions.json');

// Leer el archivo JSON
const data = JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));

// Explicaciones de Practice
const practiceExplanations = {
  1: `\`reduce(:+)\` recorre el array acumulando el resultado de aplicar el operador \`+\` entre todos los elementos. Es una forma concisa de sumar todo el arreglo (similar a \`array.sum\`).`,
  
  2: `\`each\` itera elemento por elemento y ejecuta el bloque para cada uno. La variable entre pipes (\`|item|\`) representa el valor actual, y \`puts item\` lo imprime en cada iteración.`,
  
  3: `Un hash en Ruby se define entre \`{}\` y suele usar símbolos como claves: \`name:\` es azúcar sintáctico para \`:name =>\`. Este formato es el más común en Ruby moderno.`,
  
  4: `Los parámetros opcionales se definen asignando un valor por defecto en la firma del método (\`name = "World"\`). Si no se pasa argumento, se usa ese valor por defecto.`,
  
  5: `\`select\` devuelve un nuevo array con solo los elementos para los que el bloque devuelve \`true\`. En el ejemplo, filtra los mayores que 5.`,
  
  6: `El bloque \`begin...rescue...end\` captura excepciones que ocurran dentro de \`begin\`. En \`rescue => e\` recibes el objeto excepción para loguearlo o manejarlo.`,
  
  7: `En Ruby, el método especial \`initialize\` actúa como constructor y se ejecuta al llamar \`Person.new(...)\`. Las variables de instancia se guardan con \`@\` y pertenecen a cada objeto.`,
  
  8: `En Ruby puedes concatenar strings con \`+\`, con métodos como \`concat\`/\`<<\`, o mediante interpolación \`"Hola #{nombre}"\`. Todas las opciones son válidas, la interpolación suele ser la más legible.`,
  
  9: `\`include?\` devuelve \`true\` si el elemento está dentro del array y \`false\` si no. El \`?\` al final es una convención para métodos que responden sí/no.`,
  
  10: `\`.to_i\` convierte el string a entero devolviendo 0 si no es válido; \`Integer()\` también convierte, pero lanza una excepción si el formato no es numérico. Ambas son correctas según el comportamiento que necesites.`,
  
  11: `\`fetch\` devuelve una Promise; primero obtienes la respuesta, luego llamas a \`res.json()\` para parsear el cuerpo, y en el siguiente \`then\` accedes a los datos ya convertidos a objeto JS.`,
  
  12: `La desestructuración de objetos permite extraer propiedades en variables con el mismo nombre: \`name\` y \`age\` salen de \`person\`. Es más limpio que acceder con \`person.name\`, \`person.age\` muchas veces.`,
  
  13: `Una arrow function se define con \`=>\`. Si el cuerpo es una sola expresión (\`a + b\`), el \`return\` es implícito, lo que hace la función muy concisa.`,
  
  14: `\`async\` indica que la función devuelve una Promise y te permite usar \`await\` dentro. \`await\` pausa la ejecución hasta que la Promise se resuelve, haciendo el código asíncrono más legible.`,
  
  15: `\`new Promise((resolve, reject) => { ... })\` crea una Promise manualmente. Llamas a \`resolve(valor)\` cuando todo va bien y a \`reject(error)\` cuando ocurre un fallo.`,
  
  16: `Las tres variantes combinan filas de dos tablas basándose en una condición de igualdad: \`JOIN\`, \`INNER JOIN\` y el join implícito en \`WHERE\`. Todas logran un INNER JOIN.`,
  
  17: `\`CREATE INDEX\` crea un índice sobre la columna indicada para acelerar búsquedas y filtros. Es útil en columnas muy usadas en \`WHERE\` o \`JOIN\`.`,
  
  18: `\`UPDATE\` modifica filas existentes y \`WHERE\` limita qué filas se actualizan. Sin \`WHERE\` se actualizarían todas las filas de la tabla, algo peligroso en producción.`,
  
  19: `\`GROUP BY country\` agrupa a los usuarios por país, y \`COUNT(*)\` cuenta cuántas filas hay en cada grupo. Es la base para obtener estadísticas por categoría.`,
  
  20: `La subconsulta dentro de \`IN (...)\` devuelve un conjunto de IDs, y la query externa selecciona solo los usuarios cuyos \`id\` estén en ese conjunto. Es una forma habitual de combinar lógica entre tablas.`,
  
  21: `Un componente funcional con hooks usa una función JS normal y \`useState\` para manejar estado. El valor de estado se muestra en el JSX, y \`setState\` permite actualizarlo.`,
  
  22: `\`useEffect\` con un array de dependencias vacío (\`[]\`) se ejecuta solo una vez al montar el componente, parecido a \`componentDidMount\` en componentes de clase.`,
  
  23: `En React, las props se pasan como atributos JSX: \`name="John"\` (string) y \`age={30}\` (expresión JS). El componente hijo las recibe como \`props.name\`, \`props.age\` (o vía desestructuración).`,
  
  24: `El handler se asigna al prop \`onClick\` como una función. Usar una arrow function (\`() => handleClick()\`) asegura que la función se ejecute solo cuando el botón sea clicado.`,
  
  25: `\`useContext(MyContext)\` permite leer el valor actual del contexto más cercano definido por un \`<MyContext.Provider>\`. Así evitas pasar props de forma manual por muchos niveles.`,
  
  26: `\`@Injectable()\` marca la clase como provider en NestJS para que pueda ser inyectada mediante el sistema de inyección de dependencias del framework.`,
  
  27: `\`@Post()\` define un endpoint HTTP POST, y \`@Body()\` extrae el cuerpo de la petición como un DTO. Luego se delega la lógica al servicio usando ese DTO.`,
  
  28: `En NestJS, la inyección de dependencias se hace a través del constructor: \`private readonly service: MyService\` indica que Nest debe inyectar una instancia de \`MyService\`.`,
  
  29: `\`@UseGuards(AuthGuard)\` aplica un guard que se ejecuta antes del handler. Si el guard devuelve \`true\` la petición continúa; si no, se bloquea el acceso.`,
  
  30: `Los decoradores de \`class-validator\` como \`@IsString()\` y \`@IsNotEmpty()\` se aplican sobre propiedades del DTO para validar su tipo y que no vengan vacías.`,
  
  31: `\`rails generate migration ...\` crea un archivo de migración con el nombre y las columnas indicadas. Luego podrás ejecutarla con \`rails db:migrate\` para aplicar los cambios al esquema.`,
  
  32: `\`has_many :posts\` indica que un usuario puede tener muchos posts. Rails espera que la tabla \`posts\` tenga una columna \`user_id\` como clave foránea.`,
  
  33: `\`where\` filtra por condiciones y \`order\` define el orden de los registros. Encadenar métodos en ActiveRecord es la forma idiomática de construir queries.`,
  
  34: `\`before_save :normalize_email\` registra un callback que ejecutará el método \`normalize_email\` justo antes de guardar el modelo en la base de datos.`,
  
  35: `Rails permite validar presencia con \`validates :campo, presence: true\` o con \`validates_presence_of :campo\`. Ambas hacen que el registro no sea válido si el campo está vacío.`,
  
  36: `\`docker volume create my_volume\` crea un volumen gestionado por Docker, útil para persistir datos aunque el contenedor se destruya.`,
  
  37: `\`docker exec -it container_name bash\` abre una shell interactiva dentro de un contenedor en ejecución, ideal para debug y comandos rápidos.`,
  
  38: `\`docker build -t my_image:tag .\` construye una imagen usando el \`Dockerfile\` del directorio actual (\`.\`) y la etiqueta con el nombre y tag indicados.`,
  
  39: `\`EXPOSE 3000\` documenta en el Dockerfile que el contenedor usará el puerto 3000. No publica el puerto por sí solo, pero sirve para herramientas y para \`docker run -p\`.`,
  
  40: `Comandos como \`docker ps -a\` o \`docker container ls -a\` muestran todos los contenedores, incluyendo los que están detenidos, lo que es útil para inspeccionar su estado.`,
  
  41: `Una lambda en Python se define con la palabra clave \`lambda\` y devuelve el resultado de la expresión: \`lambda x, y: x + y\` crea una función anónima que suma dos valores.`,
  
  42: `El bloque \`with\` se encarga de abrir el archivo y cerrarlo automáticamente al salir del bloque. \`f.read()\` lee todo el contenido en un string.`,
  
  43: `Las list comprehensions permiten crear listas de forma compacta, por ejemplo \`[x * 2 for x in nums]\`. Puedes combinarlas con condiciones (\`if\`) para filtrar elementos.`,
  
  44: `\`try/except\` captura excepciones que ocurran dentro de \`try\`. \`except Exception as e\` te da acceso al objeto de la excepción para loguearlo o manejarlo.`,
  
  45: `Un decorador en Python es una función que recibe una función y devuelve otra función. Puedes aplicarlo con la sintaxis \`@decorator\` sobre una función o asignando manualmente \`func = decorator(func)\`.`,
  
  46: `Existen varias formas válidas de crear un bucket con AWS CLI (\`aws s3 mb\`, \`aws s3api create-bucket\`, etc.). Cambia principalmente la sintaxis y opciones, pero el resultado es el mismo: un bucket nuevo en S3.`,
  
  47: `\`aws s3 cp file.txt s3://my-bucket/\` sube el archivo local \`file.txt\` al bucket indicado. También puedes copiar directorios completos usando \`--recursive\`.`,
  
  48: `\`aws s3 ls s3://my-bucket\` lista los objetos almacenados en ese bucket, mostrando nombres y fechas de modificación.`,
  
  49: `\`aws ec2 run-instances\` lanza una instancia nueva especificando la AMI (\`--image-id\`) y el tipo (\`--instance-type\`). En un caso real añadirías claves, grupos de seguridad, etc.`,
  
  50: `\`aws lambda update-function-configuration ... --environment Variables={KEY=value}\` actualiza las variables de entorno de una función Lambda sin tener que redeployar el código.`,
  
  51: `En GraphQL, un \`type\` define la forma de un objeto: campos, tipos y obligatoriedad (\`!\`). Aquí \`User\` tiene un \`id\` obligatorio y un \`name\` obligatorio.`,
  
  52: `El tipo \`Query\` define los puntos de entrada de lectura de tu API GraphQL. \`users\` devuelve una lista de usuarios y \`user(id: ID!)\` devuelve un usuario específico.`,
  
  53: `\`type Mutation\` agrupa las operaciones que modifican datos. \`createUser\` recibe un input tipado y devuelve el usuario creado.`,
  
  54: `Un \`enum\` en GraphQL define un conjunto cerrado de valores posibles. \`Status\` solo puede ser \`ACTIVE\`, \`INACTIVE\` o \`PENDING\`.`,
  
  55: `Las variables en GraphQL se declaran en la cabecera de la query (\`$id: ID!\`) y se usan dentro (\`user(id: $id)\`). Así evitas interpolar valores directamente en la query.`,
  
  56: `En MongoDB, si intentas insertar en una colección que no existe, el servidor la crea automáticamente. También puedes crearla explícitamente con \`db.createCollection()\`.`,
  
  57: `Puedes insertar un solo documento con \`insertOne()\` o varios con \`insertMany()\`. Ambas son formas válidas de añadir datos a una colección.`,
  
  58: `\`find\` recibe un filtro en forma de documento. Aquí se buscan usuarios con \`age\` mayor que 18 (\`$gt\`) y \`active: true\` al mismo tiempo.`,
  
  59: `\`updateOne\` busca un documento que cumpla el filtro (\`{ _id: id }\`) y aplica los cambios definidos en el operador \`$set\`, en este caso actualizando el nombre.`,
  
  60: `\`createIndex({ email: 1 })\` crea un índice ascendente sobre la columna \`email\`, acelerando las búsquedas y filtros basados en ese campo.`
};

// Actualizar las explicaciones
data.practice.forEach((question, index) => {
  const explanationKey = index + 1;
  if (practiceExplanations[explanationKey]) {
    question.explanation = practiceExplanations[explanationKey];
  }
});

// Guardar el archivo actualizado
fs.writeFileSync(questionsFilePath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ Las 60 explicaciones de Practice han sido actualizadas exitosamente en all-questions.json');
console.log(`📊 Total preguntas Practice: ${data.practice.length}`);
