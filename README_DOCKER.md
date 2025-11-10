# Training App - React + MongoDB + Docker

Aplicación web completa para practicar tests técnicos con React, Node.js, MongoDB y Docker.

## 🚀 Características

- **Frontend React**: Interfaz moderna y responsiva con Vite
- **Backend Node.js**: API REST con Express
- **Base de datos MongoDB**: Almacenamiento de preguntas y resultados
- **Docker**: Todo containerizado para fácil despliegue
- **10 Categorías**: NestJS, Ruby, Rails, SQL, MySQL, MongoDB, POO, Docker, AWS, GraphQL
- **814 Preguntas totales** de los archivos .txt originales
- **Tipos de preguntas**: Selección simple y múltiple
- **Sin penalización**: Puedes intentar responder múltiples veces hasta acertar

## 📋 Requisitos

- Docker
- Docker Compose

## 🛠️ Instalación y Uso

### 1. Construir y levantar los contenedores

```bash
docker-compose up --build
```

### 2. Cargar las preguntas en MongoDB

En otra terminal, ejecuta:

```bash
docker exec -it training_backend npm run seed
```

### 3. Acceder a la aplicación

Abre tu navegador en: **http://localhost:3010**

## 🎯 Cómo Usar

1. **Selecciona un tema** de los 10 disponibles
2. **Responde 20 preguntas aleatorias** del tema seleccionado:
   - ● = Selección simple (una respuesta)
   - ☐ = Selección múltiple (varias respuestas)
3. **Verifica tu respuesta** - Si está incorrecta, puedes intentar de nuevo sin penalización
4. **Ve tu resultado final** con estadísticas completas

## 📊 Preguntas Disponibles

Total: **814 preguntas** extraídas de los archivos .txt

- NestJS: 59 preguntas
- Ruby: 74 preguntas  
- Rails: 75 preguntas
- SQL: 83 preguntas
- MySQL: 83 preguntas
- MongoDB: 84 preguntas
- POO: 92 preguntas
- Docker: 88 preguntas
- AWS: 88 preguntas
- GraphQL: 88 preguntas

## 🐳 Comandos Docker Útiles

```bash
# Levantar servicios
docker-compose up

# Levantar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reconstruir imágenes
docker-compose up --build

# Ver estado de contenedores
docker-compose ps
```

## 📁 Estructura del Proyecto

```
TRAINING/
├── backend/
│   ├── models/
│   │   ├── Question.js
│   │   └── Result.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TopicSelection.jsx
│   │   │   ├── Quiz.jsx
│   │   │   └── Results.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🌐 Puertos

- **Frontend**: http://localhost:3010
- **Backend API**: http://localhost:5000
- **MongoDB**: interno (no expuesto)

## 📊 API Endpoints

- `GET /api/questions/:topic?limit=10` - Obtener preguntas por tema
- `GET /api/topics` - Obtener todos los temas disponibles
- `POST /api/results` - Guardar resultado de un test
- `GET /api/results` - Obtener historial de resultados
- `GET /health` - Health check

## 🎨 Temas Disponibles

1. NestJS 🦅
2. Ruby 💎
3. Ruby on Rails 🚂
4. SQL 🗄️
5. MySQL 🐬
6. MongoDB 🍃
7. POO 🎯
8. Docker 🐳
9. AWS ☁️
10. GraphQL ◈
11. Todos Mezclados 🎲

## 🔧 Desarrollo

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📝 Notas

- Las preguntas se cargan desde el script `seed.js`
- Los resultados se guardan automáticamente en MongoDB
- La aplicación permite intentar responder múltiples veces sin penalización
- Las preguntas se mezclan aleatoriamente en cada test

## 🤝 Contribuir

Si quieres agregar más preguntas, edita el archivo `backend/seed.js` y vuelve a ejecutar el seed:

```bash
docker exec -it training_backend npm run seed
```

## 📄 Licencia

MIT
