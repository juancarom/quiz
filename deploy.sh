#!/bin/bash

###############################################################################
# Script de Despliegue Automático - Quiz App
# Para ejecutar en tu droplet de Digital Ocean
###############################################################################

set -e  # Detener si hay algún error

echo "🚀 Iniciando despliegue de Quiz App..."
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

###############################################################################
# 1. ACTUALIZAR SISTEMA
###############################################################################
echo -e "${BLUE}📦 Actualizando sistema...${NC}"
apt update && apt upgrade -y

###############################################################################
# 2. INSTALAR DOCKER
###############################################################################
echo -e "${BLUE}🐳 Instalando Docker...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    echo -e "${GREEN}✅ Docker instalado${NC}"
else
    echo -e "${GREEN}✅ Docker ya está instalado${NC}"
fi

###############################################################################
# 3. INSTALAR DOCKER COMPOSE
###############################################################################
echo -e "${BLUE}🐳 Instalando Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    apt install docker-compose -y
    echo -e "${GREEN}✅ Docker Compose instalado${NC}"
else
    echo -e "${GREEN}✅ Docker Compose ya está instalado${NC}"
fi

###############################################################################
# 4. CONFIGURAR FIREWALL
###############################################################################
echo -e "${BLUE}🔥 Configurando firewall...${NC}"
if command -v ufw &> /dev/null; then
    ufw allow OpenSSH
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
    echo -e "${GREEN}✅ Firewall configurado${NC}"
else
    echo -e "${YELLOW}⚠️  UFW no encontrado, saltando configuración de firewall${NC}"
fi

###############################################################################
# 5. CLONAR REPOSITORIO
###############################################################################
echo -e "${BLUE}📥 Clonando repositorio...${NC}"
cd ~
if [ -d "quiz" ]; then
    echo -e "${YELLOW}⚠️  Directorio 'quiz' ya existe. Actualizando...${NC}"
    cd quiz
    git pull
else
    git clone https://github.com/juancarom/quiz.git
    cd quiz
    echo -e "${GREEN}✅ Repositorio clonado${NC}"
fi

###############################################################################
# 6. CONFIGURAR VARIABLES DE ENTORNO
###############################################################################
echo -e "${BLUE}⚙️  Configurando variables de entorno...${NC}"

# Generar password aleatorio si no existe .env.production
if [ ! -f .env.production ]; then
    MONGO_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
    
    cat > .env.production << EOF
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD}
MONGO_INITDB_DATABASE=quiz_db
MONGODB_URI=mongodb://admin:${MONGO_PASSWORD}@mongo:27017/quiz_db?authSource=admin
NODE_ENV=production
EOF
    
    echo -e "${GREEN}✅ Variables de entorno creadas${NC}"
    echo -e "${YELLOW}📝 Password de MongoDB generado: ${MONGO_PASSWORD}${NC}"
else
    echo -e "${GREEN}✅ Archivo .env.production ya existe${NC}"
fi

###############################################################################
# 7. DETENER CONTENEDORES EXISTENTES
###############################################################################
echo -e "${BLUE}🛑 Deteniendo contenedores existentes...${NC}"
docker-compose -f docker-compose.prod.yml down 2>/dev/null || true

###############################################################################
# 8. CONSTRUIR Y LEVANTAR CONTENEDORES
###############################################################################
echo -e "${BLUE}🏗️  Construyendo y levantando contenedores...${NC}"
docker-compose -f docker-compose.prod.yml up -d --build

###############################################################################
# 9. ESPERAR A QUE LOS SERVICIOS ESTÉN LISTOS
###############################################################################
echo -e "${BLUE}⏳ Esperando a que los servicios inicien...${NC}"
sleep 10

# Verificar que los contenedores estén corriendo
if ! docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo -e "${RED}❌ Error: Los contenedores no están corriendo${NC}"
    docker-compose -f docker-compose.prod.yml logs
    exit 1
fi

echo -e "${GREEN}✅ Contenedores levantados${NC}"

###############################################################################
# 10. CARGAR SEED DE PREGUNTAS
###############################################################################
echo -e "${BLUE}🌱 Cargando preguntas en la base de datos...${NC}"
sleep 5  # Esperar un poco más para que MongoDB esté completamente listo

# Intentar cargar el seed hasta 3 veces
for i in {1..3}; do
    if docker exec quiz_backend npm run seed; then
        echo -e "${GREEN}✅ 814 preguntas cargadas exitosamente${NC}"
        break
    else
        if [ $i -eq 3 ]; then
            echo -e "${RED}❌ Error al cargar las preguntas después de 3 intentos${NC}"
            exit 1
        fi
        echo -e "${YELLOW}⚠️  Intento $i falló, reintentando...${NC}"
        sleep 5
    fi
done

###############################################################################
# 11. VERIFICAR SERVICIOS
###############################################################################
echo -e "${BLUE}🔍 Verificando servicios...${NC}"

# Verificar backend
if curl -f http://localhost:5000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend funcionando${NC}"
else
    echo -e "${RED}❌ Backend no responde${NC}"
fi

# Verificar frontend
if curl -f http://localhost/ > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend funcionando${NC}"
else
    echo -e "${RED}❌ Frontend no responde${NC}"
fi

###############################################################################
# 12. MOSTRAR INFORMACIÓN FINAL
###############################################################################
echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ ¡DESPLIEGUE COMPLETADO EXITOSAMENTE!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}📊 Estado de los contenedores:${NC}"
docker-compose -f docker-compose.prod.yml ps
echo ""
echo -e "${BLUE}🌐 Accede a tu aplicación en:${NC}"
echo -e "${GREEN}   http://$(curl -s ifconfig.me)${NC}"
echo ""
echo -e "${BLUE}📝 Comandos útiles:${NC}"
echo -e "   Ver logs:      ${YELLOW}docker-compose -f docker-compose.prod.yml logs -f${NC}"
echo -e "   Reiniciar:     ${YELLOW}docker-compose -f docker-compose.prod.yml restart${NC}"
echo -e "   Detener:       ${YELLOW}docker-compose -f docker-compose.prod.yml down${NC}"
echo -e "   Ver estado:    ${YELLOW}docker-compose -f docker-compose.prod.yml ps${NC}"
echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
