
// Function display confirmation with user name, order id and total price set in key confirmation in localstorage

function displayConfirmation(){
    let myMessage = document.getElementById("confirmation");
    let showConfirmation = JSON.parse(localStorage.getItem("confirmation"));
    
        let myName = document.createElement("h2");
        let orderId = document.createElement("p");
        let totalPrice = document.createElement("b");
        let myCondition = document.createElement("p");
        let homePageLink = document.createElement("a");
        let homePageBtn = document.createElement("button");
    
        myName.innerHTML = showConfirmation.name+",";
        orderId.innerHTML = "Nous sommes ravis que vous ayez trouvé votre bonheur et confirmons l'enregistrement de votre commande n° "+showConfirmation.id
        +" pour un montant total de ";
        totalPrice.innerHTML = showConfirmation.price;
        totalPrice.style.fontWeight = 600;
        myCondition.innerHTML = "Vous allez recevoir d'ici peu un email de confirmation de commande. Prochaine étape? L'expédition de votre commande! Vous recevrez un email de notre part pour vous prévenir qu'elle est en route."
        homePageLink.href = ("../index.html")
        homePageBtn.innerHTML = "Retour à la page d'accueil";

        myMessage.append(myName)
        myMessage.append(orderId);
        orderId.appendChild(totalPrice);
        myMessage.appendChild(myCondition);
        myMessage.appendChild(homePageLink);
        homePageLink.appendChild(homePageBtn);
}

displayConfirmation();

// Set to zero the basket in local storage by deleting cart 

function deleteItem (){
         localStorage.removeItem("cart")  
}

deleteItem()




