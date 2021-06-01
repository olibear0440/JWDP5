/*class teddyBear {
    constructor(objectId, name, price, description, imageUrl){
        this.objectId = objectId;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}
let teddyOne = new teddyBear("5be9c8541c9d440000665243", "Norbert", 2900, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "http://localhost:3000/images/teddy_1.jpg");
let teddyTwo = new teddyBear("5beaa8bf1c9d440000a57d94", "Arnold", 3900, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "http://localhost:3000/images/teddy_2.jpg");
let teddyThree = new teddyBear("5beaaa8f1c9d440000a57d95", "Lenny and Carl", 5900, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "http://localhost:3000/images/teddy_3.jpg");
let teddyFour = new teddyBear("5beaabe91c9d440000a57d96", "Gustav", 4500, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "http://localhost:3000/images/teddy_4.jpg");
let teddyFive = new teddyBear("5beaacd41c9d440000a57d97", "Garfunkel", 5500, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "http://localhost:3000/images/teddy_5.jpg");
*/
const product = document.getElementById("product")
const btn = document.getElementById("btn")

// récuperation des donnees api et stocké dans une foction
function listProduct(){
    fetch("http://localhost:3000/api/teddies")
    .then((res) => res.json())
    .then((data) =>{
        for(let i=0; i< data.length; i++){
            let div = document.createElement("div");
    
            let img = document.createElement("img");
            img.src= data[i].imageUrl;
            div.appendChild(img);
    
            let spanName = document.createElement("div");
            spanName.innerText = "Name: " + data[i].name;
            div.appendChild(spanName);
    
            let price = document.createElement("div");
            price.innerText = "Price: " + data[i].price + "€";
            div.appendChild(price);
    
            product.appendChild(div);
        }
    })
}
// creation fonction toggle sur le btn Oritoy
function btnToggle() {
    if (product.style.display === "none") {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
}
// evenement au click du btn
btn.addEventListener("click", function(){
    listProduct()
    btnToggle()
})



