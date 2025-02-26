const express = require("express");
const app = express();
app.use(express.json());
let products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
];

app.get('/', (req, res) => {
    res.send('Hello, this is the product services!');
});
 app.get("/products", (req, res) => res.json(products));
 app.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  product ? res.json(product) : res.status(404).json({ error: "Product not found" });
});

 app.post("/products", (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(5002, () => console.log("Product Service running on port 5002"));
