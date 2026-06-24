# Trabajo Final - Ingenieria de Software Aplicada

Entrega de una aplicacion e-commerce generada con JHipster, pruebas automatizadas, despliegue Docker/ELK, cliente Ionic PWA y pipeline Jenkins para publicar la imagen en Docker Hub.

## Componentes

- `jdl/e-commerce-monolith.jdl`: modelo JDL base del proyecto.
- `backend/`: aplicacion JHipster monolitica Spring Boot 3, React, JWT, PostgreSQL, Liquibase y Cypress.
- `mobile/`: aplicacion Ionic/Angular PWA que consume la API de productos del backend y mantiene cache offline.
- `docker/`: stack de despliegue con app, PostgreSQL, Elasticsearch, Logstash y Kibana.
- `Jenkinsfile`: pipeline CI/CD para build, tests, imagen Docker y push a Docker Hub.

## Backend

```bash
cd backend
./mvnw test
```

Para ejecutar los E2E:

```bash
cd backend
npm ci
npm run cy:run
```

Los tests Cypress incluyen login por API (`/api/authenticate`), creacion de producto por API y flujo de carrito.

## Mobile PWA

```bash
cd mobile
npm install
npm run build:prod
```

La app Ionic consume `/api/products`, registra service worker en produccion y cachea productos para funcionar sin conexion.

## Docker + ELK

```bash
docker compose -f docker/docker-compose.yml up -d
```

Servicios principales:

- App: `http://localhost:8080`
- Kibana: `http://localhost:5601`
- Elasticsearch: `http://localhost:9200`
- Logstash TCP JSON: `localhost:5000`

## Jenkins / Docker Hub

Configurar en Jenkins:

- Variable `DOCKERHUB_USER`.
- Credencial `dockerhub-creds` de tipo username/password.

El pipeline ejecuta checkout, preflight, build backend, tests unitarios, Cypress, Docker build y Docker push.
