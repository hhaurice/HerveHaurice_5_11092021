//Get ID from url
function getId() {
    let queryString = window.location.search; // get url after symbol ? for Norbert: ?id=5beaa8bf1c9d440000a57d94
    let id = queryString.replace("?id=", ""); // remove ?id=
   
    return id; // Rreturn only id number
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

    displayItem(data);  // invoke function 
    updateCart(data);

})

// Show product info
function displayItem(data) {
    // Show product info by creating dynamically DOM elements
    let product = document.getElementById("produit");

    let productCaption = document.createElement("img");
    let productSection = document.createElement("section");
    let productName = document.createElement("h2");
    let selectTitle = document.createElement("label");
    let selectColor = document.createElement("select"); 
    let productPrice = document.createElement("p");
    let productDescription = document.createElement("p");
    let addtoBasketBtn = document.createElement("button");

    // Fill DOM created elements with data
    productCaption.src = data.imageUrl; 
    productName.innerHTML = data.name;
    selectColor.id = "colors";
    selectTitle.innerHTML = "Choisissez une couleur: ";
    productPrice.innerHTML = data.price / 100 +" euros";
    productDescription.innerHTML = data.description;
    addtoBasketBtn.innerHTML = "Ajoutez au panier";

    // Add it to html document
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

    addToCart(data); // added function addtocart to that when user click on button it calls the function below

};

// Add to cart function

function addToCart(data) {
    let addToCart = document.getElementsByTagName("button");
    let selectElem = document.getElementById("colors");
            
    for (let i = 0; i < addToCart.length; i++) { // Loop enables to get value from the array button which is a HTML created DOM element 
        addToCart[i].addEventListener("click", function(event){ // click event
    
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // create an array for cart where we push data

    // create object
        let teddy = {
            name: data.name,
            price: data.price,
            color: data.colors,
            caption: data.imageUrl,
            id: data._id            
        };

        teddy.color = selectElem.value; // Get value from <select id= "colors">

        cart.push(teddy); // push data of object in array
        localStorage.setItem("cart", JSON.stringify(cart)); // Convert cart to add it to localstorage

        alert("Article enregistré dans le panier"); // display alert when item is added to cart 
        
        updateCart(data); // invoke updateCart if item is added to cart

        })      
    }  
};

function updateCart() {
    let numberOfItems = document.querySelectorAll("i"); // target fontawesome element

    let cartCount = document.createElement("span"); // create span element 

    numberOfItems[0].appendChild(cartCount); // add span to html document

    if (localStorage.getItem('cart') == null) {
        cartCount.textContent = 0; // Display 0 in cart if localstorage is null
    } else {
        cartCount.textContent = JSON.parse(localStorage.getItem('cart')).length; // fill it with my local storage length
    }
};