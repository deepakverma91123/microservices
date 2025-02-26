const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
let orders = [];
app.post("/orders", async (req, res) => {
  const { userId, productId, quantity } = req.body;

   const userResponse = await axios.get(`http://localhost:5001/users/${userId}`);
  const productResponse = await axios.get(`http://localhost:5002/products/${productId}`);

  if (!userResponse.data || !productResponse.data) {
    return res.status(400).json({ error: "Invalid user or product ID" });
  }

  const newOrder = {
    id: orders.length + 1,
    user: userResponse.data,
    product: productResponse.data,
    quantity,
    status: "Pending",
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

 app.get("/orders", (req, res) => res.json(orders));
 app.get('/', (req, res) => {
    res.send('Hello, this is the order services!');
});

app.listen(5003, () => console.log("Order Service running on port 5003"));