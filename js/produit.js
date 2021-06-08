//------------------------------------Produit

//--------------------------------recuperer l'url
let urlParams = new URLSearchParams(window.location.search);
//console.log(urlParams)
let id = urlParams.get("id");
//console.log(id)
let product = null;

function addProduct() {}

//-----------------------recuperation du produit (par id) depuis api
//----creation des divs et affichage img, name, price, description, colors (form)

function loadProduct() {
  fetch("http://localhost:3000/api/teddies/" + id)
    .then((res) => res.json())
    .then((idProd) => {
      product = idProd;
      //console.log(product)

      /*let idProd = data.find((element) => element._id === id);
      console.log(idProd)*/

      let productPage = document.getElementById("productPage");
      //console.log(productPage)

      let img = document.createElement("img");
      img.setAttribute("alt", "photo de teddy bear");
      img.src = idProd.imageUrl;
      productPage.appendChild(img);
      //console.log(img)

      let productRef = document.getElementById("productRef");
      productPage.appendChild(productRef);
      //console.log(productRef)

      let spanName = document.createElement("div");
      spanName.setAttribute("class", "productName");
      spanName.innerText = "Name: " + idProd.name;
      productRef.appendChild(spanName);
      //console.log(spanName)

      let price = document.createElement("div");
      price.setAttribute("class", "productPrice");
      price.innerText = "Price: " + idProd.price + "€";
      productRef.appendChild(price);
      //console.log(div)

      let descript = document.createElement("div");
      descript.setAttribute("class", "productDescript");
      descript.innerText = "Description: " + idProd.description;
      productRef.appendChild(descript);
      //console.log(div)

      // boucle for pour lister les couleurs sans "undefind"
      let colorList = document.getElementById("colorList");
      //console.log(colorList)

      function colorOptions() {
        for (let i = 0; i < idProd.colors.length; i++) {
          colorList.options.add(new Option(idProd.colors[i]));
        }
      }
      colorOptions();

      //----------------------------------Le panier
      //----------------------------------btnPurchase
      let purchaseBtn = document.getElementById("purchaseBtn");
      //console.log(purchaseBtn)
      purchaseBtn.addEventListener("click", function (e) {
        let productValue = {
          spanName: idProd.name,
          description: idProd.description,
          price: idProd.price,
          imageUrl: idProd.imageUrl,
          quantité: 1,
          colors: idProd.colors,
        };
        //console.log(productValue)

        //-----------------------Stocker les valeurs de "productValue dans le Local storage----------------
        //declaration des valeurs
        let productLocalStorage = JSON.parse(localStorage.getItem("panier"));
        //console.log(productLocalStorage)

        //--------creer fonction pour eviter les repetitions
        function pushProductLocalStorage() {
          productLocalStorage.push(productValue);
          localStorage.setItem("panier", JSON.stringify(productLocalStorage));
        }
        //pushProductLocalStorage()

        if (productLocalStorage) {
          pushProductLocalStorage();
          //console.log(productLocalStorage)
        } else {
          productLocalStorage = [];
          pushProductLocalStorage();
          //console.log(productLocalStorage)
        }
      });
    });
}

window.onload = function () {
  loadProduct();
};
