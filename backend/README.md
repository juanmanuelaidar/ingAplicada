# Backend JHipster

Aplicacion JHipster del proyecto. Expone la API REST que consume el frontend principal Ionic/PWA.

## Comandos desde esta carpeta

```bash
./mvnw test
npm run cy:run
npm run build
```

## Comandos recomendados desde la raiz

Usar preferentemente el `Makefile` de la raiz:

```bash
make backend-test
make e2e
make docker-build
make deploy
```

Ver tambien `../README.md` y `../correr.md`.
