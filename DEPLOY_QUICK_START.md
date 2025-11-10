# 🚀 Despliegue Rápido en Digital Ocean

Guía paso a paso para desplegar tu Quiz App en un droplet de Digital Ocean.

## 📋 Pre-requisitos

- Un droplet de Digital Ocean ya creado (Ubuntu 22.04 LTS recomendado)
- La IP de tu droplet
- Acceso SSH al droplet

---

## 🔑 Paso 1: Conectarse al Droplet

```bash
# Desde tu terminal local (Mac)
ssh root@TU_IP_DEL_DROPLET

# Ejemplo:
# ssh root@165.227.123.45
```

---

## 📦 Paso 2: Instalar Docker y Docker Compose (en el droplet)

```bash
# Actualizar el sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Verificar instalación
docker --version

# Instalar Docker Compose
apt install docker-compose -y

# Verificar instalación
docker-compose --version
```

---

## 🔥 Paso 3: Configurar Firewall (en el droplet)

```bash
# Permitir SSH, HTTP y HTTPS
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp

# Habilitar firewall
ufw enable

# Verificar estado
ufw status
```

---

## 📂 Paso 4: Clonar el Repositorio (en el droplet)

```bash
# Ir al directorio home
cd ~

# Clonar el repositorio
git clone https://github.com/juancarom/quiz.git

# Entrar al directorio
cd quiz

# Verificar archivos
ls -la
```

---

## ⚙️ Paso 5: Configurar Variables de Entorno (en el droplet)

```bash
# Copiar el archivo de ejemplo
cp .env.production.example .env.production

# Editar el archivo (usar nano o vi)
nano .env.production
```

Configurar estas variables:
```env
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=TU_PASSWORD_SEGURO_AQUI
MONGO_INITDB_DATABASE=quiz_db
MONGODB_URI=mongodb://admin:TU_PASSWORD_SEGURO_AQUI@mongo:27017/quiz_db?authSource=admin
NODE_ENV=production
```

**⚠️ IMPORTANTE**: Cambia `TU_PASSWORD_SEGURO_AQUI` por una contraseña segura real.

Guardar y salir (Ctrl+O, Enter, Ctrl+X en nano).

---

## 🐳 Paso 6: Levantar la Aplicación con Docker (en el droplet)

```bash
# Levantar todos los servicios en modo producción
docker-compose -f docker-compose.prod.yml up -d --build

# Ver los logs
docker-compose -f docker-compose.prod.yml logs -f

# Esperar a que todo esté listo (verás logs del backend y frontend)
# Presiona Ctrl+C para salir de los logs
```

---

## 🌱 Paso 7: Cargar las Preguntas en la Base de Datos (en el droplet)

```bash
# Ejecutar el seed desde el contenedor del backend
docker exec -it quiz_backend npm run seed

# Deberías ver:
# ✅ Conectado a MongoDB
# ✅ Base de datos limpiada
# ✅ 814 preguntas insertadas exitosamente
```

---

## ✅ Paso 8: Verificar que Todo Funciona (en el droplet)

```bash
# Ver estado de los contenedores
docker-compose -f docker-compose.prod.yml ps

# Deberías ver 3 contenedores corriendo:
# - quiz_mongo
# - quiz_backend
# - quiz_frontend

# Probar el backend
curl http://localhost:5000/health

# Probar el frontend
curl http://localhost/
```

---

## 🌐 Paso 9: Acceder desde tu Navegador

Abre tu navegador y ve a:
```
http://TU_IP_DEL_DROPLET
```

Por ejemplo:
```
http://165.227.123.45
```

**¡Deberías ver tu aplicación funcionando! 🎉**

---

## 🔒 PASO OPCIONAL: Configurar un Dominio y SSL

Si tienes un dominio (ejemplo: quiz.tudominio.com):

### 1. Configurar DNS
En tu proveedor de dominio, crea un registro A:
```
Tipo: A
Nombre: quiz (o @)
Valor: TU_IP_DEL_DROPLET
TTL: 3600
```

### 2. Instalar Certbot (en el droplet)
```bash
apt install certbot python3-certbot-nginx -y
```

