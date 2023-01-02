const express = require('express'); // --> Importo express.
const cors = require('cors');
const routerApi = require('./routes');

// --> Importo los middlewares de tipo error, esto se debe hacer DESPUES DE DEFINIR EL ROUTING
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 8000;

// --> Esto es para poder recibir informacion tipo json que nos envien por post
app.use(express.json());

// --> WhiteList de dominios para el cors
const whiteList = ["http://127.0.0.1:5500", "http://localhost:8000"];
// --> Verificamos que el dominio de origen se encuentre en la whiteList
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    };
  },
};
// --> Aplicamos cors
app.use(cors(options));

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
