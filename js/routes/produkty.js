const express = require('express');
const router = express.Router();

// GET /produkty
router.get('/', (req, res) => {
  res.json({
    lista: ['Produkt A', 'Produkt B']
  });
});

// GET /produkty/:id
router.get('/:id', (req, res) => {
  res.json({
    produkt: `Produkt ${req.params.id}`
  });
});

module.exports = router;
