const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

const products = [
    {
        id: 1,
        name: "prenda1",
        price: 300,
        image: "./elementos/remera kuromi.png",
        stock: 3,
    }, {
        id: 2,
        name: "prenda2",
        price: 300,
        image: "./elementos/remera kuromi.png",
        stock: 3,
    }, {
        id: 3,
        name: "prenda3",
        price: 300,
        image: "./elementos/remera the angel.png",
        stock: 3,
    },{
        id: 4,
        name: "prenda4",
        price: 300,
        image: "./elementos/remera the angel.png",
        stock: 3,
    },{
        id: 5,
        name: "prenda5",
        price: 300,
        image: "./elementos/remera the angel.png",
        stock: 3,
    },{
        id: 6,
        name: "prenda6",
        price: 300,
        image: "./elementos/remera the angel.png",
        stock: 3,
    }
];


app.get('/api/products', (req, res) => {
  res.send(products)
});

app.post('/api/pay', (req, res) => {
  const ids = req.body;
  ids.forEach(id => {
    const product = products.find(p => p.id === id);
    product.stock--;
  });
  res.send(products);
});

app.use("/", express.static("Front"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});