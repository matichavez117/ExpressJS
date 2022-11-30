const express = require('express'); // --> Importo express.
const router = express.Router();

// --> Recibe un query param y devuelve un json con los valores, sino un mensaje.
router.get('/', (req, res) => {
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

module.exports = router;
