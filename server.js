const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname)); // Serve HTML & JS
app.use(express.json());

app.post('/add-product', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).send('Invalid data');

  const line = `\n${name},${price}`;
  fs.appendFile(path.join(__dirname, 'products.csv'), line, err => {
    if (err) return res.status(500).send('Error saving product');
    res.send('Product saved successfully');
  });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
