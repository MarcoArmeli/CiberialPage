const express = require('express')
const app = express()
const port = 3000

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
    }
];


app.get('/api/products', (req, res) => {
  res.send(products)
})

app.use("/", express.static("Front"))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});