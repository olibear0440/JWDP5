

//---recuperer l'url
let urlParams = new URLSearchParams(window.location.search);
//console.log(urlParams)

//---récuperer l'id du produit selectionné
let id = urlParams.get("id");
//console.log(id)

//---recuperation du produit (par id) depuis api et creation des divs/ affichage img, name, price, description, colors
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
      spanName.innerText = "Name:  " + idProd.name;
      productRef.appendChild(spanName);
      //console.log(spanName)

      let price = document.createElement("div");
      price.setAttribute("class", "productPrice");
      let p = idProd.price;
      p = (Math.round(p) / 100).toFixed(2);
      price.innerText = "Price:  " + p + "€";
      productRef.appendChild(price);
      //console.log(div)

      let descript = document.createElement("div");
      descript.setAttribute("class", "productDescript");
      descript.innerText = "Description:  " + idProd.description;
      productRef.appendChild(descript);
      //console.log(div)

      //---boucle for pour lister les couleurs sans "undefind"
      let colorList = document.getElementById("colorList");
      //console.log(colorList)
      for (let i = 0; i < idProd.colors.length; i++) {
        colorList.options.add(new Option(idProd.colors[i]));
      }

      //---btnPurchase
      let purchaseBtn = document.getElementById("purchaseBtn");
      //console.log(purchaseBtn)

      //---evenement sur le btn pour envoi au panier
      purchaseBtn.addEventListener("click", function () {
        let productValue = {
          id: idProd._id,
          spanName: idProd.name,
          description: idProd.description,
          price: idProd.price / 100,
          imageUrl: idProd.imageUrl,
          quantité: 1,
          colors: document.getElementById("colorList").value,
        };
      

        
        //---variable qui stock "panier" (chaine de caractere), la conversion avec la methode JSON.parse en objet Javascript
        let productLocalStorage = JSON.parse(localStorage.getItem("panier"));
        //console.log(productLocalStorage)

        //---Stocker les valeurs de "productValue dans le Local storage et convertir au format JSON les valeurs
        function pushProductLocalStorage() {
          productLocalStorage.push(productValue);
          localStorage.setItem("panier", JSON.stringify(productLocalStorage));
        }
        //pushProductLocalStorage()


        //---condition de réalisation de la fonction pushProductLocalStorage() si le panier est vide 
        if (productLocalStorage) {
          pushProductLocalStorage();
          //console.log(productLocalStorage)
        } else {
          productLocalStorage = [];
          pushProductLocalStorage();
          //console.log(productLocalStorage)
        }

        //---envoi vers page panier
        window.location.href = "panier.html";
      });
    });
}

//---afficher la page une fois chargé
window.onload = function () {
  loadProduct();
};
