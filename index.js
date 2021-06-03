// Declaration des variables
const product = document.getElementById("product");
const btnList = document.getElementById("btnList");

// Récuperation des donnees api 
// Creation des éléments et leurs attributs
// Stockage dans une fonction avec boucle
function listProduct(){
    fetch("http://localhost:3000/api/teddies")
    .then((res) => res.json())
    .then((data) =>{
        for(let i=0; i< data.length; i++){
            let div = document.createElement("div");
            div.setAttribute("class", "productRef");
            //console.log(div)
    
            let img = document.createElement("img");
            img.src= data[i].imageUrl;
            div.appendChild(img);
            //console.log(img)
    
            let spanName = document.createElement("div");
            spanName.setAttribute("class", "productName");
            spanName.innerText = "Name: " + data[i].name;
            div.appendChild(spanName);
             //console.log(spanName)
    
            let price = document.createElement("div");
            price.setAttribute("class", "productPrice");
            price.innerText = "Price: " + data[i].price + "€";
            div.appendChild(price);
            //console.log(price)

            let btn = document.createElement("button");
            btn.setAttribute("id", "btnWatch");
            btn.innerText = "Watch";
            div.appendChild(btn);
            //console.log(btn)
    
            product.appendChild(div);
            //console.log(product)
        }
    })
}
listProduct()

//style de l'id product "const product = document.getElementById("product")"
product.className = "styleProduct";
//console.log(product)

//Affichage du btnWatch qui servira d'acces a la page produit



























// test local storage
/*localStorage.setItem("nom", "OLivierBenoit");
localStorage.setItem("age", "42 ans");*/
