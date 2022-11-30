const express = require('express'); // --> Importo express.
const app = express();
const port = 8000; // --> Defino el puerto donde va a correr.
const faker = require('faker');

// --> GET básico con un request y response.
app.get('/', (req, res) => {
  res.send('Hello word!');
});

// --> Ruta localhost:8000/new-route
app.get('/new-route', (req, res) => {
  res.send('Hello, im a new route!');
});

// --> ruta localhost:8000/product (devuelve un JSON).
app.get('/products', (req, res) => {
  res.json({
    name:'uva',
    price: 200
  });
});

/*
  Toda ruta específica tiene que ir arriba de las dinámicas, de lo contrario, en este caso
  /filter seria tomado como /:id y se ejecutaría la ruta de abajo
*/
app.get('/products/filter', () => {
  res.send('Im a filter');
});

// --> ruta que devuelve un producto por id, aca podemos notar el uso de "req.params"
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  //const id = req.params.id;
  res.json([
    {
      id,
      name: 'Arroz',
      price: 200
    },
  ]);
});

// --> Recibir varios parametros en el request
app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

// --> Recibe un query param y devuelve un json con los valores, sino un mensaje.
app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parámetros');
  };
});

// --> Recibe un query param que le dice la cantidad de productos que tiene que mandar
app.get('/listProducts', (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const porducts = [];
  for (let index = 0; index < limit; index++) {
    porducts.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  };
  res.json(porducts);
});

// --> Le decimos a express que escuche el puerto.
app.listen(port, () => {
  console.log('Runing');
});
