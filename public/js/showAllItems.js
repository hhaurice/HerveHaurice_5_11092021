"use strict";

fetch("http://localhost:3000/api/teddies") // get data from API

.then((res) => { 

    if(res.ok){
        return res.json(); // get response in JSON   

    } else {
        throw new Error("Problème de serveur");
    }
})    
.then((data) => {

    showItems(data);  // invoke function 

});

// function showItems display all items from the API in the HTML document that we create dynamically if the response from server is ok

function showItems(data) {

    const listItem = document.getElementById("catalogue"); // target where in HTML page we want to insert items
    const teddySection = document.createElement("section"); // create a new section element

    for (let i = 0; i < data.length; i++) { // get every object in our list of JSON object
        
        const linkToTeddy = document.createElement("a"); //create a new link element 
        const figure = document.createElement("figure"); // create a new figure element
        const teddyCaption = document.createElement("img"); // create a new image element
        const teddyName = document.createElement("figcaption"); // create a new figcaption element
        const teddyPrice = document.createElement("b"); // create a new b element 

        linkToTeddy.href = "../../public/pages/produit.html"+"?id="+data[i]._id ;  // on hover, show product's page and id. Added ?id= for query parameter, on click leads to product's page 
        teddyCaption.src = data[i].imageUrl; // fill img created element with imageUrl
        teddyName.innerHTML = data[i].name; // fill the figcaption created element with name 
        teddyPrice.innerHTML = data[i].price / 100 +" euros"; // fill the b created element with price

        listItem.appendChild(teddySection); // add section to catalogue
        teddySection.appendChild(linkToTeddy); // add clickable link a section
        linkToTeddy.appendChild(figure); // add figure in a 
        figure.appendChild(teddyCaption); // add img to clickable link a and figure 
        figure.appendChild(teddyName); // add figcaption to figure
        figure.appendChild(teddyPrice); // add price to figure
    }
}

// Function updateCart will display the number of items in the cart icon if "cart"is true in localStorage

function updateCart() {

    const numberOfItems = document.querySelectorAll("i"); // target fontawesome element
    let cartCount = document.createElement("span"); // create span element 
    numberOfItems[0].appendChild(cartCount); // add span to html document
     
     if (localStorage.getItem("cart") == null) {
        cartCount.textContent = 0; // Display 0 in cart if localstorage is null

    } else {
        cartCount.textContent = JSON.parse(localStorage.getItem("cart")).length; // fill it with local storage length
    }    
}

updateCart();
