const express = require('express');
const productsRouter = require('./products');
const userRouter = require('./user');
const categoriesRouter = require('./categories');

function routerApi (app) {
  // --> Esto es para darle una "ruta base" a la api.
  const router = express.Router();
  app.use('/api/v1', router);

  // --> Base de cada conjunto de endpoints.
  router.use('/products', productsRouter);
  router.use('/users', userRouter);
  router.use('/categories', categoriesRouter);
};

module.exports = routerApi;
