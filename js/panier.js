//Panier

//------------------affichage des produits dans panier----------------------------------------------

//declaration des valeurs
let productLocalStorage = JSON.parse(localStorage.getItem("panier"));
//console.log(productLocalStorage);

let purchasePage = document.getElementById("purchasePage");
//console.log(purchasePage);

//-----------------------creer div pour panier vide-----------------------------------------------
let purchaseEmpty = document.createElement("div");
purchaseEmpty.setAttribute("class", "purchaseEmpty");
//console.log(purchaseEmpty)
//console.log(purchasePage)
let purchaseEmptyText = document.createElement("div");
purchaseEmptyText.setAttribute("class", "purchaseEmptyText");
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
  afficherPanier();
}

function afficherPanier() {
  let divSection = [];

  for (k = 0; k < productLocalStorage.length; k++) {
    let p = productLocalStorage[k].price;
    p = (Math.round(p * 100) / 100).toFixed(2);
    divSection =
      divSection +
      `
    <div class="purchaseRecap">
    <div>1 - Teddy : ${productLocalStorage[k].spanName} </div>
    <div>Color : ${productLocalStorage[k].colors}</div>
    <div>Price : ${p} € <button class="btnDelete">Delete<button></div>
    </div>
    `;
  }
  if (k == productLocalStorage.length) {
    purchasePage.innerHTML = divSection;
  }
}

//------------------effacer un produit du panier----------------------------------------------

let btnDelete = document.getElementsByClassName("btnDelete");
//console.log(btnDelete)

// chercher les id de chaque btnDelete
for (let l = 0; l < btnDelete.length; l++) {
  let idBtnDelete = btnDelete[l];
  //console.log(idBtnDelete)
  idBtnDelete.addEventListener("click", function (event) {
    event.preventDefault();

    //chercher id du localstorage a supprimer
    let idProductLocalStorage = productLocalStorage[l].id;
    //console.log(idProductLocalStorage)

    productLocalStorage = productLocalStorage.filter(
      (el) => el.id !== idProductLocalStorage
    );
    //console.log(productLocalStorage)

    //envoi de la variable dans le local storage apres l'avoir transformé au format json
    localStorage.setItem("panier", JSON.stringify(productLocalStorage));

    //fenetre d'alerte
    alert("Your product has been removed");
    window.location.href("panier.html");
  });
}

//----------------------btn vider entierement le panier-----------------------------------------------

//creer le html
let btnDeleteAll = '<button id="btnDeleteAll">Delete your purchase<button>';
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
if (productLocalStorage !== null) {
  for (let m = 0; m < productLocalStorage.length; m++) {
    //console.log(productLocalStorage)
    //creer variable dans laquelle on met tt les prix
    let priceByProduct = productLocalStorage[m].price;

    //mettre dans array totalAmount les prix
    totalAmount.push(priceByProduct);
    //console.log(priceByProduct)
    //console.log(totalAmount)
  }
}
// methode pour faire les additions (reduce)
let reducer = (accumulator, currentValue) => accumulator + currentValue;
//console.log(reducer)
let totalPrice = totalAmount.reduce(reducer, 0);
totalPrice = (Math.round(totalPrice * 100) / 100).toFixed(2);
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
    adress: document.getElementById("adress").value,
    city: document.getElementById("city").value,
  };
  //console.log(formValue)
  //------------------------------controler la saisie du formulaire-----------------------------

  // creer une fonction et controler la saisie de l'utilisateur avec la method regex
  //1.creer une fonction avec les valeurs du regex a reutiliser

  //fonction textAlert pour ne pas avoir a repeter
  let textAlert = (value) => {
    return value + " : Please enter valid informations";
  };

  //fonction regEx first name, last name pour ne pas avoir a repeter
  let regExNameCity = (value) => {
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
  };
  //fonctionr regEx email pour ne pas avoir a repeter (trouver sur le site regEx.com)
  let regExMail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };
  //fonction regEx adress pour ne pas avoir a repeter
  let regExAdress = (value) => {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
  };
  



  //----------------------------pour le first name-------------------------
  function controlFirstName() {
    let controlFormFirstName = formValue.firstName;
    //console.log(controlForm)
    if (regExNameCity(controlFormFirstName)) {
      //console.log("OK")
      return true;
    } else {
      //console.log("KO")
      alert(textAlert("First Name"));
      return false;
    }
  }
  //----------------------------pour le last name----------------------------
  function controlLastName() {
    let controlFormLastName = formValue.lastName;
    //console.log(controlForm)
    if (regExNameCity(controlFormLastName)) {
      //console.log("OK")
      return true;
    } else {
      //console.log("KO")
      alert(textAlert("Last Name"));
      return false;
    }
  }
  //----------------------------pour l'email---------------------------------
  function controlMail() {
    let controlFormEmail = formValue.email;
    //console.log(controlForm)
    if (regExMail(controlFormEmail)) {
      //console.log("OK")
      return true;
    } else {
      //console.log("KO")
      alert(textAlert("Email is not valid"));
      return false;
    }
  }
  //------------------------pour adress--------------------------------

  function controlAdress() {
    let controlFormAdress = formValue.adress;
    //console.log(controlForm)
    if (regExAdress(controlFormAdress)) {
      //console.log("OK")
      return true;
    } else {
      //console.log("KO")
      alert(textAlert("Your adress is not valid"));
      return false;
    }
  }

  //----------------------------pour le first name-------------------------
  function controlCity() {
    let controlFormCity = formValue.city;
    //console.log(controlForm)
    if (regExNameCity(controlFormCity)) {
      //console.log("OK")
      return true;
    } else {
      //console.log("KO")
      alert(textAlert("City"));
      return false;
    }
}


  //--------------------- envoi du formulaire au local storage
  if (
    controlFirstName() &&
    controlLastName() &&
    controlMail() &&
    controlAdress() &&
    controlCity()
  ) {
    //mettre l'objet formValue sous forme de key, regarder dans le local storage
    localStorage.setItem("formValue", JSON.stringify(formValue));
    //console.log(controlFirstName)
  } else {
    alert("Please enter valid informations");
  }

  //mettre les produits du local storage + formValue dans un objet a envoyer au serveur
  let aEnvoyer = {
    productLocalStorage,
    formValue,
  };
  //console.log(aEnvoyer)

  // envoi de l'objet aEnvoyer vers le serveur
});

//------------------------garder les saisies du formulaire actif si changement de page
// recup la key du local storage et mettre dans une variable
let infoLocalStorage = localStorage.getItem("formValue");
//console.log(infoLocalStorage)

//convertir la chaine de caractere en objet
let infoLocalStorageCaractere = JSON.parse(infoLocalStorage);
//console.log(infoLocalStorageCaractere)

//prendre chaque value du local storage dans les champs du formulaire
document
  .getElementById("firstName")
  .setAttribute("value", infoLocalStorageCaractere.firstName);
document
  .getElementById("lastName")
  .setAttribute("value", infoLocalStorageCaractere.lastName);
document
  .getElementById("email")
  .setAttribute("value", infoLocalStorageCaractere.email);
document
  .getElementById("adress")
  .setAttribute("value", infoLocalStorageCaractere.adress);
document
  .getElementById("city")
  .setAttribute("value", infoLocalStorageCaractere.city);
//--------------------------------------------------------------------------------------
