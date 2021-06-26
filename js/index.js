
//---Récuperation des donnees api
//---Creation des éléments et leurs attributs
//---Stockage dans une fonction avec boucle

function listProduct() {
  fetch("http://localhost:3000/api/teddies/")
    .then((res) => res.json())
    .then((data) => {

      //boucle pour afficher chaque produit de l'api (id, img, name, price)
      for (let i = 0; i < data.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "productRef");
        product.appendChild(div);

        let a = document.createElement("a");
        a.setAttribute("href", "../html/produit.html?id=" + data[i]._id);
        a.setAttribute("title", "Choose your Teddy");
        div.appendChild(a);

        let img = document.createElement("img");
        img.setAttribute("alt", "photo des teddy bears");
        img.src = data[i].imageUrl;
        a.appendChild(img);

        let spanName = document.createElement("div");
        spanName.setAttribute("class", "productName");
        spanName.innerText = "Name: " + data[i].name;
        div.appendChild(spanName);

        let price = document.createElement("div");
        price.setAttribute("class", "productPrice");
        let p = data[i].price;

        //Afficher les décimales sur les prix
        p = (Math.round(p) / 100).toFixed(2);

        price.innerText = "Price: " + p + "€";
        div.appendChild(price);
      }
    });
}

//afficher la page une fois chargé
window.onload = function () {
  product = document.getElementById("product");
  listProduct();
};
