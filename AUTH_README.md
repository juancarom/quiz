# Sistema de Autenticación - Feature Branch

Esta branch implementa un sistema de autenticación opcional para la aplicación de Training.

## ✨ Características Implementadas

### Backend

#### Modelos
- **User**: Usuario con email/password o Google OAuth
  - `name`: Nombre del usuario
  - `email`: Email único
  - `password`: Hash de contraseña (opcional si usa Google)
  - `googleId`: ID de Google (opcional)
  - `avatar`: URL de avatar
  
- **UserScore**: Registro de mejores puntuaciones por categoría
  - `userId`: Referencia al usuario
  - `topic`: Categoría (Ruby, SQL, etc.)
  - `questionCount`: Número de preguntas
  - `correctAnswers`: Respuestas correctas
  - `percentage`: Porcentaje de acierto
  - `timeInSeconds`: Tiempo tomado
  - `completedAt`: Fecha de finalización

#### Rutas de Autenticación (`/api/auth`)
- `POST /register`: Registro con email/password
- `POST /login`: Login con email/password
- `GET /me`: Obtener usuario actual (requiere auth)
- `GET /google`: Iniciar autenticación con Google
- `GET /google/callback`: Callback de Google OAuth

#### Rutas de Scores (`/api/scores`)
- `POST /`: Guardar nuevo score (requiere auth)
- `GET /my-best`: Obtener mejores scores del usuario por categoría (requiere auth)
- `GET /ranking/:topic`: Obtener ranking global de un topic (público)

#### Middleware
- `optionalAuth`: Autenticación opcional (añade `req.user` si hay token)
- `requireAuth`: Autenticación requerida (bloquea si no hay token válido)

### Frontend

#### Context API
- **AuthContext**: Manejo global del estado de autenticación
  - `user`: Usuario actual
  - `loading`: Estado de carga
  - `isAuthenticated`: Booleano de autenticación
  - `login()`: Iniciar sesión
  - `register()`: Registrarse
  - `loginWithGoogle()`: Login con Google
  - `logout()`: Cerrar sesión

#### Componentes
- **AuthModal**: Modal de login/registro
  - Formulario de registro (nombre, email, password)
  - Formulario de login (email, password)
  - Botón de "Continuar con Google"
  - Toggle entre login/registro
  
- **UserMenu**: Menú dropdown del usuario
  - Avatar/iniciales
  - Nombre y email
  - Links a estadísticas y rankings
  - Opción de cerrar sesión
  
- **AuthCallback**: Ruta para manejar callback de Google OAuth

## 🚀 Configuración

### Backend

1. Instalar dependencias:
```bash
cd backend
npm install
```

2. Configurar variables de entorno (`.env`):
```env
# JWT
JWT_SECRET=tu_secreto_jwt_seguro

# Session
SESSION_SECRET=tu_secreto_sesion_seguro

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

3. **Obtener credenciales de Google OAuth** (opcional):
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un proyecto o selecciona uno existente
   - Habilita la API de Google+ 
   - Crea credenciales OAuth 2.0
   - Agrega URIs autorizados:
     - `http://localhost:5000` (desarrollo)
     - `https://quizifytech.com` (producción)
   - Agrega URIs de redirección:
     - `http://localhost:5000/api/auth/google/callback` (desarrollo)
     - `https://quizifytech.com/api/auth/google/callback` (producción)

### Frontend

1. Instalar dependencias:
```bash
cd frontend
npm install
```

2. Configurar variables de entorno (`.env`):
```env
VITE_API_URL=http://localhost:5000
```

## 🧪 Pruebas

### Probar Registro/Login
1. Iniciar backend: `cd backend && npm run dev`
2. Iniciar frontend: `cd frontend && npm run dev`
3. Abrir `http://localhost:5173`
4. Hacer click en "Iniciar Sesión"
5. Registrarse con email/password o usar Google

### Probar Scores
1. Loguearse en la aplicación
2. Completar un quiz
3. El score se guardará automáticamente (próximo paso)
4. Ver estadísticas en el menú de usuario (próximo paso)

## 📋 Próximos Pasos

1. **Integrar guardado de scores**: Al completar un quiz, guardar el resultado si el usuario está logueado
2. **Página de estadísticas**: Mostrar mejores scores del usuario por categoría
3. **Página de rankings**: Mostrar rankings globales por categoría
4. **Perfil de usuario**: Editar nombre, avatar, cambiar contraseña
5. **Recuperar contraseña**: Envío de email para reset de password

## 🔒 Seguridad

- Passwords hasheados con bcrypt (10 rounds)
- JWT con expiración de 7 días
- Tokens almacenados en localStorage (considerar httpOnly cookies en producción)
- CORS configurado
- Validación de inputs en backend
- Google OAuth con estado seguro

## 📝 Notas

- La autenticación es **opcional**: usuarios no logueados pueden usar la app normalmente
- Los scores solo se guardan para usuarios logueados
- Los rankings son públicos (no requieren autenticación)
- El sistema está preparado para futuras features de gamificación
