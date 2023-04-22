let productList = [];
let carrito = [];
let total = 0;

function add(productId, price) {
    const product = productList.find(p => p.id === productId);
    product.stock--;

    console.log(productId, price);
    carrito.push(productId);
    total = total + price;
    document.getElementById("checkout").innerHTML = `Pagar $${total}`
    displayProducts()
}

async function pay() {
    try {
        const productList = await (await fetch('/api/pay', {
            method: "post",
            body: JSON.stringify(carrito),
            headers: {
                "Content-Type": "application/json"
            }
        })).json();
    }
    catch {
        window.alert("sin stock")
    }
    carrito = [];
    total = 0;
    await fetchProducts();
    document.getElementById("checkout").innerHTML = `Pagar $${total}`
}

//-----<h3>${element.name}</h3> may go under card class
function displayProducts() {
    let productsHTML = '';
    productList.forEach(p => {
        let buttonHTML = `<button class="button-add" onclick="add(${p.id}, ${p.price})">Agregar</button>`

        if (p.stock <= 0) {
            buttonHTML = `<button disabled class="button-add disabled" onclick="add(${p.id}, ${p.price})">sin stock</button>;`
        }

        productsHTML +=
            `<div class="col-sm-12 col-md-6 col-lg-4 card">
            <img class="zoomable" src="${p.image}"/>
            <div class="buy">
                <h3>$${p.price}</h3>
                ${buttonHTML}
            </div>
        </div>`
    });
    document.getElementById('page-content').innerHTML = productsHTML;
}

async function fetchProducts() {
    productList = await (await fetch("/api/products")).json();
    displayProducts();
}

window.onload = async () => {
    await fetchProducts();
}