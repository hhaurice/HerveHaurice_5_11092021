
//Get ID from url
function getId() {
    let queryString = window.location.search; // get url after ?: exemple pour Norbert: ?id=5beaa8bf1c9d440000a57d94
    let id = queryString.replace("?id=", ""); // remove ?id=
    return id; // Rreturn only id
}

let id = getId(); // put function id in a variable so that we can use it later in the code

// Get Data API

fetch("http://localhost:3000/api/teddies/"+id) // fetch API with id to return teddy given id. Ex: in the API, Norbert is http://localhost:3000/api/teddies/5be9c8541c9d440000665243
.then((res) => {
    if(res.ok){
        return res.json(); // get response in JSON
        
    } else {
        throw new Error("Problème de serveur")
    }
})    
.then((data) => {
    showItem(data);  // invoke function 
})

// Show product info

function showItem(data) {

    let product = document.getElementById('produit');

    let productCaption = document.createElement("img");
    let productSection = document.createElement("section");
    let productName = document.createElement("h2");
    let selectTitle = document.createElement("label");
    let selectColor = document.createElement("select"); 
    let productPrice = document.createElement("p");
    let productDescription = document.createElement("p");
    let addtoBasketBtn = document.createElement("button");



    productCaption.src = data.imageUrl; 
    productName.innerHTML = data.name;
    selectColor.id = "colors";
    selectTitle.innerHTML = "Choisissez une couleur: ";
    productPrice.innerHTML = data.price / 100 +" euros";
    productDescription.innerHTML = data.description;
    addtoBasketBtn.innerHTML = "Ajoutez au panier";

    product.appendChild(productCaption);
    product.appendChild(productSection);
    productSection.appendChild(productName);
    productSection.appendChild(selectTitle);
    productSection.appendChild(selectColor);

    //add a drop down list that creates value option in select element according to the array values in data.colors
    for(let i = 0; i < data.colors.length; i++) {
        let option = document.createElement("option");
        option.value = data.colors[i];
        option.text = data.colors[i];
        option.selected = data.colors[0];
        selectColor.appendChild(option);
    }
    productSection.appendChild(productPrice).style.fontWeight="900";
    productSection.appendChild(productDescription);
    productSection.appendChild(addtoBasketBtn);


    // Test addToBasket
   
    /* let teddy = {
        name: data.name,
        price: data.price,
        colors: data.colors
    }

    let teddyJSON = JSON.stringify(teddy);
    localStorage.setItem("product", teddyJSON);
    teddyJSON = localStorage.getItem("product");
    teddy = JSON.parse(teddyJSON);
    */

    let addToCart = document.getElementsByTagName("button");
    console.log("1 "+ addToCart)  
    for (let i = 0; i < addToCart.length; i++) {
      addToCart[i].addEventListener("click", function(event){
        let cart = JSON.parse(localStorage.getItem("cart")) || []

        let teddy = {
            name: data.name,
            price: data.price,
            caption: data.imageUrl
        }
        cart.push(teddy)
        localStorage.setItem("cart", JSON.stringify(cart))
         alert("Article enregistré dans le panier")
       
        
    })      
    }
    
    



 




    // Fin test addtoBasket

    // Test localstorage
    /*
    let teddyName = document.getElementsByTagName("h2")[0];
    let teddyPrice = document.getElementsByTagName("p")[0];
    let teddyColor = document.getElementById("colors"); 

   

    if(!localStorage.getItem('h2')) {
        populateStorage();
      } else {
        setColor();
        
      }

   function populateStorage(){
        localStorage.setItem("h2", teddyName.textContent);
        localStorage.setItem("p", teddyPrice.textContent);
        localStorage.setItem("colors", teddyColor.value);

        setColor();
        
   } 
  
   function setColor(){
       let currentColor = localStorage.getItem("colors");
       document.getElementById("colors").value = currentColor;
   }
   
   teddyColor.onchange = populateStorage;
   */
    // Fin test localStorage

    

};










