//---affichage des produits dans panier

//---Conversion du panier au format javascript
let productLocalStorage = JSON.parse(localStorage.getItem("panier"));
//console.log(productLocalStorage);

let purchasePage = document.getElementById("purchasePage");
//console.log(purchasePage);

//---creer une page panier vide qui affichera le formulaire, btnDeleteAll, price à 0€
let purchaseEmpty = document.createElement("div");
purchaseEmpty.setAttribute("class", "purchaseEmpty");
//console.log(purchaseEmpty)
//console.log(purchasePage)
let purchaseEmptyText = document.createElement("div");
purchaseEmptyText.setAttribute("class", "purchaseEmptyText");
//console.log(purchaseEmpty)
purchaseEmpty.appendChild(purchaseEmptyText);
//console.log(purchasePage)

// ---test de panier vide ou non
if (productLocalStorage === null || productLocalStorage == 0) {
  //si panier vide
  //console.log(purchasePage)
  let emptyText = purchaseEmptyText.innerHTML;
  purchasePage.innerHTML = emptyText;
} else {
  //si panier rempli
  afficherPanier();
}

//---creer une fonction qui affiche le panier dans le navigateur
function afficherPanier() {
  let divSection = [];

  for (k = 0; k < productLocalStorage.length; k++) {
    let p = productLocalStorage[k].price;
    p = (Math.round(p * 100) / 100).toFixed(2);
    //console.log(p)
    divSection =
      divSection +
      `
    <div class="purchaseRecap">
    <div class="textName">Teddy : ${productLocalStorage[k].spanName} </div>
    <div class="textColor">Color : ${productLocalStorage[k].colors}</div>
    <div class="priceNbtn">Price : ${p} € <button class="btnDelete">Delete<button></div>
    </div>
    `;
    //console.log(divSection)
  }
  if (k == productLocalStorage.length) {
    purchasePage.innerHTML = divSection;
  }
}

//---effacer un produit du panier
let btnDelete = document.getElementsByClassName("btnDelete");
//console.log(btnDelete);

//---chercher les id de chaque btnDelete, creer l'evevenement au click de suppression, et envoi au local storage avec une alerte
function supprimerUnArticle() {
  for (let l = 0; l < btnDelete.length; l++) {
    let idBtnDelete = btnDelete[l];
    //console.log(idBtnDelete)
    idBtnDelete.addEventListener("click", function (event) {
      event.preventDefault();
      productLocalStorage.splice(l, 1);

      //envoi dans le local storage apres l'avoir transformé au format json
      localStorage.setItem("panier", JSON.stringify(productLocalStorage));

      //fenetre d'alerte
      alert("Your product has been removed");
      window.location.href = "panier.html";
    });
  }
}
supprimerUnArticle();

//---btn vider entierement le panier
//creer le html, afficher le btnDeleteAll
let btnDeleteAll = '<button id="btnDeleteAll">Delete your purchase<button>';
//console.log(purchasePage)
purchasePage.insertAdjacentHTML("beforeend", btnDeleteAll);
//console.log(purchasePage)
let purchaseBtnDeleteAll = document.getElementById("btnDeleteAll");
//console.log(purchaseBtnDeleteAll)

//---creer l'evenement au click de la suppression du panier total avec une alerte à l'utilisateur
function supprimerToutArticle() {
  purchaseBtnDeleteAll.addEventListener("click", function () {
    //removeItem pour vider le panier
    localStorage.removeItem("panier");

    //affichage alert "Your purchase is empty"
    alert("Your purchase is empty");
    window.location.href = "panier.html"; //au moment de la recharge de la page
  });
}
supprimerToutArticle();

//---addition montant total du panier
let totalAmount = [];

function tableauDesPrix() {
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
}
tableauDesPrix();

//---methode pour faire les additions (reduce)
let reducer = (accumulator, currentValue) => accumulator + currentValue;
//console.log(reducer)
let totalPrice = totalAmount.reduce(reducer, 0);
totalPrice = (Math.round(totalPrice * 100) / 100).toFixed(2);
//console.log(totalPrice)

//---prix total a afficher dans html
let totalAmountHtml = `
<div class="totalAmountHtml">Total Amount = ${totalPrice} € </div>`;
//console.log(totalAmountHtml)
//inserer dans le html
purchasePage.insertAdjacentHTML("beforeend", totalAmountHtml);
//console.log(purchasePage)

