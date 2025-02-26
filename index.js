const express = require('express');
const proxy = require('express-http-proxy');
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(express.json());

const routes = {
    '/users':'http://localhost:5001',
    '/products': 'http://localhost:5002',
    '/orders': 'http://localhost:5003'
}


for(const route in routes){
    const target = routes[route];
    app.use(route,createProxyMiddleware({target}))
}

// app.use("/users", createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: true }));
// app.use("/products", createProxyMiddleware({ target: "http://localhost:5002", changeOrigin: true }));
// app.use("/orders", createProxyMiddleware({ target: "http://localhost:5003", changeOrigin: true }));



// app.use('/users', proxy('http://localhost:5001'));
// app.use('/products', proxy('http://localhost:5002'));
// app.use('/orders', proxy('http://localhost:5003'));

 app.get('/', (req, res) => {
    res.send('Hello, this is the main server!');
});


app.get('/devs', (req, res) => {
    res.send('Hello, this is the main server!');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});