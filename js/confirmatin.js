//recuperer la commande depuis le local storage-------------------------------------------

let localStorageReponseServeur = localStorage.getItem("reponseServeur");
//console.log(localStorageReponseServeur)

// recuperer le orderId  du reponseServeur
let orderIdResponse = JSON.parse(localStorageReponseServeur);
//console.log(orderIdResponse)
let orderId = orderIdResponse.orderId;
//console.log(orderId)

//recuperer le totalPrice du local storage
let localStorageTotalPrice = localStorage.getItem("totalPrice");
//console.log(localStorageTotalPrice)
let orderTotalPrice = JSON.parse(localStorageTotalPrice);
//console.log(orderTotalPrice)

//construire le html de la page confirmation----------------------------------------------

//pointer la div html dans le dom
let orderPage = document.getElementById("orderPage");
//console.log(orderPage);

//creer le html
let div = document.createElement("div");
div.setAttribute("class", "thanksOrder");
//console.log(div)
orderPage.appendChild(div)
//console.log(orderPage)
let pText = document.createElement("p");
pText.innerText = "Your Teddys will arrive soon";
//console.log(pText)
div.appendChild(pText);
//console.log(div)
let pOrderId = document.createElement("p");
pOrderId.innerText = "Your order number : " + orderId + " has been confirmed";
//console.log(pOrderId)
div.appendChild(pOrderId);
//console.log(div)
let pOrderPrice = document.createElement("p");
pOrderPrice.innerText = "Total price = " + orderTotalPrice + " € ";
//console.log(pOrderPrice);
div.appendChild(pOrderPrice);
//console.log(div)

//------------------------------------effacer les clés du local storage pour de nouvelles commandes--------------------

function removeLocaleStorageKeys (key){
    localStorage.removeItem(key)
}
removeLocaleStorageKeys ("totalPrice")
removeLocaleStorageKeys ("panier")
removeLocaleStorageKeys ("reponseServeur")
