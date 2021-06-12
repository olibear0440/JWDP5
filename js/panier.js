//Panier

//------------------affichage des produits dans panier----------

//declaration des valeurs
let productLocalStorage = JSON.parse(localStorage.getItem("panier"));
//console.log(productLocalStorage)

let purchasePage = document.getElementById("purchasePage");
//console.log(purchasePage);

//-----------------------creer div pour panier vide-----------
let purchaseEmpty = document.createElement("div");
purchaseEmpty.setAttribute("class", "purchaseEmpty");
//console.log(purchaseEmpty)
//console.log(purchasePage)
let purchaseEmptyText = document.createElement("div");
purchaseEmptyText.setAttribute("class", "purchaseEmptyText");
purchaseEmptyText.innerHTML = "Your purchase is empty";
//console.log(purchaseEmpty)
purchaseEmpty.appendChild(purchaseEmptyText);
//console.log(purchasePage)

// ---------------------test de panier vide ou pas
if (productLocalStorage === null || productLocalStorage == 0) {
  //si panier vide
  //console.log(purchasePage)
  let emptyText = purchaseEmptyText.innerHTML;
  purchasePage.innerHTML = emptyText;
} else {
  //si panier rempli
  //creer une boucle for pour afficher chaque teddy avec ses valeurs

  let divSection = [];

  for (k = 0; k < productLocalStorage.length; k++) {
    divSection =
      divSection +
      `
    <div class="purchaseRecap">
    <div>Q1 - Teddy : ${productLocalStorage[k].spanName} </div>
    <div>Price : ${productLocalStorage[k].price} € - <button class="btnDelete">Delete<button></div>
    </div>
    `;
  }
  if (k == productLocalStorage.length) {
    purchasePage.innerHTML = divSection;
  }
}

//-------------------------------bouton suppression d'un article-----------
let btnDelete = document.getElementsByClassName("btnDelete");
//console.log(btnDelete)

//-------------------------------------------fin btnDelete a revoir------------

//----------------------btn vider entierement le panier-----------------

//creer le html
let btnDeleteAll = `
<button id="btnDeleteAll">Delete your purchase<button>`;
//console.log(purchasePage)

//inserer le bouton dans le html
purchasePage.insertAdjacentHTML("beforeend", btnDeleteAll);
//console.log(purchasePage)

let purchaseBtnDeleteAll = document.getElementById("btnDeleteAll");
//console.log(purchaseBtnDeleteAll)

//supprimer le produit dans le local storage
purchaseBtnDeleteAll.addEventListener("click", function(){
  
  //.removeItem pour vider le panier
  localStorage.removeItem("panier");

  //affichage alert "Your purchase is empty"
  alert("Your purchase is empty")
  window.location.href = "panier.html" //au moment de la recharge de la page
})

//---------------addition montant total du panier---------
let totalAmount= []
for (let m=0; m < productLocalStorage.length; m++)
{
  //console.log(productLocalStorage)
  //creer variable dans laquelle on met tt les prix
  let priceByProduct = productLocalStorage[m].price

  //mettre dans array totalAmount les prix
  totalAmount.push(priceByProduct)
  //console.log(priceByProduct)
  //console.log(totalAmount)
}
 
// methode pour faire les additions (reduce)
let reducer = (accumulator, currentValue) => accumulator + currentValue
//console.log(reducer)
let totalPrice = totalAmount.reduce(reducer,0)
//console.log(totalPrice)

// prix total a afficher dans html
//creer la variable avec html
let totalAmountHtml = `
<div class="totalAmountHtml">Total Amount = ${totalPrice} € </div>`
//console.log(totalAmountHtml)
//inserer dans le html
purchasePage.insertAdjacentHTML("beforeend", totalAmountHtml)
console.log(purchasePage)
