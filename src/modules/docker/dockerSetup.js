const fs = require("fs");
const path = require("path");

const DOCKER_COMPOSE = `version: "3.8"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: laravel_app
    restart: unless-stopped
    working_dir: /var/www
    volumes:
      - .:/var/www
    networks:
      - laravel

  nginx:
    image: nginx:alpine
    container_name: laravel_nginx
    restart: unless-stopped
    ports:
      - "8080:80"
    volumes:
      - .:/var/www
      - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf
    networks:
      - laravel

  db:
    image: mysql:8.0
    container_name: laravel_db
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: \${DB_DATABASE}
      MYSQL_ROOT_PASSWORD: \${DB_PASSWORD}
    ports:
      - "3306:3306"
    networks:
      - laravel

networks:
  laravel:
    driver: bridge
`;

const DOCKERFILE = `FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \\
    git curl zip unzip libpng-dev libonig-dev libxml2-dev \\
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

RUN composer install --no-dev --optimize-autoloader

EXPOSE 9000
CMD ["php-fpm"]
`;

const NGINX_CONF = `server {
    listen 80;
    index index.php index.html;
    root /var/www/public;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \\.php$ {
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
`;

async function run(context) {
  const base = context.projectName;

  fs.writeFileSync(path.join(base, "docker-compose.yml"), DOCKER_COMPOSE);
  fs.writeFileSync(path.join(base, "Dockerfile"), DOCKERFILE);

  const nginxDir = path.join(base, "docker", "nginx");
  fs.mkdirSync(nginxDir, { recursive: true });
  fs.writeFileSync(path.join(nginxDir, "default.conf"), NGINX_CONF);

  console.log("  Generated docker-compose.yml, Dockerfile, docker/nginx/default.conf");
}

module.exports = { run };
