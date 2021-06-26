//Conversion du panier au format javascript
let productLocalStorage = JSON.parse(localStorage.getItem("panier"));
let purchasePage = null;
let purchaseBtnDeleteAll = null;
let contact = null;

window.onload = function () {
  purchasePage = document.getElementById("purchasePage");
  if (productLocalStorage === null || productLocalStorage == 0) {
    //si panier vide
    let purchaseEmpty = document.createElement("div");
    purchaseEmpty.className = "purchaseEmpty";
    let purchaseEmptyText = document.createElement("div");
    purchaseEmptyText.className = "purchaseEmptyText";
    purchaseEmpty.appendChild(purchaseEmptyText);
    purchasePage.appendChild(purchaseEmpty);
  } else {
    //si panier rempli
    //fonction affichPanier(ligne 98), instruction: creer html et integrer les données du produit dans la page
    afficherPanier();

    //btn (vider entierement le panier), creer le html, afficher le btnDeleteAll
    let btnDeleteAll =
      '<button id="btnDeleteAll">Delete your purchase</button>';
    purchasePage.insertAdjacentHTML("beforeend", btnDeleteAll);
    purchaseBtnDeleteAll = document.getElementById("btnDeleteAll");

    //fonction(ligne 119), instruction: evenement au clic pour le btn, suprimer dans le local storage et alerte pour utilisateur
    supprimerUnArticle();

    //fonction(ligne 137), instruction: evenement au clic, suppression total du panier et dans le local storage + alerte pour utilisateur
    supprimerToutArticle();

    //fonction(ligne 148), integrer le tarif de chaque article dans un array pour faire le total prix
    tableauDesPrix();

    //addition des tarifs avec methode (reduce)
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalPrice = totalAmount.reduce(reducer, 0);
    totalPrice = (Math.round(totalPrice * 100) / 100).toFixed(2);

    //tarif total a afficher dans html
    let totalAmountHtml = `
    <div class="totalAmountHtml">Total Amount = ${totalPrice} € </div>`;
    purchasePage.insertAdjacentHTML("beforeend", totalAmountHtml);

    //fonction(ligne 161) creer le formulaire dans le html et afficher dans la page
    formulaireHtml();

    //evenement au click du bouton "confirm my order", integrer l'objet "contact", "id", "total prix", envoi au local storage puis serveur et alert utilisateur
    let confirmForm = document.getElementById("confirmForm");
    confirmForm.addEventListener("click", function () {
      //mettre les values du formulaire dans un objet
      contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
      };

      //envoi du formulaire au local storage
      if (
        controlFirstName() &&
        controlLastName() &&
        controlMail() &&
        controlAddress() &&
        controlCity()
      ) {
        //mettre l'objet contact sous forme de key, regarder dans le local storage
        localStorage.setItem("contact", JSON.stringify(contact));
        //mettre le prix total dans le local storage pour pouvoir le recuperer et l'afficher sur la page confirmation
        localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
        //mettre les produits du local storage + formValue dans un objet a envoyer au serveur
        let productIds = [];
        for (let n = 0; n < productLocalStorage.length; n++) {
          let idByProduct = productLocalStorage[n].id;
          productIds.push(idByProduct);
        }
        //objet contenant les clés a renvoyer
        let aEnvoyer = {
          products: productIds,
          contact: contact,
          prixTotal: totalPrice,
        };

        //fonction(ligne 265), instruction: methode post, checker la reponse du serveur, envoi sur page confirmation
        sendServer(aEnvoyer);
      } else {
      }
    });

    //fonction(ligne 283), instruction: attribuer à chaque champ du formulaire les valeurs du local storage respectives
    saisieFormulaireActif();
  }
};
//
//afficher le panier dans la page
function afficherPanier() {
  let divSection = [];
  for (k = 0; k < productLocalStorage.length; k++) {
    let p = productLocalStorage[k].price;
    p = (Math.round(p * 100) / 100).toFixed(2);
    divSection =
      divSection +
      `
    <div class="purchaseRecap">
    <div class="textName">Teddy : ${productLocalStorage[k].spanName} </div>
    <div class="textColor">Color : ${productLocalStorage[k].colors}</div>
    <div class="priceNbtn">Price : ${p} € <button class="btnDelete">Delete</button></div>
    </div>
    `;
  }
  if (k == productLocalStorage.length) {
    purchasePage.innerHTML = divSection;
  }
}

