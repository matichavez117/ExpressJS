const express = require('express'); // --> Importo express.
const routerApi = require('./routes');
const app = express();
const port = 8000; // --> Defino el puerto donde va a correr.

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

// --> Le decimos a express que escuche el puerto.
app.listen(port, () => {
  console.log('Runing');
});
