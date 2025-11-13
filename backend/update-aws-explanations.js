const fs = require('fs');

// Lee el archivo all-questions.json
const data = JSON.parse(fs.readFileSync('./all-questions.json', 'utf8'));

// Nuevas explicaciones para AWS
const awsExplanations = {
  1: "AWS (Amazon Web Services) es la plataforma de servicios en la nube más completa y utilizada del mundo, lanzada en 2006. Ofrece más de 200 servicios que incluyen cómputo (EC2), almacenamiento (S3), bases de datos (RDS, DynamoDB), redes (VPC), machine learning (SageMaker), y muchos más. AWS permite escalar aplicaciones globalmente, pagar solo por lo que usas y eliminar la necesidad de mantener infraestructura física propia.",
  
  2: "EC2 (Elastic Compute Cloud) es el servicio de máquinas virtuales de AWS. Permite crear y gestionar servidores virtuales (instancias) con diferentes capacidades de CPU, memoria y almacenamiento. Puedes elegir entre cientos de tipos de instancia optimizados para diferentes casos de uso: cómputo general (t3), procesamiento intensivo (c5), memoria (r5), GPU (p3), etc. Pagas solo por el tiempo de uso y puedes escalar vertical u horizontalmente según la demanda.",
  
  3: "S3 (Simple Storage Service) es el servicio de almacenamiento de objetos de AWS. Permite guardar cualquier tipo de archivo (imágenes, videos, backups, logs, data lakes) con durabilidad del 99.999999999% (11 nueves). Los datos se organizan en 'buckets' y se acceden mediante URLs o APIs. S3 ofrece diferentes clases de almacenamiento según frecuencia de acceso (Standard, Infrequent Access, Glacier) para optimizar costos. Es la base de muchas arquitecturas cloud.",
  
  4: "RDS (Relational Database Service) gestiona bases de datos relacionales en la nube de forma automática. Soporta múltiples motores: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server y Aurora (versión optimizada de AWS). RDS automatiza tareas operativas como backups diarios, parches de seguridad, replicación multi-AZ para alta disponibilidad, y escalado de recursos. Elimina la necesidad de administrar servidores de base de datos manualmente.",
  
  5: "AWS Lambda es el servicio de computación serverless que ejecuta código sin necesidad de gestionar servidores. Subes tu código (Node.js, Python, Java, Go, etc.) y Lambda lo ejecuta en respuesta a eventos: solicitudes HTTP (API Gateway), cambios en S3, mensajes en SQS, etc. Escala automáticamente de 0 a miles de ejecuciones concurrentes y solo pagas por el tiempo de ejecución (milisegundos). Es ideal para microservicios, procesamiento de eventos y automatizaciones.",
  
  6: "Las principales características de Lambda son: 1) Auto-escalable: maneja automáticamente desde 1 hasta miles de solicitudes concurrentes. 2) Sin gestión de servidores: no configuras ni mantienes instancias, AWS gestiona toda la infraestructura. 3) Pago por uso: solo se cobra por el tiempo de ejecución real. 4) Event-driven: se activa automáticamente por eventos de otros servicios AWS. Es la base de arquitecturas serverless modernas.",
  
  7: "VPC (Virtual Private Cloud) es una red virtual privada y aislada dentro de AWS donde lanzas recursos. Funciona como tu propia red en la nube con control total sobre IPs, subredes, tablas de rutas y gateways. Puedes crear subredes públicas (con acceso a internet) y privadas (sin acceso directo), configurar security groups y NACLs para controlar tráfico, y conectar la VPC a tu red on-premise mediante VPN o Direct Connect.",
  
  8: "IAM (Identity and Access Management) gestiona la autenticación y autorización en AWS. Permite crear usuarios, grupos, roles y políticas para controlar quién puede acceder a qué recursos. IAM sigue el principio de mínimo privilegio: otorgar solo los permisos necesarios. Es fundamental para seguridad: permite MFA, rotación de credenciales, auditoría de accesos y federación con sistemas externos (SAML, OIDC).",
  
  9: "Las políticas (policies) en IAM son documentos JSON que definen permisos específicos. Especifican qué acciones (Effect: Allow/Deny) se permiten sobre qué recursos (Resource) y bajo qué condiciones (Condition). Ejemplo: permitir s3:GetObject solo en un bucket específico. Las políticas se pueden adjuntar a usuarios, grupos o roles. AWS también ofrece políticas predefinidas (managed policies) para casos comunes.",
  
  10: "Un rol de IAM es una identidad con permisos específicos que puede ser asumida temporalmente por servicios o usuarios. A diferencia de usuarios (credenciales permanentes), los roles generan credenciales temporales y rotativas. Se usan principalmente para: 1) Dar permisos a servicios AWS (ej: Lambda accediendo a S3). 2) Acceso cross-account entre cuentas AWS. 3) Federación con proveedores externos (Google, Facebook). Los roles son más seguros que credenciales estáticas.",
  
  11: "La diferencia clave es: Usuarios IAM tienen credenciales permanentes (access key/secret key) y representan identidades de larga duración (personas o aplicaciones). Roles IAM se asumen temporalmente y generan credenciales que expiran automáticamente. Los roles son más seguros porque las credenciales rotan, no se almacenan en el código y permiten delegar acceso sin compartir claves. Siempre que sea posible, usa roles en lugar de usuarios.",
  
  12: "CloudWatch es el servicio de monitoreo y observabilidad de AWS. Recopila y visualiza métricas (CPU, memoria, tráfico de red), logs de aplicaciones y eventos de servicios AWS. Permite crear dashboards personalizados, configurar alarmas que ejecuten acciones automáticas (como escalar instancias) y analizar logs con CloudWatch Logs Insights. Es esencial para mantener visibilidad sobre la salud y rendimiento de infraestructura cloud.",
  
  13: "CloudWatch puede monitorear: 1) Métricas de sistema: CPU, disco, red (por defecto en EC2). 2) Memoria y procesos: mediante CloudWatch Agent instalado en instancias. 3) Logs de aplicación: captura logs de apps, Lambda, containers, etc. 4) Métricas personalizadas: puedes enviar tus propias métricas desde código. 5) Eventos y alarmas: detecta cambios en recursos y dispara notificaciones o automatizaciones.",
  
  14: "CloudFormation es el servicio de infraestructura como código (IaC) de AWS. Permite definir recursos AWS (EC2, S3, RDS, etc.) en plantillas declarativas (YAML o JSON) y desplegar toda la infraestructura de forma automática, repetible y versionable. CloudFormation gestiona dependencias, orden de creación y rollbacks en caso de error. Es fundamental para automatizar despliegues, mantener entornos consistentes y aplicar DevOps/GitOps.",
  
  15: "CloudFormation usa formatos YAML o JSON (no XML) para definir plantillas. YAML es más legible y popular. Las plantillas describen recursos, sus propiedades, dependencias y outputs. Ejemplo: definir una instancia EC2, su security group, VPC y RDS en un solo archivo que se despliega con un comando. Esto garantiza infraestructura reproducible y elimina configuraciones manuales propensas a errores.",
  
  16: "Un stack en CloudFormation es una colección de recursos AWS gestionados como una unidad. Cuando creas un stack desde una plantilla, CloudFormation provisiona todos los recursos definidos: instancias, redes, bases de datos, etc. Puedes actualizar el stack modificando la plantilla, y CloudFormation aplicará solo los cambios necesarios. Si eliminas el stack, todos sus recursos se borran automáticamente. Los stacks facilitan gestionar entornos completos (dev, staging, prod).",
  
  17: "EBS (Elastic Block Store) proporciona almacenamiento de bloques persistente para instancias EC2. Funciona como un disco duro virtual que se conecta a una instancia y persiste independientemente de su ciclo de vida. Ofrece diferentes tipos según rendimiento: gp3 (uso general), io2 (alto IOPS para bases de datos), st1 (throughput para Big Data). Los volúmenes EBS se pueden hacer snapshots para backups, cambiar de tamaño en caliente y migrar entre availability zones.",
  
  18: "EBS y S3 son tipos de almacenamiento diferentes: EBS es almacenamiento de bloques para EC2, funciona como un disco conectado a una instancia, ideal para sistemas operativos y bases de datos (acceso rápido, archivos estructurados). S3 es almacenamiento de objetos accesible vía HTTP/API, ideal para archivos estáticos, backups y data lakes (alta durabilidad, acceso desde cualquier lugar). EBS se vincula a una AZ, S3 es global y multi-AZ automáticamente.",
  
  19: "EFS (Elastic File System) es un sistema de archivos compartido y elástico compatible con NFS. Permite que múltiples instancias EC2 accedan simultáneamente a los mismos datos, como un disco de red compartido. EFS escala automáticamente (crece y decrece según uso) y ofrece almacenamiento persistente multi-AZ por defecto. Es ideal para aplicaciones que requieren almacenamiento compartido: servidores web, content management, data science, o contenedores que comparten datos.",
  
  20: "Elastic Load Balancer (ELB) distribuye automáticamente el tráfico entrante entre múltiples destinos (EC2, containers, IPs, Lambda). Mejora la disponibilidad y tolerancia a fallos: si un servidor falla, ELB redirige el tráfico a servidores sanos. También escala automáticamente según la carga. Monitorea la salud de los destinos mediante health checks y solo envía tráfico a los que responden correctamente.",
  
  21: "AWS ofrece tres tipos de ELB: 1) Application Load Balancer (ALB): capa 7 (HTTP/HTTPS), enruta por path, host o headers. Ideal para microservicios y contenedores. 2) Network Load Balancer (NLB): capa 4 (TCP/UDP), ultra baja latencia y alto throughput. Ideal para aplicaciones de alto rendimiento. 3) Classic Load Balancer (CLB): versión anterior, balanceo básico de capa 4 y 7 (legacy). ALB y NLB son las opciones modernas recomendadas.",
  
  22: "Auto Scaling ajusta automáticamente la cantidad de recursos (instancias EC2, contenedores) según la demanda. Define políticas basadas en métricas (CPU, tráfico, custom) que aumentan o disminuyen la capacidad. Por ejemplo: si CPU > 70%, agregar 2 instancias; si CPU < 30%, quitar 1. Auto Scaling garantiza rendimiento durante picos de tráfico y reduce costos durante períodos de baja demanda. Funciona integrado con ELB y CloudWatch.",
  
  23: "Route 53 es el servicio de DNS gestionado de AWS. Traduce nombres de dominio (ejemplo.com) a direcciones IP de recursos AWS o externos. Ofrece: 1) Registro de dominios. 2) Routing policies: simple, weighted, latency-based, geolocation, failover. 3) Health checks y failover automático. 4) Alta disponibilidad (100% SLA). 5) Integración con otros servicios AWS. Es fundamental para arquitecturas globales y multi-región.",
  
  24: "DynamoDB es una base de datos NoSQL de clave-valor y documentos, totalmente gestionada y serverless. Ofrece latencia de milisegundos a cualquier escala, escalado automático, replicación multi-región y backup continuo. Se usa con un modelo de datos flexible (sin esquema fijo) ideal para aplicaciones móviles, gaming, IoT y microservicios que requieren alto rendimiento y baja latencia. Soporta transacciones ACID y streaming de cambios con DynamoDB Streams.",
  
  25: "ElastiCache es un servicio de caché en memoria totalmente gestionado que soporta Redis y Memcached. Acelera aplicaciones almacenando datos frecuentemente accedidos en memoria (latencia de microsegundos). Casos de uso: cache de sesiones de usuario, resultados de consultas SQL, páginas web renderizadas, leaderboards en gaming. ElastiCache automatiza tareas operativas: parches, backups, replicación y failover, eliminando la complejidad de gestionar clusters de cache manualmente.",
  
  26: "SNS (Simple Notification Service) es un servicio de mensajería pub/sub (publicar/suscribir) completamente gestionado. Los publishers envían mensajes a topics, y múltiples subscribers reciben esos mensajes simultáneamente. Los subscribers pueden ser: email, SMS, HTTP endpoints, funciones Lambda, colas SQS, notificaciones móviles push. SNS es ideal para notificaciones, alertas y fan-out (enviar el mismo mensaje a múltiples destinos). Es push: SNS envía activamente a los subscribers.",
  
  27: "SQS (Simple Queue Service) es un servicio de colas de mensajes totalmente gestionado. Funciona como buffer entre productores y consumidores de mensajes, desacoplando componentes de aplicaciones distribuidas. Los mensajes se almacenan en la cola hasta que un consumidor los procesa y elimina. SQS garantiza entrega de mensajes, soporta procesamiento en paralelo y tiene dos tipos: Standard (mejor rendimiento, orden no garantizado) y FIFO (orden estricto, exactamente una vez).",
  
  28: "La diferencia principal es el modelo de comunicación: SNS es pub/sub push (un mensaje se envía a múltiples subscribers simultáneamente, SNS los empuja activamente). SQS es cola pull (mensajes esperan en la cola, los consumidores los extraen cuando están listos). Usa SNS para notificaciones y fan-out. Usa SQS para desacoplar componentes, procesar trabajos en background y garantizar entrega confiable. A menudo se combinan: SNS envía a múltiples colas SQS.",
  
  29: "CloudFront es la CDN (Content Delivery Network) global de AWS con más de 400 edge locations. Distribuye contenido (imágenes, videos, APIs, aplicaciones web) desde ubicaciones cercanas al usuario final, reduciendo latencia. CloudFront cachea contenido en edge locations y lo sirve rápidamente. Se integra con S3, EC2, Lambda@Edge (ejecutar código en el edge) y ofrece protección DDoS integrada. Es esencial para aplicaciones globales de alto rendimiento.",
  
  30: "API Gateway es un servicio para crear, publicar y gestionar APIs RESTful, HTTP y WebSocket a cualquier escala. Actúa como puerta de entrada para aplicaciones: recibe requests, los valida, aplica autenticación/autorización, transforma datos y los enruta a backends (Lambda, EC2, servicios externos). Ofrece features como throttling, caching, logging, CORS, stages (dev/prod) y generación automática de documentación. Es la capa frontal estándar para APIs serverless.",
  
  31: "API Gateway soporta múltiples protocolos: 1) REST API: APIs RESTful completas con recursos, métodos y caching. 2) HTTP API: versión simplificada y más económica, ideal para proxies simples a Lambda. 3) WebSocket API: comunicación bidireccional en tiempo real, ideal para chats, gaming, dashboards en vivo. Cada tipo se optimiza para diferentes casos de uso y modelos de pricing.",
  
  32: "Cognito es el servicio de autenticación y autorización de usuarios para aplicaciones web y móviles. Ofrece: 1) User Pools: directorio de usuarios con registro, login, MFA, recuperación de contraseña. 2) Identity Pools: proporciona credenciales AWS temporales para acceder a recursos. 3) Federación: login con proveedores externos (Google, Facebook, SAML). Cognito elimina la necesidad de construir sistemas de auth propios y se integra perfectamente con APIs y Lambda.",
  
  33: "ECS (Elastic Container Service) es el orquestador de contenedores Docker nativo de AWS. Permite ejecutar y escalar aplicaciones en contenedores sin gestionar la infraestructura de orquestación. Soporta dos modos de lanzamiento: EC2 (gestionas las instancias) y Fargate (serverless, AWS gestiona todo). ECS se integra con ALB, CloudWatch, IAM y otros servicios AWS. Define servicios, tasks y task definitions para especificar cómo ejecutar containers.",
  
  34: "EKS (Elastic Kubernetes Service) es Kubernetes gestionado por AWS. Ejecuta clústeres Kubernetes sin necesidad de instalar, operar o mantener el control plane. EKS es certificado Kubernetes estándar, por lo que funciona con herramientas y plugins del ecosistema (kubectl, Helm, Operators). Ofrece alta disponibilidad multi-AZ, integración con servicios AWS (IAM, VPC, ELB) y opciones de cómputo (EC2, Fargate). Ideal para organizaciones ya usando Kubernetes.",
  
  35: "Fargate es un motor de cómputo serverless para contenedores que funciona con ECS y EKS. Elimina la necesidad de gestionar instancias EC2: solo defines los recursos (CPU, memoria) que necesita cada contenedor y Fargate los ejecuta automáticamente. Pagas solo por los recursos consumidos. Fargate maneja escalado, patching y disponibilidad. Es ideal para microservicios, jobs batch y cualquier workload en contenedores sin gestionar servidores.",
  
  36: "La diferencia principal es la API de orquestación: ECS usa una API propietaria de AWS (más simple e integrada con servicios AWS). EKS usa Kubernetes estándar (portátil, compatible con ecosistema K8s). Elige ECS si estás completamente en AWS y quieres simplicidad. Elige EKS si necesitas portabilidad, ya usas Kubernetes, o quieres aprovechar herramientas K8s. Ambos pueden usar Fargate como motor serverless.",
  
  37: "ECR (Elastic Container Registry) es un registro privado de imágenes Docker totalmente gestionado. Permite almacenar, gestionar y desplegar imágenes de contenedores de forma segura. ECR se integra con ECS, EKS y servicios CI/CD. Ofrece encriptación en reposo, escaneo de vulnerabilidades, control de acceso con IAM y replicación entre regiones. Funciona como Docker Hub pero privado y optimizado para AWS.",
  
  38: "Elastic Beanstalk es una plataforma PaaS (Platform as a Service) que simplifica el despliegue de aplicaciones web. Subes tu código (Node.js, Python, Java, Go, PHP, Ruby, .NET) y Beanstalk aprovisiona automáticamente la infraestructura: EC2, ELB, Auto Scaling, RDS, etc. Gestiona capacidad, balanceo de carga, monitoreo y actualizaciones. Mantienes control total sobre recursos subyacentes pero sin complejidad operativa. Ideal para equipos que quieren enfocarse en código.",
  
  39: "Elastic Beanstalk soporta múltiples lenguajes y plataformas: Node.js, Python, Java, Go, PHP, Ruby, .NET Core, y Docker (cualquier lenguaje en container). También soporta aplicaciones multi-container y configuraciones personalizadas. Esto permite a equipos usar su stack preferido sin gestionar infraestructura.",
  
  40: "Secrets Manager es un servicio para almacenar, rotar y gestionar credenciales de forma segura: contraseñas de bases de datos, API keys, tokens, certificados. La diferencia clave vs Parameter Store es la rotación automática: Secrets Manager puede rotar credenciales automáticamente mediante funciones Lambda integradas (RDS, Redshift, DocumentDB). Ofrece encriptación, auditoría de accesos con CloudTrail y versionado de secretos. Ideal para gestionar secretos críticos con rotación.",
  
  41: "Systems Manager (SSM) es una suite de herramientas para gestionar y operar recursos AWS a escala. Incluye: 1) Session Manager: acceso seguro a instancias sin SSH. 2) Parameter Store: almacenar configuraciones. 3) Patch Manager: automatizar parches. 4) Run Command: ejecutar scripts en múltiples instancias. 5) State Manager: mantener configuraciones deseadas. 6) Inventory: descubrir software instalado. SSM centraliza operaciones y mejora seguridad y compliance.",
  
  42: "Parameter Store (parte de SSM) es un almacenamiento jerárquico para configuraciones y secretos. Permite guardar strings, listas o valores encriptados con KMS. Es más simple y económico que Secrets Manager pero sin rotación automática. Se usa para: configuraciones de apps, connection strings, feature flags, API keys no críticos. Los parámetros se organizan en paths jerárquicos (/app/db/password) y se acceden desde código, CloudFormation o Lambda.",
  
  43: "La diferencia principal es rotación: Secrets Manager tiene rotación automática integrada con Lambda para rotar credenciales sin tiempo de inactividad. Parameter Store es más simple, económico y sin rotación automática. Usa Secrets Manager para credenciales críticas de bases de datos que requieren rotación. Usa Parameter Store para configuraciones generales, feature flags o secretos que rotas manualmente. Secrets Manager cuesta más pero ofrece más features de seguridad.",
  
  44: "CloudTrail es el servicio de auditoría que registra todas las llamadas API en tu cuenta AWS. Captura quién hizo qué, cuándo y desde dónde: creación de instancias, cambios en S3, modificaciones IAM, etc. Los logs se almacenan en S3 y se pueden analizar con Athena. CloudTrail es esencial para seguridad, compliance, troubleshooting y detección de anomalías. Permite responder preguntas como '¿quién eliminó esta instancia?' o '¿qué cambió antes del incidente?'.",
  
  45: "AWS Config evalúa continuamente la configuración de recursos AWS y su conformidad con reglas deseadas. Responde preguntas como: ¿qué recursos existen? ¿cuál es su configuración actual? ¿cómo ha cambiado con el tiempo? ¿cumplen las políticas de seguridad? Config puede enviar notificaciones o ejecutar remediaciones automáticas cuando detecta configuraciones no conformes. Es fundamental para compliance, auditorías y governance en entornos regulados.",
  
  46: "X-Ray es un servicio de tracing distribuido para depurar y analizar aplicaciones distribuidas (microservicios). Captura información sobre requests que atraviesan múltiples servicios: latencias, errores, dependencias. Genera mapas de servicios visuales que muestran cómo interactúan componentes y dónde ocurren cuellos de botella. X-Ray se integra con Lambda, ECS, API Gateway, EC2 y frameworks como Express, Django, Spring. Es esencial para entender el comportamiento de arquitecturas complejas.",
  
  47: "Step Functions es un servicio para orquestar funciones Lambda y otros servicios AWS en workflows visuales. Define máquinas de estado (state machines) que coordinan pasos secuenciales, paralelos, condicionales, con manejo de errores y reintentos. Casos de uso: pipelines de procesamiento de datos, procesos de aprobación, automatizaciones complejas, orchestración de microservicios. Step Functions gestiona el estado y la lógica de negocio, mientras Lambda ejecuta el código.",
  
  48: "EventBridge es un bus de eventos serverless que conecta aplicaciones mediante eventos. Permite que servicios AWS (S3, DynamoDB, EC2), aplicaciones SaaS (Salesforce, Shopify) y aplicaciones propias se comuniquen enviando eventos. EventBridge enruta eventos a destinos según reglas: Lambda, SQS, SNS, Step Functions, etc. Es la evolución de CloudWatch Events, ideal para arquitecturas event-driven donde componentes reaccionan a cambios sin acoplamiento directo.",
  
  49: "Kinesis es una plataforma para procesar streaming de datos en tiempo real a escala masiva. Permite ingerir, almacenar y analizar datos continuos: logs, métricas, eventos de aplicaciones, clickstreams, IoT. Kinesis es ideal para casos de uso que requieren procesamiento inmediato: dashboards en vivo, detección de anomalías, analytics en tiempo real. Es la alternativa de AWS a Apache Kafka, completamente gestionada.",
  
  50: "Kinesis tiene múltiples servicios: 1) Kinesis Data Streams: captura y almacena streams de datos. 2) Kinesis Data Firehose: carga streams directamente a S3, Redshift, Elasticsearch sin escribir código. 3) Kinesis Data Analytics: analiza streams con SQL en tiempo real. 4) Kinesis Video Streams: procesa video en tiempo real. Cada uno resuelve diferentes aspectos del procesamiento de datos streaming.",
  
  51: "Glue es un servicio ETL (Extract, Transform, Load) serverless para preparar datos. Descubre automáticamente esquemas con Glue Crawlers, genera código ETL en Python/Scala, ejecuta jobs a escala y cataloga datos en el Glue Data Catalog. Glue se integra con S3, RDS, Redshift y Athena. Es ideal para pipelines de datos, data lakes, migraciones y transformaciones complejas sin gestionar servidores Spark.",
  
  52: "Athena es un servicio de consultas SQL interactivo y serverless sobre datos almacenados en S3. No requiere infraestructura: defines tablas que apuntan a archivos en S3 (CSV, JSON, Parquet) y ejecutas queries SQL estándar. Athena usa Presto bajo el capó y cobra solo por datos escaneados. Es ideal para análisis ad-hoc, exploración de data lakes, logs, y generación de reportes sin necesidad de cargar datos en una base de datos.",
  
  53: "Redshift es un data warehouse columnar optimizado para análisis de big data. Permite ejecutar queries SQL sobre petabytes de datos estructurados con alto rendimiento (paralelismo masivo). Redshift escala de gigabytes a petabytes, soporta compresión, distribución de datos y consultas federadas a S3. Es ideal para business intelligence, reportes complejos y análisis históricos que requieren joins sobre grandes volúmenes. Se integra con herramientas BI como Tableau, QuickSight.",
  
  54: "EMR (Elastic MapReduce) es un servicio para ejecutar frameworks de big data: Hadoop, Spark, Hive, Presto, HBase, Flink. Aprovisiona clusters de instancias EC2, instala software y escala automáticamente. EMR se usa para procesamiento batch masivo: transformación de datos, machine learning a gran escala, análisis genomic, log processing. Pagas solo por instancias y tiempo de uso. Es la forma más económica de ejecutar Spark/Hadoop en AWS.",
  
  55: "SageMaker es la plataforma completa de Machine Learning de AWS. Cubre todo el ciclo de vida: preparación de datos, entrenamiento de modelos (con Jupyter notebooks y GPUs), optimización de hiperparámetros, despliegue a producción con endpoints escalables, y monitoreo. SageMaker incluye algoritmos pre-construidos, frameworks populares (TensorFlow, PyTorch), AutoML (Autopilot), y herramientas para MLOps. Elimina la complejidad de infraestructura ML.",
  
  56: "Rekognition es un servicio de análisis de imágenes y videos usando machine learning. Detecta objetos, escenas, texto, actividades, contenido inapropiado, reconocimiento facial y análisis de emociones. Casos de uso: moderación de contenido, identificación de celebridades, análisis de sentimientos, búsqueda visual, autenticación biométrica, video surveillance. Rekognition es completamente gestionado: envías imágenes/videos y recibes resultados en JSON sin entrenar modelos.",
  
  57: "Comprehend es un servicio de procesamiento de lenguaje natural (NLP) que analiza texto para extraer insights. Identifica: entidades (personas, lugares, organizaciones), sentimiento (positivo/negativo/neutral), idioma, frases clave, sintaxis y topics. Casos de uso: análisis de reviews de clientes, clasificación de documentos, extracción de información, moderación de contenido textual. Comprehend elimina la complejidad de NLP y ofrece APIs simples para integrar.",
  
  58: "Transcribe es un servicio de conversión de voz a texto (speech-to-text) con ML. Transcribe audio grabado o en tiempo real a texto, soporta múltiples idiomas y dialectos, identifica speakers diferentes, filtra contenido inapropiado y puede ser entrenado con vocabulario personalizado. Casos de uso: subtítulos automáticos, transcripción de llamadas, análisis de reuniones, accesibilidad, asistentes virtuales. Funciona con archivos en S3 o streaming.",
  
  59: "Polly es un servicio de conversión de texto a voz (text-to-speech) con voces neurales realistas. Soporta docenas de idiomas y voces con diferentes acentos y estilos. Polly genera audio en formatos mp3, ogg, pcm y puede enfatizar palabras, controlar velocidad y pronunciación con SSML. Casos de uso: aplicaciones de lectura, asistentes virtuales, e-learning, accesibilidad, IVR (sistemas telefónicos). Pagas solo por caracteres convertidos.",
  
  60: "Translate es un servicio de traducción automática de textos con redes neuronales. Traduce entre 75+ idiomas automáticamente detectando el idioma fuente. Soporta traducción en batch y en tiempo real, y puede entrenarse con terminología personalizada para dominios específicos (médico, legal). Casos de uso: localización de aplicaciones, traducción de contenido web, atención al cliente multilenguaje, análisis de documentos internacionales. Pricing por caracteres traducidos.",
  
  61: "Las regiones AWS son ubicaciones geográficas (como us-east-1 o sa-east-1) que contienen varios data centers. Cada región es independiente y está diseñada para ofrecer baja latencia y cumplimiento local. Elegir la región correcta afecta el rendimiento, los costos y la normativa aplicable (por ejemplo, RGPD en la UE).",
  
  62: "Las zonas de disponibilidad (AZ) son data centers físicos separados dentro de una región. Se conectan mediante redes privadas de alta velocidad. Si una AZ falla, las demás siguen operando, garantizando alta disponibilidad y tolerancia a desastres.",
  
  63: "Usar múltiples AZ mejora la resiliencia y el rendimiento. Tolerancia a fallos: si una zona se cae, otra sigue activa. Baja latencia: se puede balancear carga entre AZs cercanas. Es una práctica clave para arquitecturas de alta disponibilidad (HA).",
  
  64: "Las edge locations son puntos de presencia globales donde AWS almacena contenido en caché o enruta tráfico DNS. Se usan en servicios como CloudFront (CDN) y Route 53, acercando los datos al usuario final para reducir la latencia y acelerar la entrega de contenido.",
  
  65: "El modelo de responsabilidad compartida define qué seguridad maneja AWS y cuál el cliente. AWS asegura la infraestructura (hardware, red, centros de datos). El cliente protege lo que implementa dentro de la nube (datos, acceso, configuración). Este modelo evita confusiones sobre quién es responsable de cada capa.",
  
  66: "AWS gestiona la seguridad de la nube, que incluye la infraestructura física, red global, hipervisores y servicios base. Esto garantiza que los entornos virtuales estén aislados, monitoreados y protegidos frente a vulnerabilidades a nivel de hardware o red.",
  
  67: "El cliente gestiona la seguridad dentro de la nube: configuración de servicios, permisos IAM, cifrado de datos, parches de sistemas y control de acceso. AWS provee las herramientas, pero el usuario define cómo se usan correctamente.",
  
  68: "El Free Tier permite usar muchos servicios AWS de forma gratuita por 12 meses o con ciertos límites permanentes. Es ideal para aprender o probar sin costo. Ejemplo: 750 horas/mes en EC2 t2.micro o 5 GB en S3 durante el primer año.",
  
  69: "El Free Tier de EC2 ofrece 750 horas al mes durante 12 meses para una instancia t2.micro o t3.micro. Es suficiente para tener un servidor en línea todo el mes, ideal para prácticas o entornos de desarrollo sin costo.",
  
  70: "El modelo Pay-as-you-go significa que solo pagás por lo que usás. No hay contratos ni costos fijos: si una instancia EC2 corre 10 horas, solo se cobra ese tiempo. Este enfoque da flexibilidad y control sobre el presupuesto en función del consumo real.",
  
  71: "EC2 ofrece varios modelos de pricing: On-Demand (pago por hora/segundo de uso), Reserved Instances (contrato de 1–3 años con descuento), Spot Instances (capacidad no usada con hasta 90% de descuento). Cada uno se adapta a distintos tipos de carga (temporal, estable o flexible).",
  
  72: "Las Reserved Instances (RI) ofrecen descuentos de hasta 70% a cambio de un compromiso de uso de 1 o 3 años. Son ideales para cargas constantes como bases de datos o servidores de aplicaciones de producción.",
  
  73: "Las Spot Instances aprovechan capacidad ociosa de AWS a precios muy bajos (hasta 90% de descuento). Son interrumpibles cuando AWS necesita los recursos, por lo que se usan para tareas no críticas como procesamiento batch, Big Data o renderizados.",
  
  74: "Usá Spot Instances para cargas tolerantes a interrupciones, como análisis por lotes, simulaciones o pipelines de datos. Son una excelente opción para reducir costos sin afectar la producción crítica.",
  
  75: "Cost Explorer permite analizar y visualizar los gastos de tu cuenta AWS. Muestra gráficos de consumo por servicio, etiqueta o región. Es útil para detectar aumentos inesperados, planificar presupuestos y optimizar costos en entornos grandes.",
  
  76: "Budgets permite crear presupuestos personalizados y alertas automáticas. Podés definir límites de gasto o uso, y recibir notificaciones por correo o SNS si los superás. Es ideal para controlar costos en equipos grandes o proyectos múltiples.",
  
  77: "Trusted Advisor revisa tu cuenta y sugiere mejores prácticas en cinco áreas: costos, rendimiento, seguridad, tolerancia a fallos y límites de servicio. Es como un asesor automático que detecta oportunidades de optimización o configuraciones riesgosas.",
  
  78: "Las categorías más importantes que evalúa Trusted Advisor son Seguridad y Rendimiento, además de Cost Optimization y Fault Tolerance. Por ejemplo, puede advertir sobre claves IAM sin rotar o instancias sin uso que siguen generando costos.",
  
  79: "AWS Organizations permite gestionar varias cuentas desde un punto central. Facilita aplicar políticas, consolidar facturación y delegar accesos. Es muy usado por empresas con múltiples entornos (producción, testing, desarrollo) o divisiones internas.",
  
  80: "Las SCP (Service Control Policies) son políticas de control dentro de AWS Organizations que limitan qué acciones pueden realizar las cuentas hijas, incluso si el usuario tiene permisos IAM. Funcionan como un 'filtro superior' de seguridad a nivel organizacional.",
  
  81: "AWS Control Tower automatiza la creación y gobernanza de entornos multi-cuenta. Crea estructuras seguras (landing zones), aplica políticas y configura registros, cumpliendo buenas prácticas desde el inicio. Es ideal para empresas que comienzan una adopción a gran escala de AWS.",
  
  82: "El Well-Architected Framework es un conjunto de buenas prácticas de diseño en la nube agrupadas en seis pilares. Ayuda a evaluar y mejorar arquitecturas para que sean seguras, eficientes y resilientes, con documentación y herramientas automáticas de revisión.",
  
  83: "Los seis pilares del Well-Architected Framework son: 1) Operational Excellence, 2) Security, 3) Reliability, 4) Performance Efficiency, 5) Cost Optimization, 6) Sustainability. Cada pilar aborda un aspecto clave del diseño y la operación en AWS.",
  
  84: "AWS CLI (Command Line Interface) no es un servicio web, sino una herramienta de línea de comandos para interactuar con AWS. Permite automatizar tareas, ejecutar scripts y administrar recursos sin usar la consola gráfica. Es esencial para DevOps y automatización.",
  
  85: "El AWS SDK (Software Development Kit) es un conjunto de librerías para distintos lenguajes (JavaScript, Python, Java, etc.) que permiten interactuar con los servicios AWS desde el código. Por ejemplo, subir archivos a S3 o lanzar instancias EC2 desde una aplicación.",
  
  86: "AWS ofrece SDKs oficiales para múltiples lenguajes, entre ellos JavaScript/Node.js, Python (boto3), Java, Go, PHP, Ruby y .NET. Esto facilita integrar servicios AWS directamente en tus aplicaciones, respetando autenticación y seguridad.",
  
  87: "CloudShell es una terminal preconfigurada en el navegador, lista para ejecutar comandos AWS CLI. No requiere instalación, usa credenciales de la cuenta actual y tiene almacenamiento persistente. Ideal para tareas rápidas o demostraciones seguras.",
  
  88: "La Management Console es la interfaz web gráfica para administrar todos los servicios AWS. Permite lanzar instancias, crear roles, configurar redes o visualizar costos de manera intuitiva. Es el punto de entrada más común para nuevos usuarios."
};

// Actualiza las explicaciones
if (data.aws && Array.isArray(data.aws)) {
  data.aws.forEach((question, index) => {
    const questionNumber = index + 1;
    if (awsExplanations[questionNumber]) {
      question.explanation = awsExplanations[questionNumber];
    }
  });
}

// Guarda el archivo actualizado
fs.writeFileSync('./all-questions.json', JSON.stringify(data, null, 2));

console.log('✅ Las 88 explicaciones de AWS han sido actualizadas exitosamente en all-questions.json');
console.log('📊 Total preguntas AWS:', data.aws ? data.aws.length : 0);
