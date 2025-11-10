# 🌊 Guía de Despliegue en Digital Ocean

## 📋 Requisitos Previos

- Cuenta en Digital Ocean
- SSH Key configurada
- Dominio (opcional pero recomendado)

## 🚀 Pasos para Desplegar

### 1. Crear un Droplet

1. Ve a [Digital Ocean](https://cloud.digitalocean.com/)
2. Click en "Create" → "Droplets"
3. Selecciona configuración:
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Basic
   - **CPU Options**: Regular - $6/month (1GB RAM, 1 vCPU)
   - **Datacenter**: Elige el más cercano a ti
   - **Authentication**: SSH Key (recomendado)
   - **Hostname**: training-app

### 2. Conectarse al Droplet

```bash
ssh root@YOUR_DROPLET_IP
```

### 3. Instalar Docker y Docker Compose

```bash
# Actualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
apt install docker-compose -y

# Verificar instalación
docker --version
docker-compose --version
```

### 4. Configurar Firewall

```bash
# Permitir SSH, HTTP y HTTPS
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### 5. Clonar o Subir el Proyecto

**Opción A: Desde Git (recomendado)**

```bash
# Instalar Git
apt install git -y

# Clonar tu repositorio
git clone https://github.com/TU_USUARIO/training-app.git
cd training-app
```

**Opción B: Subir archivos manualmente**

Desde tu máquina local:

```bash
# Comprimir el proyecto (excluye node_modules)
cd /Users/juan/Workspace/TRAINING
tar -czf training-app.tar.gz \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='.git' \
  backend/ frontend/ docker-compose.yml daypo_*.txt

# Subir al droplet
scp training-app.tar.gz root@YOUR_DROPLET_IP:/root/

# En el droplet, descomprimir
cd /root
tar -xzf training-app.tar.gz
mkdir training-app
mv backend frontend docker-compose.yml daypo_*.txt training-app/
cd training-app
```

### 6. Configurar Variables de Entorno para Producción

Crear archivo `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  mongo:
    image: mongo:7
    container_name: training_mongodb
    restart: always
    volumes:
      - mongo_data:/data/db
    networks:
      - training_network
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=CHANGE_THIS_PASSWORD

  backend:
    build: ./backend
    container_name: training_backend
    restart: always
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - MONGODB_URI=mongodb://admin:CHANGE_THIS_PASSWORD@mongo:27017/training_db?authSource=admin
      - NODE_ENV=production
    depends_on:
      - mongo
    volumes:
      - ./backend:/app
      - /app/node_modules
    networks:
      - training_network

  frontend:
    build: 
      context: ./frontend
      dockerfile: Dockerfile.prod
    container_name: training_frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - training_network

networks:
  training_network:
    driver: bridge

volumes:
  mongo_data:
```

### 7. Crear Dockerfile de Producción para Frontend

Crear `frontend/Dockerfile.prod`:

```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Crear `frontend/nginx.conf`:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### 8. Actualizar Frontend para Producción

Modificar `frontend/vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' 
          ? 'http://backend:5000' 
          : 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

### 9. Levantar la Aplicación

```bash
# Construir y levantar
docker-compose -f docker-compose.prod.yml up -d --build

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f

# Cargar las preguntas
docker exec training_backend npm run seed
```

### 10. Verificar que Funciona

```bash
# Verificar que los contenedores están corriendo
docker ps

# Probar desde el navegador
# http://YOUR_DROPLET_IP
```

## 🔒 Configurar HTTPS con Let's Encrypt (Opcional pero Recomendado)

### 1. Instalar Certbot

```bash
apt install certbot python3-certbot-nginx -y
```

### 2. Obtener Certificado SSL

```bash
# Detener nginx temporalmente
docker-compose -f docker-compose.prod.yml stop frontend

# Obtener certificado
certbot certonly --standalone -d tudominio.com -d www.tudominio.com

# Reiniciar frontend
docker-compose -f docker-compose.prod.yml start frontend
```

### 3. Actualizar nginx.conf para HTTPS

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tudominio.com www.tudominio.com;
    
    ssl_certificate /etc/letsencrypt/live/tudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tudominio.com/privkey.pem;
    
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## 🔄 Actualizar la Aplicación

```bash
# Pull nuevos cambios (si usas Git)
git pull

# Reconstruir y reiniciar
docker-compose -f docker-compose.prod.yml up -d --build

# Si cambiaste las preguntas, recarga el seed
docker exec training_backend npm run seed
```

## 📊 Comandos Útiles

```bash
# Ver logs en tiempo real
docker-compose -f docker-compose.prod.yml logs -f

# Ver logs de un servicio específico
docker-compose -f docker-compose.prod.yml logs -f backend

# Reiniciar un servicio
docker-compose -f docker-compose.prod.yml restart backend

# Ver uso de recursos
docker stats

# Backup de MongoDB
docker exec training_mongodb mongodump --out=/tmp/backup
docker cp training_mongodb:/tmp/backup ./mongodb-backup-$(date +%Y%m%d)

# Restaurar MongoDB
docker cp ./mongodb-backup training_mongodb:/tmp/backup
docker exec training_mongodb mongorestore /tmp/backup
```

## 💰 Costos Estimados

- **Droplet Basic**: $6/mes (1GB RAM)
- **Droplet Standard**: $12/mes (2GB RAM) - Recomendado para producción
- **Dominio**: $10-15/año (opcional)
- **Total**: ~$6-12/mes

## 🔐 Seguridad Adicional

### Crear usuario no-root

```bash
adduser deploy
usermod -aG sudo deploy
usermod -aG docker deploy

# Copiar SSH keys
mkdir -p /home/deploy/.ssh
cp /root/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh

# Deshabilitar login root
nano /etc/ssh/sshd_config
# Cambiar: PermitRootLogin no
systemctl restart sshd
```

### Fail2ban para protección

```bash
apt install fail2ban -y
systemctl enable fail2ban
systemctl start fail2ban
```

## 📱 Acceso Móvil

La aplicación es completamente responsiva y funciona perfectamente en móviles. Puedes:

1. Agregar a pantalla de inicio en iOS/Android
2. Funciona offline después de la primera carga (si agregas PWA)
3. Touch-friendly con botones grandes

## ✅ Checklist de Despliegue

- [ ] Droplet creado y configurado
- [ ] Docker y Docker Compose instalados
- [ ] Firewall configurado
- [ ] Código subido al servidor
- [ ] Variables de entorno configuradas
- [ ] Aplicación levantada con docker-compose
- [ ] Seed de preguntas cargado
- [ ] Probado en navegador
- [ ] SSL configurado (si tienes dominio)
- [ ] Backup configurado

## 🆘 Troubleshooting

**Error: Puerto 80 en uso**
```bash
lsof -i :80
kill -9 <PID>
```

**Error: MongoDB no conecta**
```bash
docker-compose -f docker-compose.prod.yml logs mongo
docker-compose -f docker-compose.prod.yml restart mongo
```

**Frontend no carga**
```bash
docker-compose -f docker-compose.prod.yml logs frontend
docker-compose -f docker-compose.prod.yml restart frontend
```

## 📞 Soporte

Si tienes problemas, revisa los logs:
```bash
docker-compose -f docker-compose.prod.yml logs -f
```
