
const product = document.getElementById("product")
const btn = document.getElementById("btn")

// récuperation des donnees api et stocké dans une foction
function listProduct(){
    fetch("http://localhost:3000/api/teddies")
    .then((res) => res.json())
    .then((data) =>{
        for(let i=0; i< data.length; i++){
            let div = document.createElement("div");
            div.setAttribute("class", "productRef");
    
            let img = document.createElement("img");
            img.src= data[i].imageUrl;
            div.appendChild(img);
    
            let spanName = document.createElement("div");
            spanName.setAttribute("class", "productName");
            spanName.innerText = "Name: " + data[i].name;
            div.appendChild(spanName);
    
            let price = document.createElement("div");
            price.setAttribute("class", "productPrice")
            price.innerText = "Price: " + data[i].price + "€";
            div.appendChild(price);
    
            product.appendChild(div);
        }
    })
}
listProduct()

//style de l'id product
product.className = "styleProduct";

let productName = document.getElementsByClassName("productName")




