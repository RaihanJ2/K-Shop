FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including dev dependencies
RUN npm install

# Copy source code
COPY . .

# Ensure TypeScript compiler has proper permissions
RUN chmod +x ./node_modules/.bin/tsc

# Build the app
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy built app from builder stage
COPY --from=builder /app/dist ./dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Start the app
CMD ["node", "dist/index.js"]