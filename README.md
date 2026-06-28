# Trabajo Final - Ingenieria de Software Aplicada

Aplicacion e-commerce con backend JHipster, frontend principal Ionic/PWA, tests automatizados, deploy Docker + ELK y pipeline Jenkins para publicar imagen en Docker Hub.

## Estructura

- `jdl/e-commerce-monolith.jdl`: modelo JDL usado para generar la aplicacion.
- `backend/`: aplicacion JHipster con API Spring Boot, seguridad JWT, PostgreSQL, Liquibase y Cypress.
- `mobile/`: frontend principal Ionic/Angular PWA que consume la API JHipster.
- `docker/`: deploy con app, PostgreSQL, Elasticsearch, Logstash y Kibana.
- `Jenkinsfile`: pipeline CI/CD para build, tests, Docker build y Docker push.
- `docs/correr.md`: guia corta para correr y validar la entrega.

## Como correr

Backend/API + base de datos + ELK:

```bash
make deploy
```

Frontend principal Ionic:

```bash
cd mobile
npm install
npm start
```

URLs:

- Ionic: http://127.0.0.1:8100
- API/JHipster: http://localhost:8080
- Kibana: http://localhost:5601

Para mas detalle, ver `docs/correr.md`.

## Validacion completa

```bash
make ci-local
```

Ejecuta preflight, tests unitarios, Cypress E2E, build Ionic/PWA y build Docker.

## Requisitos

| Req. | Evidencia | Comando |
| --- | --- | --- |
| 1. JHipster desde JDL | `jdl/e-commerce-monolith.jdl`, `backend/` | `make req-jhipster` |
| 2. Tests unitarios | `ProductTest`, `ShoppingCartTest` | `make req-unit` |
| 3. Cypress E2E | `auth-api-login`, `product-create`, `cart-flow` | `make req-e2e` |
| 4. Deploy Docker | `backend/Dockerfile`, `docker/docker-compose.yml` | `make req-docker` |
| 5. ELK logs | `docker/docker-compose.yml`, `docker/logstash.conf` | `make req-elk` |
| 6. Ionic consume API | `mobile/src/app/services/api.service.ts` | `make req-mobile` |
| 7. Ionic PWA/offline | `mobile/ngsw-config.json`, `mobile/src/manifest.webmanifest` | `make req-pwa` |
| 8. Jenkins + DockerHub | `Jenkinsfile` | `make req-jenkins` |

## Comandos utiles

```bash
make help
make backend-test
make e2e
make mobile-build
make docker-build
make logs
make down
```
