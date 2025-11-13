const fs = require('fs');

// Todas las explicaciones de Docker (preguntas 1-60)
const dockerExplanations = {
  1: `Docker es una plataforma que te permite **empaquetar una aplicación y sus dependencias en contenedores**. Con eso podés correr la misma app de forma consistente en distintos entornos (tu máquina, un server, CI/CD). La idea central es: *"empaqueto una vez, corro igual en todos lados"*.`,
  
  2: `Un contenedor es **una instancia en ejecución de una imagen**. Tiene su propio sistema de archivos aislado, procesos, configuración y red lógica, pero comparte el kernel del sistema operativo del host. Es como un "mini-entorno" donde vive tu aplicación, liviano y fácil de crear/destruir.`,
  
  3: `Una imagen Docker es una **plantilla de solo lectura** que contiene todo lo necesario para correr una app: código, runtime, librerías y configuración base. De esa imagen se crean contenedores. Se compone de **capas**, lo que permite cache, versionado y reutilización (por ejemplo: \`nginx:1.21\`).`,
  
  4: `La diferencia clave es que la **máquina virtual tiene un sistema operativo completo**, mientras que el contenedor comparte el kernel del host. Por eso, los contenedores son más livianos, se inician más rápido y consumen menos recursos que una VM, pero siguen ofreciendo aislamiento a nivel de proceso y sistema de archivos.`,
  
  5: `El comando \`docker run\` **crea y arranca un contenedor a partir de una imagen**. Podés pasarle parámetros como puertos (\`-p\`), volúmenes (\`-v\`), nombre (\`--name\`) o entorno (\`-e\`). En una sola línea, definís cómo se va a ejecutar tu aplicación dentro del contenedor.`,
  
  6: `Un **Dockerfile** es un archivo de texto con **instrucciones paso a paso para construir una imagen**. Ahí definís la imagen base (\`FROM\`), copiás archivos (\`COPY\`), instalás dependencias (\`RUN\`) y configurás el comando por defecto (\`CMD\` o \`ENTRYPOINT\`). Es la receta que Docker usa para "hornear" la imagen.`,
  
  7: `La instrucción \`FROM\` indica **qué imagen base** se va a usar para construir la nueva imagen. Es siempre la primera línea del Dockerfile (salvo comentarios) y define el punto de partida, por ejemplo: \`FROM node:20-alpine\` o \`FROM ubuntu:22.04\`.`,
  
  8: `\`RUN\` ejecuta **comandos en el momento de construir la imagen** (build time). Lo típico es usarlo para instalar paquetes, compilar o configurar el entorno: por ejemplo \`RUN apt-get update && apt-get install -y curl\`. Cada \`RUN\` crea una nueva capa en la imagen.`,
  
  9: `\`CMD\` define **el comando por defecto que se ejecutará cuando arranque el contenedor** si no se especifica otro en \`docker run\`. Por ejemplo, \`CMD ["npm", "start"]\`. Solo puede haber un \`CMD\` efectivo (el último definido) y es fácilmente sobrescribible desde la línea de comandos.`,
  
  10: `Tanto \`CMD\` como \`ENTRYPOINT\` definen qué se ejecuta al iniciar el contenedor, pero:\n\n* \`ENTRYPOINT\` fija el **programa principal** (más difícil de cambiar)\n* \`CMD\` suele usarse como **argumentos por defecto** de ese programa.\n\nEn la práctica, se sobrescribe \`CMD\` con parámetros en \`docker run\`, mientras que \`ENTRYPOINT\` se puede cambiar pero requiere la opción \`--entrypoint\`.`,
  
  11: `\`COPY\` se usa para **copiar archivos o directorios desde el host (contexto de build) hacia la imagen**. Es directo y predecible: \`COPY . /app\` copia el contenido actual del proyecto en el directorio \`/app\` del contenedor. Es la opción recomendada para la mayoría de los casos.`,
  
  12: `\`ADD\` funciona parecido a \`COPY\`, pero con extras: puede **extraer archivos comprimidos** (como \`.tar\`) directamente en la imagen y también admite **URLs remotas**. Justamente por esas "magias" implícitas, se recomienda usar \`COPY\` para casos normales y \`ADD\` solo cuando necesitás esos comportamientos.`,
  
  13: `\`WORKDIR\` establece el **directorio de trabajo por defecto** dentro de la imagen para las instrucciones siguientes (\`RUN\`, \`CMD\`, \`ENTRYPOINT\`, etc.). Es equivalente a hacer un \`cd\` permanente dentro del contenedor. Por ejemplo: \`WORKDIR /app\` y luego \`RUN npm install\` se ejecuta dentro de \`/app\`.`,
  
  14: `\`EXPOSE\` sirve para **documentar qué puertos escucha el contenedor**. No publica el puerto hacia el host por sí mismo, pero indica la intención (por ejemplo \`EXPOSE 3000\`). Para exponerlo externamente tenés que usar \`-p host:container\` en \`docker run\` o la sección \`ports:\` en Docker Compose.`,
  
  15: `\`ENV\` define **variables de entorno** dentro de la imagen/contendor. Estas variables se usarán en tiempo de ejecución, por ejemplo: \`ENV NODE_ENV=production\`. Son útiles para configurar la app sin cambiar el código (credenciales, modos de ejecución, flags, etc.).`,
  
  16: `Las imágenes Docker se construyen por **capas inmutables**, y esas capas se **cachean**. Inmutable significa que una vez creada la capa, no se modifica; si cambiás algo, se genera otra capa nueva. El cache permite que, si una instrucción no cambió, Docker reutilice la capa anterior, acelerando muchísimo los builds.`,
  
  17: `La idea de esta pregunta es listar imágenes locales. En Docker, el comando real para eso es \`docker images\` (o \`docker image ls\`) y muestra nombre, tag, ID y tamaño de cada imagen. Lo importante es entender que **imágenes = plantillas** a partir de las cuales crear contenedores.`,
  
  18: `\`docker ps\` lista **los contenedores que están en ejecución**. Muestra su ID, imagen de origen, comando, estado, puertos expuestos y nombre. Es uno de los comandos básicos para ver qué se está ejecutando en tu entorno Docker en ese momento.`,
  
  19: `La idea de la pregunta es ver **todos los contenedores, incluidos los detenidos**. En la práctica, el comando real es \`docker ps -a\`. Esto te permite revisar contenedores que ya terminaron, ver sus estados y decidir si querés borrarlos, reiniciarlos o inspeccionarlos.`,
  
  20: `\`docker stop <container_id>\` envía una señal al proceso principal del contenedor para que **se detenga de forma ordenada** (graceful shutdown). Podés usar el ID o el nombre del contenedor. Si el proceso no termina a tiempo, Docker puede forzar el apagado con \`docker kill\`.`,
  
  21: `\`docker rm <container_id>\` **elimina un contenedor** que ya no necesitás. Normalmente el contenedor debe estar detenido antes de borrarlo, así evitás errores. Es útil para limpiar el entorno y no acumular contenedores viejos que ocupan espacio y ensucian tus listados.`,
  
  22: `\`docker rmi <image_id>\` o \`docker image rm\` **eliminan una imagen** del sistema. Solo se puede borrar si no está siendo usada por ningún contenedor. Esto ayuda a recuperar espacio en disco y a mantener tu máquina limpia de imágenes antiguas o de pruebas.`,
  
  23: `**Docker Hub** es un **registro público de imágenes Docker**. Ahí podés buscar imágenes oficiales (nginx, postgres, node, etc.) o subir tus propias imágenes para compartirlas con tu equipo o con la comunidad. Es como el "GitHub de las imágenes de contenedores".`,
  
  24: `\`docker pull <image_name>\` **descarga una imagen** desde un registro (por defecto, Docker Hub) a tu máquina local. Por ejemplo, \`docker pull redis:7\` trae la imagen de Redis lista para crear contenedores a partir de ella.`,
  
  25: `\`docker push <image_name>\` **sube una imagen** desde tu máquina a un registro como Docker Hub o un registry privado. Es el paso final típico después de hacer \`docker build\` y \`docker tag\`, para que otros puedan usar tu imagen.`,
  
  26: `Un **Docker volume** es un mecanismo para **persistir datos fuera del ciclo de vida del contenedor**. Aunque el contenedor se elimine, los datos en el volumen permanecen. Esto es clave para bases de datos o cualquier aplicación que no pueda perder información al recrear contenedores.`,
  
  27: `Docker soporta varios tipos de montajes:\n\n* **Volumes** (gestionados por Docker)\n* **Bind mounts** (carpetas del host montadas en el contenedor)\n* **tmpfs mounts** (en memoria, no en disco)\n\nEn la pregunta se destacan **bind mounts** y **tmpfs**, que son formas muy comunes de compartir datos entre host y contenedor.`,
  
  28: `Un **bind mount** monta **una ruta concreta del host dentro del contenedor**. Los cambios se ven en ambos lados: lo que editás en tu carpeta local se ve dentro del contenedor y viceversa. Es muy útil para desarrollo, porque podés editar código en tu editor y que el contenedor lo use al instante.`,
  
  29: `La diferencia clave:\n\n* Un **volume** es gestionado por Docker y se guarda en rutas internas controladas por Docker.\n* Un **bind mount** apunta a una ruta específica del host que vos elegís.\n\nEn general, para producción se recomiendan **volumes**; para desarrollo, spesso son muy prácticos los **bind mounts**.`,
  
  30: `**Docker Compose** es una herramienta para **definir y ejecutar aplicaciones multi-contenedor** usando un archivo YAML. En vez de lanzar cada contenedor a mano, describís servicios, redes y volúmenes en un solo archivo y levantás todo con un comando (\`docker-compose up\`).`,
  
  31: `Docker Compose usa archivos como \`docker-compose.yml\` o \`compose.yaml\` para describir la aplicación: servicios, imágenes, puertos, volúmenes, redes, variables de entorno, etc. Ese archivo se convierte en la "fuente de verdad" de cómo debe correr tu stack.`,
  
  32: `\`docker-compose up\` **inicia todos los servicios definidos** en el archivo de Compose. Puede construir imágenes si hacen falta (\`build:\`), crear redes, volúmenes y arrancar contenedores en el orden apropiado. Con una sola instrucción levantás todo el entorno.`,
  
  33: `\`docker-compose down\` **detiene y elimina los contenedores, redes y por defecto las cosas asociadas al stack** (salvo volúmenes persistentes, según flags). Es el complemento de \`up\`: te permite bajar el entorno completo de forma ordenada y dejar limpio tu sistema.`,
  
  34: `En Docker Compose, un **servicio** es la **definición de un contenedor (o conjunto de contenedores) y su configuración**: qué imagen usa, puertos, volúmenes, variables, redes, etc. Por ejemplo, un servicio \`db\` puede representar una base de datos Postgres dentro de tu stack.`,
  
  35: `\`depends_on\` en Docker Compose **indica dependencias entre servicios**, es decir, el orden de inicio. Por ejemplo, \`web\` puede depender de \`db\` para que primero se levante la base de datos. No garantiza que la app esté "lista", solo que el contenedor se inicie antes.`,
  
  36: `Una **red Docker** permite **que los contenedores se comuniquen entre sí** de forma aislada. Dentro de una red, los contenedores se resuelven por nombre de servicio (DNS interno), lo que simplifica conectar \`web\`, \`db\`, \`redis\`, etc., sin exponerlos necesariamente al host.`,
  
  37: `Docker trae varios drivers de red, entre ellos:\n\n* **bridge** (por defecto)\n* **host**\n* **none**\n\nEn la pregunta se resaltan **host** (el contenedor usa directamente la red del host) y **none** (sin red), que son opciones útiles para casos específicos de rendimiento o aislamiento extremo.`,
  
  38: `Una **bridge network** es una **red privada creada por Docker** donde los contenedores pueden comunicarse entre ellos usando nombres. Es el modo por defecto: tus contenedores "ven" a otros contenedores de la misma red, pero no están expuestos directamente hacia afuera salvo que mapees puertos.`,
  
  39: `En **host network**, el contenedor **usa directamente la red del host**, sin NAT ni red virtual intermedia. Esto significa que el contenedor comparte la IP del host y expone sus puertos directamente. Puede mejorar rendimiento de red, pero pierde parte del aislamiento.`,
  
  40: `\`docker network create <name>\` **crea una nueva red Docker**. Luego podés conectar contenedores a esa red (\`--network <name>\` o vía Docker Compose). Esto te permite separar entornos lógicos (por ejemplo, una red para servicios internos y otra para pruebas) y organizar mejor tu arquitectura.`,
  
  41: `\`docker network ls\` muestra **todas las redes Docker disponibles** en tu sistema. Cada red puede tener contenedores conectados, y Docker las crea automáticamente (por ejemplo \`bridge\`, \`host\`, \`none\`). Es útil para verificar qué redes existen o si tus contenedores están correctamente conectados.`,
  
  42: `Un **multi-stage build** usa **varios \`FROM\` dentro de un mismo Dockerfile**. Esto permite separar la etapa de compilación (más pesada) de la etapa final (más liviana). Así, solo copiás lo necesario al contenedor final, reduciendo tamaño y mejorando seguridad.`,
  
  43: `Los **multi-stage builds** reducen el tamaño de las imágenes al **eliminar dependencias de compilación o herramientas temporales**. Por ejemplo, podés compilar una app con Node o Go en una etapa y copiar solo el binario al stage final basado en \`alpine\`. Resultado: una imagen mucho más chica.`,
  
  44: `El archivo \`.dockerignore\` **excluye archivos y carpetas** del contexto de construcción. Funciona igual que \`.gitignore\`: evita enviar al build cosas innecesarias como logs, \`node_modules\` o archivos temporales. Esto acelera la construcción y mantiene las imágenes más limpias.`,
  
  45: `\`docker exec\` permite **ejecutar comandos dentro de un contenedor ya en ejecución**. Es útil para inspeccionar procesos o correr tareas puntuales. Por ejemplo: \`docker exec -it web bash\` abre una terminal interactiva en el contenedor \`web\`.`,
  
  46: `\`docker exec -it <container> /bin/bash\` abre **una sesión interactiva dentro del contenedor**. Es como "entrar" al entorno del contenedor para explorar archivos o probar comandos. Si la imagen no tiene \`bash\`, podés usar \`sh\` como alternativa.`,
  
  47: `\`docker logs <container>\` muestra **los logs de salida estándar (stdout/stderr)** del contenedor. Es esencial para depurar errores, revisar qué está haciendo tu aplicación o integrar con herramientas de monitoreo. Se puede combinar con \`-f\` para seguir logs en tiempo real.`,
  
  48: `La opción \`--rm\` en \`docker run\` indica que el contenedor debe **borrarse automáticamente al detenerse**. Es muy práctica para tareas temporales o pruebas, ya que evita acumular contenedores inactivos en tu sistema.`,
  
  49: `El flag \`-d\` (detached mode) ejecuta el contenedor **en segundo plano**, liberando la terminal. Es ideal para servicios que deben mantenerse corriendo (por ejemplo, un servidor web). Luego podés verlos con \`docker ps\` o detenerlos con \`docker stop\`.`,
  
  50: `El flag \`-p\` mapea **puertos del host al contenedor**, con formato \`-p host_port:container_port\`. Por ejemplo, \`-p 8080:80\` expone el puerto 80 del contenedor en el puerto 8080 del host, permitiendo acceder a la app desde el navegador en \`localhost:8080\`.`,
  
  51: `\`-v host_path:container_path\` monta un **volumen o carpeta del host** dentro del contenedor. Es esencial para persistir datos o compartir archivos. Por ejemplo, \`-v ./data:/var/lib/mysql\` mantiene los datos de MySQL aunque se borre el contenedor.`,
  
  52: `\`--name\` le asigna **un nombre legible al contenedor**, en lugar del ID aleatorio que genera Docker. Esto facilita el manejo diario: podés hacer \`docker stop web\` en lugar de escribir un hash largo. También ayuda en scripts o cuando varios servicios interactúan.`,
  
  53: `El flag \`-e\` permite **definir variables de entorno al ejecutar el contenedor**. Por ejemplo:\n\`docker run -e NODE_ENV=production myapp\`\n\nEsto configura comportamientos del runtime sin modificar la imagen, ideal para parametrizar entornos (producción, staging, etc.).`,
  
  54: `**Docker Swarm** es el **orquestador nativo de Docker** que permite administrar clusters de múltiples hosts. Te deja desplegar servicios distribuidos, escalar contenedores y balancear carga sin herramientas externas. Es más simple que Kubernetes, aunque con menos funcionalidades avanzadas.`,
  
  55: `**Docker Swarm** es más simple y directo, ideal para pequeñas infraestructuras; **Kubernetes** es más complejo y potente, pensado para clusters grandes y automatización completa. Ambos gestionan contenedores, pero Kubernetes ofrece más control, plugins y ecosistema.`,
  
  56: `Un **registry privado Docker** es un **servidor propio donde almacenás tus imágenes** en lugar de publicarlas en Docker Hub. Permite mantener código interno seguro y controlar acceso. Ejemplo: \`harbor\`, \`GitLab Container Registry\` o \`AWS ECR\`.`,
  
  57: `Los **registries populares** incluyen **Amazon ECR (Elastic Container Registry)**, **Google Container Registry (GCR)** y **GitHub Container Registry**. Todos permiten subir, versionar y controlar acceso a tus imágenes Docker para entornos empresariales o CI/CD.`,
  
  58: `**Docker Desktop** es una aplicación gráfica para **usar Docker en Windows y macOS**. Incluye el motor Docker, una interfaz visual, herramientas CLI y soporte para Kubernetes local. Es la forma más sencilla de empezar con Docker en entornos no Linux.`,
  
  59: `**containerd** es el **runtime de contenedores** que ejecuta realmente los contenedores debajo de Docker. Es el componente que se encarga de crear, iniciar, detener y administrar contenedores. Kubernetes también puede usar \`containerd\` directamente sin Docker.`,
  
  60: `**OCI (Open Container Initiative)** es un **estándar abierto** que define cómo deben formarse las imágenes y los runtimes de contenedores. Gracias a OCI, cualquier contenedor compatible puede correr en distintas plataformas (Docker, Podman, containerd) sin problemas de compatibilidad.`,
  
  61: `\`docker inspect\` devuelve **información detallada en formato JSON** sobre un contenedor, imagen, red o volumen. Muestra configuración completa, estado, puertos, variables, montajes, IPs y metadatos. Es útil para debugging y scripts que necesitan información precisa del entorno.`,
  
  62: `\`docker stats\` muestra **estadísticas de uso de recursos en tiempo real** para los contenedores en ejecución: CPU, memoria, I/O de red y disco. Es como un \`top\` para contenedores, ideal para monitorear rendimiento y detectar cuellos de botella.`,
  
  63: `El **HEALTHCHECK** es una instrucción del Dockerfile que **define cómo verificar que el contenedor funciona correctamente**. Por ejemplo:\n\n\`\`\`dockerfile\nHEALTHCHECK CMD curl -f http://localhost/ || exit 1\n\`\`\`\n\nDocker ejecuta este comando periódicamente y marca el contenedor como "healthy" o "unhealthy".`,
  
  64: `\`docker system prune\` **limpia recursos no usados**: contenedores detenidos, redes sin usar, imágenes huérfanas y cache de build. Con \`-a\` elimina también imágenes sin contenedores asociados. Es útil para recuperar espacio en disco rápidamente.`,
  
  65: `El **build cache** guarda capas de imagen ya construidas para reutilizarlas en builds futuros. Si una instrucción del Dockerfile no cambió, Docker usa la capa cacheada en lugar de reconstruirla. Esto acelera muchísimo el proceso de build.`,
  
  66: `**Tagear una imagen** significa asignarle un nombre y versión legibles usando \`docker tag\`. Por ejemplo:\n\n\`\`\`bash\ndocker tag myapp:latest myrepo/myapp:v1.0\n\`\`\`\n\nEsto facilita identificar versiones y publicar en registries con nombres organizados.`,
  
  67: `Las **imágenes Alpine** son versiones minimalistas de Linux basadas en Alpine Linux (5-10 MB). Son ideales para contenedores porque reducen tamaño, superficie de ataque y tiempo de descarga. Ejemplo: \`node:20-alpine\` vs \`node:20\` (diferencia de cientos de MB).`,
  
  68: `Las **imágenes distroless** no incluyen shell, gestores de paquetes ni utilidades de sistema: solo el runtime necesario. Son más seguras porque reducen drásticamente la superficie de ataque. Google las popularizó para producción con alta seguridad.`,
  
  69: `Las **dangling images** son **imágenes sin tag** (aparecen como \`<none>\`). Se generan cuando construís una nueva versión con el mismo nombre, dejando la vieja sin referencia. Se pueden limpiar con \`docker image prune\`.`,
  
  70: `\`docker save\` **exporta una imagen completa a un archivo tar**, incluyendo todas sus capas:\n\n\`\`\`bash\ndocker save myapp > myapp.tar\n\`\`\`\n\nPodés compartir ese archivo o cargarlo en otro sistema con \`docker load\`. Es útil para entornos sin acceso a registries.`,
  
  71: `\`docker load\` **importa una imagen desde un archivo tar** creado con \`docker save\`:\n\n\`\`\`bash\ndocker load < myapp.tar\n\`\`\`\n\nRestaurea la imagen con todas sus capas y tags, lista para usar.`,
  
  72: `\`docker export\` guarda el **filesystem de un contenedor** (no la imagen) en un tar. A diferencia de \`save\`, no incluye capas ni historial. Se importa con \`docker import\`. Útil para crear imágenes planas desde contenedores modificados.`,
  
  73: `\`docker import\` crea una **imagen nueva desde un filesystem exportado** con \`docker export\`. La imagen resultante es "plana" (una sola capa) sin historial. Ejemplo:\n\n\`\`\`bash\ncat container.tar | docker import - myimage:v1\n\`\`\``,
  
  74: `**ARG** define variables **solo para el build** del Dockerfile (no en runtime). Ejemplo:\n\n\`\`\`dockerfile\nARG NODE_VERSION=20\nFROM node:$NODE_VERSION\n\`\`\`\n\n**ENV** define variables que **persisten en el contenedor** en ejecución. ARG para build, ENV para runtime.`,
  
  75: `Un **Docker context** permite **cambiar entre distintos entornos Docker** (local, remoto, cloud) sin reconfigurar. Por ejemplo, podés tener un context para tu máquina local y otro para un servidor remoto, y cambiar con \`docker context use\`.`,
  
  76: `**BuildKit** es el **motor de build moderno de Docker** (activado por defecto desde Docker 23+). Ofrece builds más rápidos, mejor cache, paralelización automática y nuevas features como secretos seguros y multi-plataforma. Es más eficiente que el builder clásico.`,
  
  77: `\`docker build\` **construye una imagen a partir de un Dockerfile**:\n\n\`\`\`bash\ndocker build -t myapp:v1 .\n\`\`\`\n\nEl \`.\` indica el contexto (carpeta con archivos a enviar al build). \`-t\` asigna nombre y tag a la imagen resultante.`,
  
  78: `\`docker commit\` **crea una imagen nueva desde un contenedor modificado**, guardando todos los cambios realizados. Ejemplo:\n\n\`\`\`bash\ndocker commit mycontainer mynewimage:v1\n\`\`\`\n\nNo es recomendable para producción (mejor usar Dockerfile), pero es útil para experimentación.`,
  
  79: `\`docker diff\` muestra **qué archivos cambiaron en un contenedor** respecto a su imagen base. Lista archivos añadidos (A), modificados (C) o eliminados (D). Es útil para debugging o entender qué modificó un proceso dentro del contenedor.`,
  
  80: `\`docker cp\` **copia archivos entre el host y un contenedor**:\n\n\`\`\`bash\ndocker cp mycontainer:/app/log.txt ./log.txt\ndocker cp ./config.json mycontainer:/app/\n\`\`\`\n\nÚtil para extraer logs, subir configuración o rescatar datos sin montar volúmenes.`,
  
  81: `\`docker pause\` **congela todos los procesos de un contenedor** usando cgroups, sin detenerlo completamente. El contenedor sigue existiendo pero no consume CPU. Se reactiva con \`docker unpause\`. Útil para liberar recursos temporalmente.`,
  
  82: `\`docker unpause\` **reactiva un contenedor pausado**, reanudando todos sus procesos desde donde quedaron. Es el complemento de \`docker pause\` y permite "descongelar" contenedores sin reiniciarlos.`,
  
  83: `\`docker rename\` **cambia el nombre de un contenedor**:\n\n\`\`\`bash\ndocker rename oldname newname\n\`\`\`\n\nNo afecta la ejecución ni los datos, solo actualiza el identificador legible. Útil para organizar mejor los nombres después de crear contenedores.`,
  
  84: `\`docker top\` muestra los **procesos corriendo dentro de un contenedor**:\n\n\`\`\`bash\ndocker top mycontainer\n\`\`\`\n\nEs equivalente a ejecutar \`ps\` dentro del contenedor, pero sin necesidad de abrir una shell. Útil para inspección rápida.`,
  
  85: `\`docker wait\` **bloquea hasta que un contenedor se detenga** y luego retorna su exit code:\n\n\`\`\`bash\ndocker wait mycontainer\n\`\`\`\n\nÚtil en scripts cuando necesitás esperar que un contenedor termine antes de continuar.`,
  
  86: `\`docker attach\` **conecta tu terminal a un contenedor en ejecución**, mostrando su stdout/stderr y permitiendo enviar input. A diferencia de \`exec\`, no crea un nuevo proceso: te conectás al proceso principal (PID 1). Salir con Ctrl+C puede detener el contenedor.`,
  
  87: `\`docker events\` muestra **eventos en tiempo real del daemon Docker**: contenedores iniciando/deteniéndose, imágenes descargadas, redes creadas, etc. Es útil para monitoreo, debugging o integración con herramientas de auditoría:\n\n\`\`\`bash\ndocker events --filter type=container\n\`\`\``,
  
  88: `\`docker history\` muestra el **historial de capas de una imagen**, con el comando que generó cada capa y su tamaño:\n\n\`\`\`bash\ndocker history myimage:v1\n\`\`\`\n\nEs útil para entender cómo se construyó una imagen, optimizar tamaños o auditar el proceso de build.`
};

// Leer el archivo all-questions.json
const data = JSON.parse(fs.readFileSync('./all-questions.json', 'utf8'));

// Actualizar las explicaciones de Docker
let updateCount = 0;
data.docker.forEach((question, index) => {
  const questionNumber = index + 1;
  if (dockerExplanations[questionNumber]) {
    question.explanation = dockerExplanations[questionNumber];
    updateCount++;
  }
});

// Guardar el archivo actualizado
fs.writeFileSync('./all-questions.json', JSON.stringify(data, null, 2));

console.log(`✅ Las ${updateCount} explicaciones de Docker han sido actualizadas exitosamente en all-questions.json`);
console.log(`📊 Total preguntas Docker: ${data.docker.length}`);