//---formulaire dans local storage
//creer une fonction
let formulaireHtml = () => {
  let formulaireSection = document.getElementById("purchasePage");
  //creer le html
  let formulaireStructure = `
  <div id="formulaireTitre">
    <h2>Please complete this online registration form</h2>
  </div>

  <div class="formulaireContenu">
  <form action="#">
  <label for="firstName">First name :</label>
  <input type="text" id="firstName" name="firstName" required><br>

  <label for="lastName">Last name :</label>
  <input type="text" id="lastName" name="lastName" required><br>

  <label for="email">Email :</label>
  <input type="email" id="email" name="email" required><br>  

  <label for="address">Address :</label>
  <input type="text" id="address" name="address" required><br>

  <label for="city">City :</label>
  <input type="text" id="city" name="city" required><br> 

  <button id="confirmForm" type="submit" name="confirmForm">
   Confirm my order
  </button>
  </form>
  </div>
  `;
  formulaireSection.insertAdjacentHTML("afterend", formulaireStructure);
};
formulaireHtml();

//---selection du btn confirm my order
let confirmForm = document.getElementById("confirmForm");
//console.log(confirmForm)

// creer l'evenement sur le click du btn confirm my order
confirmForm.addEventListener("click", function () {
  //mettre les values du formulaire dans un objet
  let contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
  };
  //console.log(contact)

  //---controler la saisie du formulaire

  //fonction textAlert qui alerte l'utilisateur de la bonne ecriture des champs
  let textAlert = (value) => {
    return value + " : Please enter valid informations";
  };

  //fonctions avec les valeurs du regex a reutiliser pour chaque champs à controler
  /*let regExNameCity = function(value){
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value)
  }*/
  let regExNameCity = (value) => {
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
  };
  let regExMail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };
  let regExAddress = (value) => {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
  };

  //Fonctions pour chaque champ a controler
  //---fonction de control du champ first name
  function controlFirstName() {
    let controlFormFirstName = contact.firstName;
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

  //---Fonction de control du champ last name
  function controlLastName() {
    let controlFormLastName = contact.lastName;
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
  //---Fonction de control du champ email
  function controlMail() {
    let controlFormEmail = contact.email;
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
  //---Fonction de control du champ address

  function controlAddress() {
    let controlFormAddress = contact.address;
    //console.log(controlForm)
    if (regExAddress(controlFormAddress)) {
      //console.log("OK")
      return true;
    } else {
      //console.log("KO")
      alert(textAlert("Your address is not valid"));
      return false;
    }
  }

  //---fonction de control du champ city
  function controlCity() {
    let controlFormCity = contact.city;
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

  //---envoi du formulaire au local storage
  if (
    controlFirstName() &&
    controlLastName() &&
    controlMail() &&
    controlAddress() &&
    controlCity()
  ) {
    //mettre l'objet contact sous forme de key, regarder dans le local storage
    localStorage.setItem("contact", JSON.stringify(contact));
    //console.log(contact)
    //mettre le prix total dans le local storage pour pouvoir le recuperer et l'afficher sur la page confirmation
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    //mettre les produits du local storage + formValue dans un objet a envoyer au serveur
    let productIds = [];
    for (let n = 0; n < productLocalStorage.length; n++) {
      let idByProduct = productLocalStorage[n].id;
      //console.log(idByProduct)
      productIds.push(idByProduct);
      //console.log(productIds);
    }
    //objet contenant les clés a renvoyer 
    let aEnvoyer = {
      products: productIds,
      contact: contact,
      prixTotal: totalPrice,
    };
    //console.log(aEnvoyer)
    //---fonction de la reponse du serveur
    sendServer(aEnvoyer);
  } else {
    //alert("Please enter valid informations");
  }
});

function sendServer(aEnvoyer) {
  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    body: JSON.stringify(aEnvoyer),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log("POST request response data", data); //reponse du serveur dans la console (non presente dans le local storage)
      //---recuperer la reponse du serveur dans le local storage
      localStorage.setItem("reponseServeur", JSON.stringify(data));
      console.log(data);
      //---Envoi de la reponse du serveur vers la page confirmation commande
      window.location = "confirmation.html";
    });
}


function saisieFormulaireActif(){
//---garder les saisies du formulaire actif si changement de page
// recup la key du local storage et mettre dans une variable
let infoLocalStorage = localStorage.getItem("contact");
//console.log(infoLocalStorage)

//convertir la chaine de caractere en objet
let infoLocalStorageCaractere = JSON.parse(infoLocalStorage);
//console.log(infoLocalStorageCaractere)

//attribuer les values correspondantes du local storage dans les champs du formulaire
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
  .getElementById("address")
  .setAttribute("value", infoLocalStorageCaractere.address);
document
  .getElementById("city")
  .setAttribute("value", infoLocalStorageCaractere.city);
}
saisieFormulaireActif()
//--------------------------------------------------------------------------------------
