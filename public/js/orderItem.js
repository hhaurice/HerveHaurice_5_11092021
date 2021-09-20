fetch("http://localhost:3000/api/teddies/") // fetch API with id to return teddy given id. Ex: in the API, Norbert is http://localhost:3000/api/teddies/5be9c8541c9d440000665243
.then((res) => {
    if(res.ok){
        return res.json(); // get response in JSON
        
    } else {
        throw new Error("Problème de serveur")
    }
})    
.then((data) => {
    let showCart = document.getElementById("cart");

    if (localStorage.getItem('cart') != null) {
        let showItem = JSON.parse(localStorage.getItem("cart"))
        for (let i = 0; i < data.length; i++) {
            let productCaption = document.createElement("img");
            let productSection = document.createElement("section");
            let productName = document.createElement("h2");
            let productPrice = document.createElement("p");

            productCaption.src = showItem[i].caption; 
            productName.innerHTML = showItem[i].name;
            productPrice.innerHTML = showItem[i].price / 100 +" euros";
        
            showCart.appendChild(productCaption);
            showCart.appendChild(productSection);
            productSection.appendChild(productName);
            productSection.appendChild(productPrice);
        }
    } else {
        // A COMPLETER POUR UPDATER LES OURS EN PELUCHE DEJA DANS LE PANIER
    }    

})   





