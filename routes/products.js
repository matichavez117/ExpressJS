const express = require('express'); // --> Importo express.
const faker = require('faker');
const router = express.Router();

// --> ruta localhost:8000/product (devuelve un JSON).
router.get('/', (req, res) => {
  res.json({
    name:'uva',
    price: 200
  });
});

/*
  Toda ruta específica tiene que ir arriba de las dinámicas, de lo contrario, en este caso
  /filter seria tomado como /:id y se ejecutaría la ruta de abajo
*/
router.get('/filter', () => {
  res.send('Im a filter');
});

// --> ruta que devuelve un producto por id, aca podemos notar el uso de "req.params"
router.get('/:id', (req, res) => {
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

// --> Recibe un query param que le dice la cantidad de productos que tiene que mandar
router.get('/listProducts', (req, res) => {
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

module.exports = router;
