const fs = require('fs');
const path = require('path');

// Ruta al archivo de preguntas
const questionsFilePath = path.join(__dirname, 'all-questions.json');

// Leer el archivo JSON
const data = JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));

// Explicaciones de POO
const pooExplanations = {
  1: `Una clase es el "molde" de los objetos: define qué datos (atributos) y qué operaciones (métodos) estarán disponibles en las instancias creadas a partir de ella.`,
  
  2: `Un objeto es una instancia concreta de una clase, con sus propios valores de atributos y la capacidad de ejecutar los métodos definidos por esa clase.`,
  
  3: `La encapsulación consiste en ocultar los detalles internos de una clase y exponer solo una interfaz pública, normalmente usando modificadores de acceso (public, private, protected).`,
  
  4: `La herencia permite que una clase hija reutilice y extienda atributos y métodos de una clase padre, modelando relaciones del tipo "es-un".`,
  
  5: `El polimorfismo permite que el mismo método (mismo nombre) se comporte de manera diferente según el tipo concreto del objeto que lo ejecuta.`,
  
  6: `La abstracción consiste en centrarse en los aspectos esenciales de un objeto y ocultar detalles innecesarios, por ejemplo mediante clases abstractas e interfaces.`,
  
  7: `La herencia expresa relaciones "es-un" (un Perro es-un Animal), mientras que la composición expresa "tiene-un" (un Coche tiene-un Motor); la composición suele dar diseños más flexibles.`,
  
  8: `SRP indica que cada clase debe tener una única razón para cambiar, es decir, una sola responsabilidad bien definida.`,
  
  9: `OCP dice que los módulos deben poder extenderse con nuevo comportamiento sin tener que modificar su código existente, por ejemplo mediante interfaces o herencia.`,
  
  10: `LSP indica que cualquier instancia de una subclase debe poder usarse donde se espera la clase base sin romper el comportamiento esperado del sistema.`,
  
  11: `ISP recomienda tener varias interfaces pequeñas y específicas en vez de una interfaz grande y genérica, para que las clases dependan solo de lo que realmente usan.`,
  
  12: `DIP propone que las clases dependan de abstracciones (interfaces) en lugar de implementaciones concretas, facilitando el cambio y las pruebas.`,
  
  13: `Un método es una función definida dentro de una clase que describe acciones o comportamientos que los objetos de esa clase pueden realizar.`,
  
  14: `Un atributo es una variable declarada dentro de una clase que almacena parte del estado del objeto (por ejemplo, nombre, edad, saldo).`,
  
  15: `El constructor es un método especial que se ejecuta automáticamente al crear un objeto y suele inicializar sus atributos.`,
  
  16: `Un método estático pertenece a la clase en sí y puede llamarse sin crear una instancia; normalmente se usa para utilidades o lógica que no depende del estado de un objeto concreto.`,
  
  17: `Una interfaz define un contrato de métodos (y a veces propiedades) que las clases que la implementan se comprometen a proporcionar.`,
  
  18: `Una clase abstracta no puede instanciarse directamente, puede contener métodos abstractos y sirve como base común para que otras clases la extiendan.`,
  
  19: `El modificador \`private\` restringe el acceso a un miembro para que solo pueda ser usado dentro de la misma clase, reforzando la encapsulación.`,
  
  20: `El modificador \`protected\` permite acceder a un miembro desde la propia clase y desde sus subclases, pero no desde código externo.`,
  
  21: `El modificador \`public\` hace que un miembro sea accesible desde cualquier parte del código que vea a la clase, componiendo la interfaz pública de esa clase.`,
  
  22: `La sobrecarga (overloading) permite definir varios métodos con el mismo nombre pero diferentes firmas (parámetros), para manejar casos de uso similares.`,
  
  23: `La sobreescritura (overriding) ocurre cuando una subclase redefine un método heredado para ajustar o extender su comportamiento.`,
  
  24: `DRY ("Don't Repeat Yourself") anima a extraer lógica repetida en un solo lugar reutilizable, reduciendo errores y facilitando los cambios.`,
  
  25: `El acoplamiento mide cuán dependiente es una clase de otras; un diseño con bajo acoplamiento es más fácil de modificar y probar.`,
  
  26: `La cohesión mide cuán relacionadas están las responsabilidades de una clase; alta cohesión implica que la clase hace pocas cosas pero muy relacionadas entre sí.`,
  
  27: `Mantenibilidad y escalabilidad son beneficios clave de POO: el código orientado a objetos suele ser más fácil de modificar, ampliar y entender con el tiempo.`,
  
  28: `El principio de responsabilidad única dice que una clase debe tener una sola razón para cambiar, es decir, un único objetivo claro dentro del sistema.`,
  
  29: `El principio Open/Closed indica que debemos poder añadir nuevas funcionalidades extendiendo clases existentes (o añadiendo nuevas), sin tener que cambiar su código.`,
  
  30: `LSP dice que las subclases deben respetar las expectativas de la clase base; si reemplazas el tipo base por un subtipo, el código cliente debe seguir funcionando correctamente.`,
  
  31: `ISP sugiere dividir interfaces grandes en varias interfaces pequeñas para que las clases implementen solo lo que realmente necesitan.`,
  
  32: `DIP anima a que los módulos de alto nivel dependan de interfaces o abstracciones, no de detalles concretos, lo que facilita intercambiar implementaciones.`,
  
  33: `Dentro de SOLID, OCP y LSP son dos de los cinco principios que ayudan a que el diseño sea extensible y los tipos derivados sean seguros de usar.`,
  
  34: `Un patrón de diseño es una solución probada y reutilizable a un problema de diseño recurrente, descrita de forma genérica para poder aplicarla en distintos contextos.`,
  
  35: `Los patrones estructurales se centran en cómo se relacionan y componen las clases; los de comportamiento se centran en cómo se comunican y colaboran los objetos.`,
  
  36: `El patrón Singleton garantiza que exista una única instancia de una clase y proporciona un punto global de acceso a ella.`,
  
  37: `El patrón Factory encapsula la lógica de creación de objetos, permitiendo crear instancias sin acoplar el código cliente a clases concretas.`,
  
  38: `El patrón Builder separa la construcción de un objeto complejo de su representación final, permitiendo crear variaciones paso a paso con el mismo proceso.`,
  
  39: `El patrón Prototype crea nuevos objetos clonando un objeto prototipo existente, útil cuando la creación directa es costosa o compleja.`,
  
  40: `El patrón Adapter actúa como un traductor entre dos interfaces incompatibles, permitiendo reutilizar código sin modificarlo.`,
  
  41: `El patrón Decorator envuelve un objeto para añadirle responsabilidades adicionales en tiempo de ejecución sin modificar su clase.`,
  
  42: `El patrón Facade ofrece una interfaz simple y unificada a un subsistema complejo, reduciendo el acoplamiento con sus detalles internos.`,
  
  43: `El patrón Proxy proporciona un objeto sustituto que controla el acceso a otro objeto, por ejemplo para aplicar caché, lazy loading o control de acceso.`,
  
  44: `El patrón Observer define una relación uno-a-muchos: cuando el objeto observado cambia, notifica automáticamente a todos sus observadores.`,
  
  45: `El patrón Strategy encapsula algoritmos intercambiables detrás de una misma interfaz, permitiendo cambiar el comportamiento en tiempo de ejecución.`,
  
  46: `El patrón Template Method define el esqueleto de un algoritmo en una clase base y permite que las subclases personalicen pasos específicos.`,
  
  47: `El patrón Command encapsula una petición como un objeto, permitiendo parametrizar acciones, hacer colas de comandos o deshacer (undo) operaciones.`,
  
  48: `"Composición sobre herencia" recomienda preferir construir objetos a partir de otros (delegando responsabilidades) antes que crear jerarquías profundas de herencia.`,
  
  49: `La composición reduce el acoplamiento y ayuda a evitar jerarquías rígidas y difíciles de mantener, por eso se suele preferir frente a herencia en muchos casos.`,
  
  50: `Una clase final o sealed es una clase que no puede ser extendida, lo que puede usarse para evitar herencias indebidas o por motivos de seguridad/diseño.`,
  
  51: `Un método final no puede ser sobrescrito en las subclases, garantizando que su comportamiento permanezca inalterado.`,
  
  52: `La inyección de dependencias consiste en que las dependencias se pasen "desde fuera" (por constructor, setter, etc.) en lugar de que la propia clase las cree.`,
  
  53: `En setter injection la dependencia se pasa mediante un método setter; en interface injection, la clase expone métodos definidos en una interfaz para recibir sus dependencias.`,
  
  54: `La inversión de control significa que el flujo principal de la aplicación está controlado por un framework o contenedor, no por el código de usuario.`,
  
  55: `Un contenedor de IoC es una herramienta que crea objetos, resuelve sus dependencias e inyecta las instancias adecuadas según una configuración.`,
  
  56: `GRASP ("General Responsibility Assignment Software Patterns") es un conjunto de patrones que ayudan a decidir cómo asignar responsabilidades a clases y objetos.`,
  
  57: `Information Expert sugiere asignar una responsabilidad a la clase que tiene la información necesaria, y Low Coupling recomienda minimizar las dependencias entre clases.`,
  
  58: `Information Expert indica que la clase que posee los datos relevantes debe ser la que implemente la lógica relacionada con esos datos.`,
  
  59: `El principio Creator orienta sobre qué clase debe crear instancias de otra: típicamente aquella que las contiene, las usa intensivamente o tiene los datos necesarios para inicializarlas.`,
  
  60: `Controller en GRASP propone usar un objeto controlador para recibir y coordinar las peticiones del sistema, separando la lógica de flujo de los objetos de dominio.`,
  
  61: `Pure Fabrication es una clase creada por motivos puramente técnicos (no de dominio) para mejorar la cohesión o reducir el acoplamiento, por ejemplo un repositorio.`,
  
  62: `Indirection introduce un objeto intermediario entre dos componentes para reducir su acoplamiento directo y facilitar cambios futuros.`,
  
  63: `Protected Variations sugiere aislar los elementos del sistema frente a cambios probables, usando interfaces estables o puntos de extensión bien definidos.`,
  
  64: `"Tell, Don't Ask" recomienda decirle al objeto qué debe hacer en vez de pedirle datos para que otro objeto lo haga, favoreciendo el encapsulamiento.`,
  
  65: `La Ley de Demeter dice que un objeto debe comunicarse solo con sus "vecinos" inmediatos, evitando cadenas largas de llamadas como \`obj.a().b().c()\`.`,
  
  66: `En LoD, es válido hablar con los parámetros del método y con los objetos que la clase crea directamente, porque se consideran sus colaboradores inmediatos.`,
  
  67: `YAGNI ("You Aren't Gonna Need It") recuerda que no deberías implementar funcionalidad hasta que realmente sea necesaria, evitando complejidad anticipada.`,
  
  68: `KISS ("Keep It Simple, Stupid") anima a elegir la solución más simple que funcione, en lugar de diseños demasiado sofisticados sin necesidad.`,
  
  69: `Un God Object es una clase que concentra demasiadas responsabilidades o conocimiento, violando SRP y haciendo el sistema difícil de mantener.`,
  
  70: `Spaghetti Code es un código desordenado con dependencias enredadas y flujo poco claro, lo que dificulta entenderlo, probarlo y modificarlo.`,
  
  71: `Un code smell es una señal de que puede haber un problema de diseño o calidad en el código, aunque aún funcione correctamente.`,
  
  72: `Clases muy grandes y código duplicado son ejemplos típicos de code smells que señalan oportunidades de refactorización.`,
  
  73: `Refactoring es modificar la estructura interna del código para mejorar su diseño, sin cambiar su comportamiento observado desde fuera.`,
  
  74: `Es habitual refactorizar antes de añadir nuevas funcionalidades o durante las code reviews, para mantener el diseño limpio a medida que el sistema crece.`,
  
  75: `En TDD primero se escribe un test que falla, luego el código mínimo para hacerlo pasar y después se mejora el diseño mediante refactorización.`,
  
  76: `En el ciclo TDD: "Green" es la fase donde haces que el test pase, y "Refactor" es donde mejoras el código manteniendo todos los tests en verde.`,
  
  77: `BDD se centra en describir el comportamiento esperado del sistema en lenguaje cercano al negocio, alineando código, tests y requisitos.`,
  
  78: `Un mock es un objeto simulado que reemplaza a una dependencia real en un test y permite verificar si se llamaron ciertos métodos o interacciones.`,
  
  79: `Un stub es una implementación muy simple que devuelve datos predefinidos, usada para aislar el código bajo prueba de dependencias externas.`,
  
  80: `Un spy registra información sobre cómo se llamaron los métodos (parámetros, número de llamadas, etc.), útil para verificar comportamientos en tests.`,
  
  81: `Un stub solo provee datos de prueba, mientras que un mock además permite verificar las interacciones (por ejemplo, que un método se llamara X veces).`,
  
  82: `La cobertura de código mide qué porcentaje de líneas, ramas o métodos se ejecutan durante los tests, ayudando a detectar partes no probadas.`,
  
  83: `Tener 100% de cobertura no garantiza buenos tests: pueden existir tests poco significativos o que no validen correctamente los casos importantes.`,
  
  84: `El integration testing comprueba que varios componentes o módulos funcionan correctamente juntos, incluyendo su interacción con recursos externos.`,
  
  85: `El end-to-end testing valida flujos completos de la aplicación desde el punto de vista del usuario, atravesando todas las capas implicadas.`,
  
  86: `CI consiste en integrar cambios en el repositorio principal con frecuencia y ejecutar automáticamente los tests para detectar problemas pronto.`,
  
  87: `CD busca que el código que pasa los pipelines de CI pueda desplegarse automáticamente (o casi) a entornos superiores con mínima intervención manual.`,
  
  88: `GitHub Actions y GitLab CI son plataformas que permiten definir pipelines automatizados de construcción, test y despliegue de aplicaciones.`,
  
  89: `En pair programming dos desarrolladores trabajan sobre el mismo código, normalmente uno "escribe" y el otro revisa y piensa en el diseño.`,
  
  90: `En un code review otros desarrolladores revisan los cambios antes de integrarlos, detectando errores, mejorando el diseño y compartiendo conocimiento.`,
  
  91: `Clean code es código fácil de leer, entender y modificar, con nombres claros, responsabilidades bien separadas y pocas sorpresas.`,
  
  92: `Funciones pequeñas y ausencia de duplicación son características clave de clean code, porque simplifican la lectura y reducen el riesgo de errores al cambiar el sistema.`
};

// Actualizar las explicaciones
data.poo.forEach((question, index) => {
  const explanationKey = index + 1;
  if (pooExplanations[explanationKey]) {
    question.explanation = pooExplanations[explanationKey];
  }
});

// Guardar el archivo actualizado
fs.writeFileSync(questionsFilePath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ Las 92 explicaciones de POO han sido actualizadas exitosamente en all-questions.json');
console.log(`📊 Total preguntas POO: ${data.poo.length}`);
