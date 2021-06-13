//Panier

//------------------affichage des produits dans panier----------------------------------------------

//declaration des valeurs
let productLocalStorage = JSON.parse(localStorage.getItem("panier"));
//console.log(productLocalStorage)

let purchasePage = document.getElementById("purchasePage");
//console.log(purchasePage);

//-----------------------creer div pour panier vide-----------------------------------------------
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

// ---------------------test de panier vide ou pas-------------------------------------------------
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
    <div>1 - Teddy : ${productLocalStorage[k].spanName} </div>
    <div>Color : ${productLocalStorage[k].colors}</div>
    <div>Price : ${productLocalStorage[k].price} € <button class="btnDelete">Delete<button></div>
    </div>
    `;
  }
  if (k == productLocalStorage.length) {
    purchasePage.innerHTML = divSection;
  }
}

//-------------------------------bouton suppression d'un article-------------------------------------
let btnDelete = document.getElementsByClassName("btnDelete");
//console.log(btnDelete)

//----------------------btn vider entierement le panier-----------------------------------------------

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
purchaseBtnDeleteAll.addEventListener("click", function () {
  //.removeItem pour vider le panier
  localStorage.removeItem("panier");

  //affichage alert "Your purchase is empty"
  alert("Your purchase is empty");
  window.location.href = "panier.html"; //au moment de la recharge de la page
});

//---------------addition montant total du panier---------------------------------------------------
let totalAmount = [];
for (let m = 0; m < productLocalStorage.length; m++) {
  //console.log(productLocalStorage)
  //creer variable dans laquelle on met tt les prix
  let priceByProduct = productLocalStorage[m].price;

  //mettre dans array totalAmount les prix
  totalAmount.push(priceByProduct);
  //console.log(priceByProduct)
  //console.log(totalAmount)
}

// methode pour faire les additions (reduce)
let reducer = (accumulator, currentValue) => accumulator + currentValue;
//console.log(reducer)
let totalPrice = totalAmount.reduce(reducer, 0);
//console.log(totalPrice)

// prix total a afficher dans html
//creer la variable avec html
let totalAmountHtml = `
<div class="totalAmountHtml">Total Amount = ${totalPrice} € </div>`;
//console.log(totalAmountHtml)
//inserer dans le html
purchasePage.insertAdjacentHTML("beforeend", totalAmountHtml);
//console.log(purchasePage)

//--------------------------------formulaire dans local storage-------------------------------------
//creer une fonction
let formulaireHtml = () => {
  //dom vs html
  let formulaireSection = document.getElementById("purchasePage");

  //integrer le html dans une variable
  let formulaireStructure = `
  <div id="formulaireTitre">
    <h2>Please complete this online registration form</h2>
  </div>

  <div class="formulaireContenu">
  <form action="#">
  <label for="firstName">First name :</label>
  <input type="text" id="firstName" name="firstName" required><br>

  <label for="lastName">Last name :</label>
  <input type="text" id="lastName" name="LastName" required><br>

  <label for="email">Email :</label>
  <input type="email" id="email" name="email" required><br>  

  <label for="adress">Adress :</label>
  <input type="text" id="adress" name="Adress" required><br>

  <label for="city">City :</label>
  <input type="text" id="city" name="City" required><br> 

  <button id="confirmForm" type="submit" name="confirmForm">
   Confirm my order
  </button>
  </form>
  </div>
  `;
  formulaireSection.insertAdjacentHTML("afterend", formulaireStructure);
};
//appel de la fonction
formulaireHtml();

//------------------------selection du btn confirm my order-----------------------------------------
let confirmForm = document.getElementById("confirmForm");
//console.log(confirmForm)

// creer l'evenement sur le click du btn confirm my order
confirmForm.addEventListener("click", function () {
  //mettre les values du formulaire dans un objet
  let formValue = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    address: document.getElementById("adress").value,
    city: document.getElementById("city").value,
  };
  //console.log(formValue)
  //------------------------------controler la saisie du formulaire-----------------------------

  // creer une fonction et controler la sisie de l'utilisateur avec la method regex
  //1.creer une fonction avec les valeurs du regex a reutiliser

  //----------------------------pour le prenom
  function controlFirstName(){
    let controlFormFirstName = formValue.firstName;
    //console.log(controlForm)
    if (/^[A-Za-z]{3,20}$/.test(controlFormFirstName)) {
      //console.log("OK")
      return true;
    } else {
      //console.log("KO")
      alert("Please enter valid informations");
      return false;
    }
  }
    
  if (controlFirstName()) {
    //mettre l'objet formValue sous forme de key, regarder dans le local storage
    localStorage.setItem("formValue", JSON.stringify(formValue));
    //console.log(controlFormRegex)
  } else {
    //console.log(controlFormRegex)
    alert("Please enter valid informations");
  }

  //-----------------------------------pour le lastName
  /*function controlFormRegexLastName() {
    let controlFormName = formValue.lastName;
    //console.log(controlForm)

    if (/^[A-Za-z]{3,20}$/.test(controlFormName)) {
      //console.log("OK")
      return true;
    } else {
      //console.log("KO")
      alert("please enter valid informations");
      return false;
    }
  }
  if (controlFormRegexFirstName()) {
    //mettre l'objet formValue sous forme de key, regarder dans le local storage
    localStorage.setItem("formValue", JSON.stringify(formValue));
    //console.log(controlFormRegex)
  } else {
    //console.log(controlFormRegex)
    alert("Please enter valid informations");
  }
*/
  //mettre les produits du local storage + formValue dans un objet a envoyer au serveur
  let aEnvoyer = {
    productLocalStorage,
    formValue,
  };
  //console.log(aEnvoyer)

  // envoi de l'objet aEnvoyer vers le serveur
});

/*
//------------------------garder les saisies du formulaire actif si changement de page

// recup la key du local storage et mettre dans une variable
let infoLocalStorage = localStorage.getItem("formValue")
//console.log(infoLocalStorage)

//convertir la chaine de caractere en objet
let infoLocalStorageCaractere = JSON.parse(infoLocalStorage)
//console.log(infoLocalStorageCaractere)

//prendre chaque value du local storage dans les champs du formulaire
document.getElementById("firstName").setAttribute("value", infoLocalStorageCaractere.firstName)
document.getElementById("lastName").setAttribute("value", infoLocalStorageCaractere.lastName)
document.getElementById("email").setAttribute("value", infoLocalStorageCaractere.email)
document.getElementById("adress").setAttribute("value", infoLocalStorageCaractere.adress)
document.getElementById("city").setAttribute("value", infoLocalStorageCaractere.city)
*/
//--------------------------------------------------------------------------------------
