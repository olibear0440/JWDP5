//recuperer le panier depuis le local storage
let localStorageReponseServeur = localStorage.getItem("reponseServeur");
//convertir la reponse au format javascript
let orderIdResponse = JSON.parse(localStorageReponseServeur);
let orderId = orderIdResponse.orderId;

//recuperer le totalPrice du local storage
let localStorageTotalPrice = localStorage.getItem("totalPrice");
//convertir la reponse au format javascript
let orderTotalPrice = JSON.parse(localStorageTotalPrice);

//construire le html de la page confirmation
function pageDeConfirmation() {
  let orderPage = document.getElementById("orderPage");

  let div = document.createElement("div");
  div.setAttribute("class", "thanksOrder");
  orderPage.appendChild(div);
  
  let pText = document.createElement("p");
  pText.innerText = "Your Teddys will arrive soon";
  div.appendChild(pText);
  
  let pOrderId = document.createElement("p");
  pOrderId.innerText = "Your order number : " + orderId + " has been confirmed";
  div.appendChild(pOrderId);
  
  let pOrderPrice = document.createElement("p");
  pOrderPrice.innerText = "Total price = " + orderTotalPrice + " € ";
  div.appendChild(pOrderPrice);
}
pageDeConfirmation();

//effacer les clés du local storage pour de nouvelles commandes
function removeLocaleStorageKeys(key) {
  localStorage.removeItem(key);
}
removeLocaleStorageKeys("totalPrice");
removeLocaleStorageKeys("panier");
removeLocaleStorageKeys("reponseServeur");
