fetch("http://localhost:3000/api/teddies/") // fetch API with id to return teddy given id. Ex: in the API, Norbert is http://localhost:3000/api/teddies/5be9c8541c9d440000665243
.then((res) => {
    if(res.ok){
        return res.json(); // get response in JSON
        
    } else {
        throw new Error("Problème de serveur")
    }
})    
.then((data) => {

    showCart(data)
    updatePrice(data)
     
})   


function showCart(data) {
    let showCart = document.getElementById("cart");

    let showItem = JSON.parse(localStorage.getItem("cart"))
  
        for (let i = 0; i < data.length; i++) {
            let figure = document.createElement("figure"); 
            let productCaption = document.createElement("img");
            let productSection = document.createElement("figcaption");
            let productName = document.createElement("h2");
            let productColor = document.createElement("p")
            let productPrice = document.createElement("p");

            productCaption.src = showItem[i].caption; 
            productName.innerHTML = showItem[i].name;
            productColor.innerHTML = showItem[i].color;
            productPrice.innerHTML = showItem[i].price / 100 +" euros";
            
            showCart.appendChild(figure)
            figure.appendChild(productCaption);
            figure.appendChild(productSection);
            productSection.appendChild(productName);
            productSection.appendChild(productColor)
            productSection.appendChild(productPrice);

        }

        updatePrice(data)
}


// Display number of items in cart
let basket = document.querySelectorAll("i"); // target element
let basketCount = document.createElement("span");
basket[0].appendChild(basketCount);


let numberOfItems = document.getElementById("numberOfItems"); // Je cible
let cartCount = document.createElement("span"); // create span element 
numberOfItems.appendChild(cartCount); // update it with my local storage

cartCount.textContent = JSON.parse(localStorage.getItem('cart')).length; // fill it with my local storage length
basketCount.textContent = JSON.parse(localStorage.getItem('cart')).length; // fill it with my local 

function updatePrice(data) {
    let totalPrice = document.getElementById("totalPrice");
    let total = document.createElement("span");
    totalPrice.appendChild(total);
    let showPrice = JSON.parse(localStorage.getItem("cart"));
    let sum=0;
    for(let i=0; i < showPrice.length;i++) {
        let price = showPrice[i].price / 100;
        sum+=price;

    total.textContent = sum.toFixed(2)+" €";
    }
}

updatePrice()







