const express = require('express'); // --> Importo express.
const router = express.Router();

// --> Recibir varios parametros en el request
router.get('/:categoryId/product/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

module.exports = router;
