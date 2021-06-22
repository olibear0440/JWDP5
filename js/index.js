//page principale

// Declaration des variables

let btnList = null;//document.getElementById("btnList");
let product = null;//document.getElementById("product");

// Récuperation des donnees api
// Creation des éléments et leurs attributs
// Stockage dans une fonction avec boucle
function listProduct() {
  fetch("http://localhost:3000/api/teddies/")
    .then((res) => res.json())
    .then((data) => {
      //console.log(data)
      for (let i = 0; i < data.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "productRef");
        //console.log(div)
        product.appendChild(div)
        //console.log(product)

        let a = document.createElement("a");
        a.setAttribute("href", "../html/produit.html?id=" + data[i]._id);
        a.setAttribute("title", "Choose your Teddy")
        div.appendChild(a);
        //console.log(a)
        

        let img = document.createElement("img");
        img.setAttribute("alt", "photo des teddy bears");
        img.src = data[i].imageUrl;
        a.appendChild(img);
        //console.log(img)

        let spanName = document.createElement("div");
        spanName.setAttribute("class", "productName");
        spanName.innerText = "Name: " + data[i].name;
        div.appendChild(spanName);
        //console.log(spanName)

        let price = document.createElement("div");
        price.setAttribute("class", "productPrice");
        let p = data[i].price;
        p = (Math.round(p) / 100).toFixed(2);
        price.innerText = "Price: " + p + "€";
        div.appendChild(price);
        //console.log(price)
      }
    });
}

window.onload = function()
{
  btnList = document.getElementById("btnList");
  product = document.getElementById("product");
  listProduct();
}
