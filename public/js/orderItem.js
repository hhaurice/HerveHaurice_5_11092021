fetch("http://localhost:3000/api/teddies/") // fetch API with id to return teddy given id. Ex: in the API, Norbert is http://localhost:3000/api/teddies/5be9c8541c9d440000665243
.then((res) => {
    if(res.ok){
        return res.json(); // get response in JSON
        
    } else {
        throw new Error("Problème de serveur");
    }
})    
.then((data) => {
    showSelectedItems(data);     
})   

// Function showSelectedItem will display the items added in localstorage in a section in the html document

function showSelectedItems(data) {

    let itemInCart = document.getElementById("cart");

    let showItem = JSON.parse(localStorage.getItem("cart")); // store localstorage in showItem variable

    if(showItem == null) {   
        let emptyCartMessage = document.createElement("p");
        itemInCart.appendChild(emptyCartMessage);
        emptyCartMessage.textContent = "Votre panier est vide"; // Display this message if localstorage is null

    } else {
        
        for (let i in showItem) { //will create figure that contains product info and add it to html document if showItem is true

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
  
            itemInCart.appendChild(figure)
            figure.appendChild(productCaption);
            figure.appendChild(productSection);
            productSection.appendChild(productName);
            productSection.appendChild(productColor)
            productSection.appendChild(productPrice);
        }
        
        // Function deleteItem will remove cart in localStorage, remove the DOM created elements if cart is true and set everything to zero

        function deleteItem (){

            let removeBtn = document.getElementById("empty_btn");

            removeBtn.addEventListener("click", function(){ 

            localStorage.removeItem("cart");  // onclick, remove cart from localstorage
        
            itemInCart.remove(data); // remove html created document itemInCart
        
            location.reload(); // reload page so that we can get all values initialized to null

            })    
        }
        
        deleteItem()

    }   
};


// Function updateCartandOrder will display dynamically the number of items in cart and update "Nombre d'article" of the html document

function updateCartandOrder () {
    
    let cart = document.querySelectorAll("i"); // target fontawesome element
    let cartCount = document.createElement("span"); // create span
    cart[0].appendChild(cartCount); // add span to html
    
    let numberOfItems = document.getElementById("numberOfItems"); // target id in html
    let totalItem = document.createElement("span"); // create span element 
    numberOfItems.appendChild(totalItem); // add span to html
    
    if (localStorage.getItem('cart') == null) { // display 0 in both cart and totalItem in html if cart is null
        totalItem.textContent = 0;
        cartCount.textContent = 0;
        
    } else { // display cart length if there is a value in localstorage
        totalItem.textContent = JSON.parse(localStorage.getItem('cart')).length; // fill it with my local storage length
        cartCount.textContent = JSON.parse(localStorage.getItem('cart')).length; // fill it with my local 
    }
};

updateCartandOrder();

//function updatePrice will update the total price any time there is an article added to cart by getting its value in localstorage and adding it to "total" of html document

function updatePrice() {

    let totalPrice = document.getElementById("totalPrice"); // target totalPrice id in html
    let total = document.createElement("span"); // create span element
    totalPrice.appendChild(total); // add span to html document

    let showPrice = JSON.parse(localStorage.getItem("cart")); // put localstorage in a variable

    if(showPrice == null) {
        total.textContent = 0; // display zero if null in localstorage

    } else {
        let sum = 0; // initiliaze sum to zero

        for(let i = 0; i < showPrice.length; i++) { // loop through array of object in localstorage

            let price = showPrice[i].price / 100; // use dot notation .price to get the value the array showpPrice[i] in localstorage and put it in a variable price. Divide it by 100.
            sum+=price; // add the value of price in variable sum every time we add an item in localstorage and get its price
        
            total.textContent = sum.toFixed(2)+" €"; // update total in html document and add toFixed(2) so that it adds .00 to sum
        }
    }
};

updatePrice();

// Function sendOrder will send the data of products as an array and contact as an object that are the values of the form, using fetch post method

function sendOrder () {

    const myForm = document.getElementById("form");

    myForm.addEventListener("submit", function(e){
        
        e.preventDefault();

        // Create object of contact that target the id put in the form of html document and their value
        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value
        };
    
        let allProducts = JSON.parse(localStorage.getItem("cart")); // put localstorage in variable
       
        let products = []; // Create a variable that contains an array that will store the products of local storage
        
        // Create a forEach function that will push localStorage value to array(products)
        allProducts.forEach(product => {
            products.push(product.id) // use dot notation to only get product id and put it in products
        });
    
        // Fetch post method to send data to API
        fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },  

            body: JSON.stringify({contact, products}) // two variables are sent to API
        
        }).then(res => {
            
            return res.json();
        
        }).then(res => { 
        // With the response, we create a key in localStorage that will store the data needed to display a confirmation message that we will be displayed on confirmation page

        let myConfirmation = JSON.parse(localStorage.getItem("myConfirmation")) || [] // create a variable that contains an array that we will in our localstorage
        // Create object that will be the value of MyConfirmation
        let confirmation = {
            name: res.contact.lastName, // use dot notation to get lastName of contact
            price: document.querySelectorAll("span")[2].innerText, // use index 2 of array of span to access to the totalPrice in html
            id: res.orderId,
        }
        
        myConfirmation.push(confirmation); // push data in array
        localStorage.setItem("confirmation", JSON.stringify(confirmation)); // Set it to localStorage
        window.location.replace("../pages/confirmation.html")  // open a new window with our confirmation page
        })
    })
};

sendOrder();










