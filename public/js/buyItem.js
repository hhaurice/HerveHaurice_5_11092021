
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
    buyItem(data);  // invoke function 
    updateCart(data)

})

// Show product info

function buyItem(data) {

    // Show product info by creating dynamically DOM elements

    let product = document.getElementById('produit');

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


addToCart(data);

};


    // Add to cart

        function addToCart(data) {
        let addToCart = document.getElementsByTagName("button");
        let selectElem = document.getElementById('colors');
                
        for (let i = 0; i < addToCart.length; i++) { // Loop enables to get value of HTML created DOM element since it is an array
            addToCart[i].addEventListener("click", function(event){ // click event
        
        let cart = JSON.parse(localStorage.getItem("cart")) || [] 

            let teddy = {
                name: data.name,
                price: data.price,
                color: data.colors,
                caption: data.imageUrl,
                id: data._id            
            }

            teddy.color = selectElem.value; // Get value from <select id= "colors">


            cart.push(teddy) // push data in array
            localStorage.setItem("cart", JSON.stringify(cart)) 

            alert("Article enregistré dans le panier")
            updateCart(data)

            })         
        }  
    }


    function updateCart(data) {
        let numberOfItems = document.querySelectorAll("i"); // target element
        let cartCount = document.createElement("span"); // create span element 
        numberOfItems[0].appendChild(cartCount); // update it with my local storage
        if (localStorage.getItem('cart') == null) {
            cartCount.textContent = 0;
        } else {
            cartCount.textContent = JSON.parse(localStorage.getItem('cart')).length; // fill it with my local storage length
        }

    }




