let carrito = [];
let total = 0;

function add(productId, price) {
    console.log(productId, price);
    carrito.push(productId);
    total = total + price;
    document.getElementById("checkout").innerHTML = `Pagar $${total}`
}

async function pay() {
    const productList = await (await fetch('/api/pay', {
        method: "post",
        body: JSON.stringify(carrito),
        headers: {
            "Content-Type": "application/json"
        }
    })).json();

}

//-----<h3>${element.name}</h3> may go under card class
function displayProducts(productList) {
    let productsHTML = '';
    productList.forEach(element => {
        productsHTML +=
        `<div class="col-sm-12 col-md-6 col-lg-4 card">
            <img class="zoomable" src="${element.image}"/>
            <div class="buy">
                <h2>$${element.price}</h2>
                <button class="button-add" onclick="add(${element.id}, ${element.price})">Agregar</button>
            </div>
        </div>`
    });
    document.getElementById('page-content').innerHTML = productsHTML;
}

window.onload = async() => {
    const productList = await (await fetch("/api/products")).json();
    console.log(productList);
    displayProducts(productList);
}