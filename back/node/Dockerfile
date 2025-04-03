# Use the official Node.js image as the base image
FROM node:23-alpine3.20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (without dev dependencies for producción)
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000
EXPOSE 4001

# Set environment to production
ENV NODE_ENV=production

# Start the application in production mode
CMD ["npm", "start"]