//chercher btnDelete, creer click de suppression, et envoi au local storage avec une alerte
function supprimerUnArticle() {
  let btnDelete = document.getElementsByClassName("btnDelete");
  for (let l = 0; l < btnDelete.length; l++) {
    let idBtnDelete = btnDelete[l];

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

//evenement au click de la suppression du panier total avec une alerte à l'utilisateur
function supprimerToutArticle() {
  purchaseBtnDeleteAll.addEventListener("click", function () {
    //removeItem pour vider le panier
    localStorage.removeItem("panier");
    //affichage alert "Your purchase is empty"
    alert("Your purchase is empty");
    window.location.href = "panier.html"; //au moment de la recharge de la page
  });
}

//integrer les tarifs dans un array pour addition
let totalAmount = [];
function tableauDesPrix() {
  if (productLocalStorage !== null) {
    for (let m = 0; m < productLocalStorage.length; m++) {
      //creer variable dans laquelle on met tt les prix
      let priceByProduct = productLocalStorage[m].price;
      //mettre dans array totalAmount les prix
      totalAmount.push(priceByProduct);
    }
  }
}

//Creer le formulaire html et integrer dans la page
let formulaireHtml = () => {
  let formulaireSection = document.getElementById("purchasePage");
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

//--------------------------------------------------controler la saisie du formulaire----------------------------------------------------------

//fonction textAlert qui alerte l'utilisateur de la bonne ecriture des champs
let textAlert = (value) => {
  return value + " : Please enter valid informations";
};

//fonctions avec les valeurs du regex a reutiliser pour chaque champs à controler
let regExNameCity = (value) => {
  return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
};
let regExMail = (value) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
};
let regExAddress = (value) => {
  return /^[A-Za-z0-9\s]{5,50}$/.test(value);
};

//fonction de control du champ first name
function controlFirstName() {
  let controlFormFirstName = contact.firstName;
  if (regExNameCity(controlFormFirstName)) {
    return true;
  } else {
    alert(textAlert("First Name"));
    return false;
  }
}
//Fonction de control du champ last name
function controlLastName() {
  let controlFormLastName = contact.lastName;
  if (regExNameCity(controlFormLastName)) {
    return true;
  } else {
    alert(textAlert("Last Name"));
    return false;
  }
}
//Fonction de control du champ email
function controlMail() {
  let controlFormEmail = contact.email;
  if (regExMail(controlFormEmail)) {
    return true;
  } else {
    alert(textAlert("Email is not valid"));
    return false;
  }
}
//Fonction de control du champ address
function controlAddress() {
  let controlFormAddress = contact.address;
  if (regExAddress(controlFormAddress)) {
    return true;
  } else {
    alert(textAlert("Your address is not valid"));
    return false;
  }
}
//fonction de control du champ city
function controlCity() {
  let controlFormCity = contact.city;
  if (regExNameCity(controlFormCity)) {
    return true;
  } else {
    alert(textAlert("City"));
    return false;
  }
}
//----------------------------------------------------------fin controle de saisie du formulaire---------------------------------------------------

//methode post, checker la reponse du serveur, envoi sur page confirmation
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
      //recuperer la reponse du serveur dans le local storage
      localStorage.setItem("reponseServeur", JSON.stringify(data));
      //Envoi de la reponse du serveur vers la page confirmation commande
      window.location = "confirmation.html";
    });
}

//garder les saisies du formulaire actif si recharge de page
function saisieFormulaireActif() {
  // recuperer la key du local storage et mettre dans une variable
  let infoLocalStorage = localStorage.getItem("contact");

  //convertir la chaine de caractere en objet
  let infoLocalStorageCaractere = JSON.parse(infoLocalStorage);

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
