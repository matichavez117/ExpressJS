const productsRouter = require('./products');
const userRouter = require('./user');
const categoriesRouter = require('./categories');

function routerApi (app) {
  app.use('/api/products', productsRouter);
  app.use('/api/users', userRouter);
  app.use('/api/categories', categoriesRouter);
};

module.exports = routerApi;
