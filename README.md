# Epiron - Backend For Frontend

## File Structure

```
src/
  bin/www
    - setup server
  config/
    - configuration files
  controllers/
    - routes with provider functions as callback functions
  providers/
  services/
    - common business logic used in the provider functions
  routes/
    - load all routes with middleware logics
  app.js
    - load all of the above
test/
  unit/
    - unit tests
  integration/
    - integration tests

```

# Running

## Variables de entorno
Las variables de entorno disponible son: 

* **PORT** | Puerto, por defecto **3002**
* **ENVIRONMENT** | Entorno, por defecto **development**
* **EPIRON_URL_BASE** | URL Base, por defecto https://apiweb_dev.epiron.com.ar/api/disp/execute

## Docker
El Dockerfile para desarrollo se encuentra bajo el nombre de **dev.Dockerfile**

Build image
```
$ docker build -f dev.Dockerfile -t backend .
```

Correr en puerto por defecto en contenedor y host
```
$ docker run -p 3002:3002 backend
```

Request de ejemplo
```
$ curl -XGET -H "Content-type: application/json" 'localhost:3002/api/cases/mock?state=opened'
```



## Node

Script para desarrollo con [nodemon](https://nodemon.io/)

```
$ npm install
$ npm run dev
```

Request de ejemplo
```
$ curl -XGET -H "Content-type: application/json" 'localhost:3002/api/cases/mock?state=opened'
```