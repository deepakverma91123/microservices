const express = require("express");
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: "Deepak Verma", email: "deepak@@gmail.com" },
  { id: 2, name: "Neeraj", email: "neeraj@gmail.com" },
];
app.get('/', (req, res) => {
    res.send('Hello, this is the user services!');
});
 app.get("/users", (req, res) => res.json(users));

 app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
});

 app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(5001, () => console.log("User Service running on port 5001"));