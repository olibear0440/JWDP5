//page principale

// Declaration des variables

let btnList = null;//document.getElementById("btnList");
let product = null;//document.getElementById("product");

// Récuperation des donnees api
// Creation des éléments et leurs attributs
// Stockage dans une fonction avec boucle
function listProduct() {
  fetch("http://localhost:3000/api/teddies")
    .then((res) => res.json())
    .then((data) => {
      //console.log(data)
      for (let i = 0; i < data.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "productRef");
        //console.log(div)
        product.appendChild(div)
        //console.log(product)
        /*let id = document.createElement("p");
        id = data[i]._id;
        //console.log(id);*/

        let a = document.createElement("a");
        a.setAttribute("href", "../html/produit.html?id=" + data[i]._id);
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
        price.innerText = "Price: " + data[i].price + "€";
        div.appendChild(price);
        //console.log(price)

        let btn = document.createElement("button");
        btn.setAttribute("id", "btnWatch");
        btn.innerText = "Watch";
        div.appendChild(btn);
        //console.log(btn)
        
      }
    });
}

window.onload = function()
{
  btnList = document.getElementById("btnList");
  product = document.getElementById("product");
  listProduct();
}
