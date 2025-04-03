FROM node:23-bookworm-slim

WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción (sin dependencias de desarrollo)
RUN npm install --only=production

# Copiar el código de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 4002

# Configurar entorno de producción
ENV NODE_ENV=production

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "run", "start"]