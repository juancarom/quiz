# 🎯 Quiz App - Test de Entrevista Técnica

Aplicación web full-stack para practicar tests técnicos de programación. Construida con **React**, **Node.js/Express**, **MongoDB** y **Docker**.

## 🚀 Inicio Rápido con Docker

```bash
# Clonar el repositorio
git clone https://github.com/juancarom/quiz.git
cd quiz

# Levantar la aplicación con Docker Compose
docker-compose up --build

# En otra terminal, cargar las preguntas en la base de datos
docker exec -it training_backend npm run seed

# Abrir en el navegador
# http://localhost:3010
```

¡Listo! La aplicación estará corriendo con **814 preguntas** de 10 temas técnicos.

## 📚 Temas Incluidos (814 Preguntas)

- 🟢 **NestJS** - 59 preguntas
- 💎 **Ruby** - 74 preguntas
- 🛤️ **Ruby on Rails** - 75 preguntas
- 🗄️ **SQL** - 83 preguntas
- 🐬 **MySQL** - 83 preguntas
- 🍃 **MongoDB** - 84 preguntas
- 🎯 **POO** - 92 preguntas
- 🐳 **Docker** - 88 preguntas
- ☁️ **AWS** - 88 preguntas
- 📊 **GraphQL** - 88 preguntas

## ✨ Características Principales

- ⚙️ **Configuración personalizable**: Elige entre 5 y 50 preguntas por test
- 🔀 **Opciones mezcladas**: Las respuestas se reorganizan en cada pregunta
- 📱 **Diseño responsivo**: Optimizado para móviles y tablets
- ⏱️ **Sin límite de tiempo**: Aprende a tu propio ritmo
- ✅ **Sin penalización**: Intenta hasta encontrar la respuesta correcta
- 📊 **Estadísticas detalladas**: Ve tu progreso y resultados
- 🎨 **Interfaz moderna**: Diseño atractivo con gradientes y animaciones
- � **Dockerizado**: Fácil deployment en cualquier ambiente

## 🏗️ Arquitectura

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   React (SPA)   │─────▶│  Express API    │─────▶│    MongoDB      │
│   Port: 3010    │      │  Port: 5000     │      │  Port: 27017    │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

### Stack Tecnológico

**Frontend:**
- React 18.2
- Vite 5.0 (build tool)
- Axios (HTTP client)
- CSS moderno (responsive)

**Backend:**
- Node.js 18
- Express 4.18
- Mongoose 8.0 (ODM)
- CORS habilitado

**Base de Datos:**
- MongoDB 7

**DevOps:**
- Docker & Docker Compose
- Nginx (producción)
- Multi-stage builds

## 📂 Estructura del Proyecto

```
quiz/
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main component
│   │   └── App.css        # Styles
│   ├── Dockerfile         # Development
│   ├── Dockerfile.prod    # Production build
│   └── nginx.conf         # Nginx config
├── backend/               # Express API
│   ├── models/           # Mongoose schemas
│   ├── server.js         # API endpoints
│   ├── seed.js           # Database seeder
│   ├── parse-all-daypo.js # Question parser
│   └── Dockerfile        # Backend container
├── daypo_*.txt           # Question source files
├── docker-compose.yml    # Development setup
├── docker-compose.prod.yml # Production setup
├── README_DOCKER.md      # Docker documentation
└── DEPLOY_DIGITAL_OCEAN.md # Deployment guide
```

## 🛠️ Instalación y Desarrollo

### Prerequisitos

- Docker y Docker Compose
- Git

### Opción 1: Con Docker (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/juancarom/quiz.git
cd quiz

# Levantar todos los servicios
docker-compose up --build

# Cargar las preguntas (primera vez)
docker exec -it training_backend npm run seed

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

### Opción 2: Desarrollo Local (Sin Docker)

**Backend:**
```bash
cd backend
npm install
npm run seed  # Cargar preguntas
npm start     # Puerto 5000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev   # Puerto 3010
```

**MongoDB:**
- Instalar MongoDB localmente
- Asegurarse que corre en `mongodb://localhost:27017`

## 📖 Documentación Adicional

- [README_DOCKER.md](./README_DOCKER.md) - Guía completa de Docker
- [DEPLOY_DIGITAL_OCEAN.md](./DEPLOY_DIGITAL_OCEAN.md) - Deploy en producción

## 🎮 Cómo Usar la Aplicación

1. **Seleccionar tema**: Elige uno de los 10 temas disponibles
2. **Configurar test**: Define cuántas preguntas quieres responder (5-50)
3. **Responder preguntas**: Las opciones están mezcladas para mayor desafío
4. **Sin penalización**: Si fallas, intenta nuevamente hasta acertar
5. **Ver resultados**: Obtén estadísticas completas al finalizar

## � Comandos Útiles

```bash
# Reiniciar servicios
docker-compose restart

# Reconstruir imágenes
docker-compose build --no-cache

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Ejecutar comandos en el backend
docker exec -it training_backend npm run seed
docker exec -it training_backend npm run parse

# Limpiar todo (containers, volumes, images)
docker-compose down -v
docker system prune -a
```

## � API Endpoints

```
GET  /api/topics                    # Lista de temas disponibles
GET  /api/questions/:topic?limit=20 # Obtener preguntas por tema
POST /api/results                   # Guardar resultados del test
GET  /health                        # Health check
```

## 🚀 Deployment en Producción

Para deployar en **Digital Ocean**, **AWS**, **Heroku** u otro proveedor:

1. Lee la guía completa en [DEPLOY_DIGITAL_OCEAN.md](./DEPLOY_DIGITAL_OCEAN.md)
2. Configura las variables de entorno en `.env.production`
3. Usa `docker-compose.prod.yml` para producción
4. Configura SSL con Let's Encrypt (incluido en la guía)

## 🧪 Testing

```bash
# Verificar que todo funciona
curl http://localhost:5000/health
curl http://localhost:5000/api/topics
```

## � Troubleshooting

**Puerto 27017 en uso:**
```bash
# Ver qué está usando el puerto
lsof -i :27017
# Detener MongoDB local si existe
brew services stop mongodb-community
```

**Reiniciar base de datos:**
```bash
docker-compose down -v
docker-compose up -d
docker exec -it training_backend npm run seed
```

**Ver logs de errores:**
```bash
docker-compose logs -f backend
```

## 💡 Tips para Estudiar

1. **Practica regularmente**: Repite los tests varias veces
2. **Varía la cantidad**: Empieza con 5-10 preguntas, luego aumenta
3. **Enfócate por tema**: Domina un tema antes de mezclarlo
4. **Sin penalización**: Aprovecha los intentos ilimitados para aprender
5. **Móvil-friendly**: Estudia desde cualquier dispositivo

## 🤝 Contribuir

¿Quieres añadir más preguntas o mejorar la app?

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'Añadir nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

---

**Desarrollado con ❤️ para preparación de entrevistas técnicas**

¿Preguntas o problemas? [Abre un issue](https://github.com/juancarom/quiz/issues)