### 3. Obtener Certificado SSL (en el droplet)
```bash
certbot --nginx -d quiz.tudominio.com
```

Sigue las instrucciones y el certificado se instalará automáticamente.

---

## 🔧 Comandos Útiles para Administración

```bash
# Ver logs en tiempo real
docker-compose -f docker-compose.prod.yml logs -f

# Ver logs de un servicio específico
docker-compose -f docker-compose.prod.yml logs -f backend

# Reiniciar servicios
docker-compose -f docker-compose.prod.yml restart

# Detener todo
docker-compose -f docker-compose.prod.yml down

# Detener y eliminar volúmenes (CUIDADO: borra la base de datos)
docker-compose -f docker-compose.prod.yml down -v

# Actualizar la aplicación (cuando hagas cambios)
cd ~/quiz
git pull
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## 🐛 Solución de Problemas

### Error: Puerto 80 en uso
```bash
# Ver qué está usando el puerto 80
lsof -i :80

# Si es apache2 o nginx
systemctl stop apache2
systemctl stop nginx
systemctl disable apache2
systemctl disable nginx
```

### La aplicación no carga
```bash
# Verificar logs
docker-compose -f docker-compose.prod.yml logs backend
docker-compose -f docker-compose.prod.yml logs frontend

# Verificar que los contenedores están corriendo
docker ps

# Reiniciar todo
docker-compose -f docker-compose.prod.yml restart
```

### Base de datos vacía
```bash
# Recargar las preguntas
docker exec -it quiz_backend npm run seed
```

### No puedo conectarme por SSH
```bash
# Desde tu Mac, verifica la conexión
ping TU_IP_DEL_DROPLET

# Si el ping funciona pero SSH no:
ssh -v root@TU_IP_DEL_DROPLET
```

---

## 📊 Monitoreo

```bash
# Ver uso de recursos
docker stats

# Ver espacio en disco
df -h

# Ver memoria RAM
free -h

# Ver contenedores corriendo
docker ps
```

---

## 🔄 Actualizar la Aplicación

Cuando hagas cambios en tu código local:

**En tu Mac:**
```bash
cd /Users/juan/Workspace/TRAINING
git add .
git commit -m "Descripción de los cambios"
git push
```

**En el Droplet:**
```bash
cd ~/quiz
git pull
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## 📝 Resumen de Comandos Clave

```bash
# Conectarse al droplet
ssh root@TU_IP

# Ver estado
docker-compose -f docker-compose.prod.yml ps

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f

# Reiniciar
docker-compose -f docker-compose.prod.yml restart

# Actualizar
git pull && docker-compose -f docker-compose.prod.yml up -d --build
```

---

## 🎯 Checklist de Despliegue

- [ ] Droplet creado en Digital Ocean
- [ ] SSH configurado y funcionando
- [ ] Docker y Docker Compose instalados
- [ ] Firewall configurado (puertos 80, 443, 22)
- [ ] Repositorio clonado
- [ ] Variables de entorno configuradas
- [ ] Contenedores corriendo
- [ ] Base de datos seeded
- [ ] Aplicación accesible desde el navegador
- [ ] (Opcional) Dominio configurado
- [ ] (Opcional) SSL instalado

---

## 💡 Tips de Seguridad

1. **Cambiar contraseñas por defecto**: Usa contraseñas seguras en `.env.production`
2. **Configurar firewall**: Solo abre los puertos necesarios
3. **Actualizar regularmente**: `apt update && apt upgrade -y`
4. **Backups**: Considera hacer backups de la base de datos
5. **Monitoreo**: Revisa los logs regularmente

---

## 📞 Necesitas Ayuda?

Si algo no funciona:

1. Revisa los logs: `docker-compose -f docker-compose.prod.yml logs -f`
2. Verifica que los contenedores estén corriendo: `docker ps`
3. Comprueba el firewall: `ufw status`
4. Testea la conexión: `curl http://localhost/`

---

**¡Tu aplicación debería estar corriendo ahora! 🚀**

Puedes acceder a ella desde: `http://TU_IP_DEL_DROPLET`
