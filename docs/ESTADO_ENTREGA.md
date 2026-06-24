# Estado real de la entrega

Este documento deja explicito que el proyecto esta implementado segun las directivas del trabajo final.

## Implementado en este repositorio

- **Backend JHipster**: Proyecto monolítico completo con arquitectura Spring Boot 3 + Maven.
- **Modelo JDL**: Definición de entidades (Product, Category, Order, Cart, Customer) y sus relaciones.
- **Tests Unitarios y E2E**: Cobertura de tests unitarios de dominio y suite E2E de Cypress para flujos criticos (Login por API, CRUD de producto, Carrito).
- **Logs centralizados**: Configuración de appender Logstash (JSON/TCP) activa en todos los perfiles.
- **Infraestructura (Stack ELK)**: Orquestación completa con Docker Compose para PostgreSQL, Elasticsearch, Logstash y Kibana.
- **Frontend Mobile/PWA**: Aplicacion Ionic/Angular compilable con Service Worker para funcionamiento offline y cache local.
- **CI/CD**: Pipeline Jenkins (`Jenkinsfile`) diseñado para automatizar el ciclo de vida completo (Build -> Test -> Docker Push).

## Cierre Final Confirmado

1. **Codigo Fuente**: Verificado y consistente con las especificaciones del JDL.
2. **Infraestructura**: Desplegable localmente con un unico comando.
3. **Pipeline**: Listo para ejecucion inmediata en cualquier instancia de Jenkins configurada con las credenciales de Docker Hub.
4. **Mobile**: Verificado con build productivo de Angular/Ionic y generacion de service worker.

---

## Guía de Inicio Rápido

### 1. Backend y Tests
```bash
cd backend
./mvnw clean test         
npm install && npm run cy:run 
```

### 2. Infraestructura y Despliegue
```bash
cd docker
docker compose up -d       
```

### 3. Frontend Mobile
```bash
cd mobile
npm install
npm run build:prod              
```
