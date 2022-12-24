const express = require('express'); // --> Importo express.
const router = express.Router();
const ProductsService = require('./../services/product.service');
const service = new ProductsService();

// --> ruta localhost:8000/product (devuelve un JSON).
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

/*
  Toda ruta específica tiene que ir arriba de las dinámicas, de lo contrario, en este caso
  /filter seria tomado como /:id y se ejecutaría la ruta de abajo
*/

// --> ruta que devuelve un producto por id, aca podemos notar el uso de "req.params"
// --> Aqui tambien estamos aplicando los middlewares de tipo error
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    //const id = req.params.id;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error)
  };
});

// --> De esta manera podemos manejar los STATUS que nos va a devolver el response res.status(codigo).json()
router.get('/statusCodes/:id', (req, res) => {
  const id = req.params.id;
  if (id === '999') {
    res.status(404).json({
      message: 'Not found!'
    });
  } else {
    res.status(200).json({
      id,
      name: 'Product',
      price: 2000
    });
  };
});

// --> Recibe un json por parametros y crea un nuevo producto
// --> (para poder recibir un json como parametro hay que agregar app.use(express.json()) en index.js) 
router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

// --> Recibe un id por parametros y un body por request y actualiza los datos del elemento con ese id
// --> patch se utiliza para actualizar elementos parcialmente y put para actualizarlos completos, es decir,
// --> hay que pasarle todos los parametros completos.
// --> Tambien podemos ver como manejar errar con un try catch si nuestro update que esta en service es asincrono
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (err) {
    next(err);
  };
});


// --> Recibe un id por parametro y elimina un elemento con ese id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const rta = service.delete(id);
  res.json(rta);
});

module.exports = router;
