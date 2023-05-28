# toolbox-back

### **Stack**:
- Node.js v14.15.4
- Test: mocha / chai / sinon / proxyquire 
- express.js
- axios: Para realizar request.

### **Instalación**:

- Ejecutar test:
```console
lucas@api:~$ npm install
```

### **Configuración**:
Puerto por defecto 3000

### **Comandos**:

- Ejecutar test:
```console
lucas@api:~$ npm test
```
- Ejecutar servidor:
```console
lucas@api:~$ npm start
```

### **Decisiones de arquitectura**
El api fue dividida en tres capas:
- Lib: Para codigo compartido o integraciones.
- Server: Contiene el codigo para ejecutar un servidor rest.
- Services: Resuelve logica de negocio.

Se opto por dividir la comunicación atravez de red de la logica de negocio por este motivo /services y /server estan al mismo nivel, este diseño esta pensado para en un escenario productivo poder cambiar la forma en que se comunica un microservicio sin tener que realizar mayores cambios.

**Middlewares**:
- Error Handler: Este fue desarrollado para resolver en un unico punto todos las excepciones recibidas, para logearlas y retornar la respuesta. /src/server/middleware.js

### Unit test:
- Ejecutar test:
```console
lucas@api:~$ npm test