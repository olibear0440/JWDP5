//Produit

//recuperer l'url
let urlParams = new URLSearchParams(window.location.search);
//console.log(urlParams)
let id = urlParams.get("id");
//console.log(id)

// recuperation du produit (par id) depuis api
//creation des divs et affichage img, name, price, description, colors (form)

fetch("http://localhost:3000/api/teddies/")
  .then((res) => res.json())
  .then((data) => {
    //console.log(data)
    let idProd = data.find((element) => element._id === id);
    //console.log(idProd)
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

    let option = document.getElementsByTagName("option");
    //console.log(option)
    option[0].innerText = idProd.colors[0];
    option[1].innerText = idProd.colors[1];
    option[2].innerText = idProd.colors[2];
    option[3].innerText = idProd.colors[3];

    //Le panier

    const colorList = document.getElementById("colorList");
//console.log(colorList)


//selection par purchaseBtn
    const purchaseBtn = document.getElementById("purchaseBtn")
//console.log(purchaseBtn)
    purchaseBtn.addEventListener("click", function(e){
    e.preventDefault()
//choix de la couleur validé
    const colorChoice = colorList.value;

//recuperer les infos pour le panier
    const forBasket = {
        img: idProd.imageUrl,
        spanName: idProd.name,
        colors: idProd.colorChoice,
        price: idProd.price 
}
console.log(forBasket)
})

});
