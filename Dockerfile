# Multi-stage build for Next.js static export
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies using npm with --ignore-scripts to avoid the exit handler bug
RUN npm install --legacy-peer-deps --ignore-scripts

# Copy application files
COPY . .

# Build Next.js app (static export)
ENV NODE_ENV=production
RUN npm run build

# Production image - serve static files with nginx
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static files from builder
COPY --from=builder /app/out .

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
