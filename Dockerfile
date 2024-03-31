# Dockerfile for vue-material-dashboard-laravel

FROM node:20.11.0-alpine3.19 as build

# Install or update needed packages to latest version
RUN npm install -g npm@latest vue@3.3.13 @vue/cli@5.0.8

# Make app directory
RUN mkdir /app

# Set working directory
WORKDIR /app

# Copy package.json to app directory
COPY package.json /app/package.json

# Install dependencies
RUN npm install




FROM node:20.11.0-alpine3.19 as production

# Update apk and install curl no interactive
RUN apk add curl nginx --no-cache

# Store Nginx config path
ENV NGINX_CONF_PATH /etc/nginx/http.d/default.conf

# Remove default.conf
RUN rm -f $NGINX_CONF_PATH

# Copy nginx config file to default.conf
COPY docker/nginx/default.conf $NGINX_CONF_PATH

# Set working directory
WORKDIR /app

# Copy node_modules from build stage
COPY --from=build /app/node_modules /app/node_modules

# Copy current directory to app directory
COPY . /app

# Set environment variables
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV NODE_ENV=production

# Build the app
RUN rm -f package-lock.json && npm run build:tailwind
RUN npm run build

# Execute the entrypoint script
CMD ["sh", "docker/entrypoint.sh"]

# Expose port 8080
EXPOSE 8080