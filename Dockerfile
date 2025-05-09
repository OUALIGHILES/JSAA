# Use Alpine Node image
FROM node:22.14.0-alpine

# Set working directory
WORKDIR /app

# Add build tools + pnpm (for bcrypt native build)
RUN apk add --no-cache python3 make g++ \
  && npm install -g pnpm \
  && npm config set fetch-retry-mintimeout 20000 \
  && npm config set fetch-retry-maxtimeout 120000 \
  && npm config set fetch-retries 5 \
  && npm config set registry https://registry.npmjs.org/

# Copy only package files first
COPY package*.json ./

# Clean old modules
RUN rm -rf node_modules package-lock.json

# Install dependencies with clean build
RUN npm install --legacy-peer-deps
RUN npm install @google/generative-ai

# Copy rest of the app
COPY . .

# Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=development

# Start dev server
CMD ["npm", "run", "dev"]
