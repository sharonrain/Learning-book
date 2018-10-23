# ---- Base Node ----
FROM node:alpine AS base
# Copy project file
COPY . .
# Build project
RUN npm run build
# ---- Prod ----
FROM nginx
# Copy needed files
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html