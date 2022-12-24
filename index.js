const express = require('express'); // --> Importo express.
const routerApi = require('./routes');

// --> Importo los middlewares de tipo error, esto se debe hacer DESPUES DE DEFINIR EL ROUTING
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

const app = express();
// --> Defino el puerto donde va a correr.
const port = 8000; 

// --> Esto es para poder recibir informacion tipo json que nos envien por post
app.use(express.json());

// --> GET básico con un request y response.
app.get('/', (req, res) => {
  res.send('Hello word!');
});

// --> Ruta localhost:8000/new-route
app.get('/new-route', (req, res) => {
  res.send('Hello, im a new route!');
});

// --> Funcion donde se encuentran definidas las rutas
routerApi(app);

// --> Le digo a app que use los middlewares de tipo error (despues del routing)
// --> Hay que respetar el orden en el que fueron creados!
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// --> Le decimos a express que escuche el puerto.
app.listen(port, () => {
  console.log('Runing');
});
