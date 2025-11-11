#!/bin/bash

###############################################################################
# Script de Actualización Rápida - Quiz App
# Para ejecutar en el droplet cuando hagas cambios
###############################################################################

echo "🔄 Actualizando Quiz App..."

cd ~/quiz

echo "📥 Descargando últimos cambios..."
git pull

echo "🐳 Reconstruyendo contenedores..."
docker-compose -f docker-compose.prod.yml up -d --build

echo "⏳ Esperando 10 segundos..."
sleep 10

echo "🌱 Recargando base de datos..."
docker exec training_backend npm run seed

echo "✅ Actualización completa!"
echo ""
echo "🌐 Tu app está actualizada en: http://$(curl -s ifconfig.me)"
