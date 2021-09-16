
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
    let selectColor = document.createElement("select"); 
    let colorOption = document.createElement("option"); 
    let productPrice = document.createElement("p");
    let productDescription = document.createElement("p");
    let addtoBasketBtn = document.createElement("button");

    productCaption.src = data.imageUrl; 
    productName.innerHTML = data.name;
    colorOption.text = "--Choisissez une couleur--";
    productPrice.innerHTML = data.price / 100 +" euros";
    productDescription.innerHTML = data.description;
    addtoBasketBtn.innerHTML = "Ajoutez au panier";

    product.appendChild(productCaption);
    product.appendChild(productSection);
    productSection.appendChild(productName);
    selectColor.appendChild(colorOption);
    productSection.appendChild(selectColor);
    //add a drop down list that creates value option in select element according to the array values in data.colors
    for(let i = 0; i < data.colors.length; i++) {
        let option = document.createElement("option");
        option.value = data.colors[i];
        option.text = data.colors[i];
        selectColor.appendChild(option);
    }
    productSection.appendChild(productPrice).style.fontWeight="900";
    productSection.appendChild(productDescription);
    productSection.appendChild(addtoBasketBtn)
    }








