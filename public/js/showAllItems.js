
    fetch("http://localhost:3000/api/teddies") // get data from API
    .then((res) => {
        if(res.ok){
            return res.json(); // get response in JSON
            
        } else {
            throw new Error("Problème de serveur")
        }
    })    
    .then((data) => {
        showAllItems(data);  // invoke function 
    })

function showAllItems(data) {
    let listItem = document.getElementById("catalogue"); // target where in HTML page we want to insert items
    for (let i = 0; i < data.length; i++) { // get every object in our list of JSON object
        
        let linkToTeddy = document.createElement("a"); //create a new link element 
        let figure = document.createElement("figure"); // create a new figure element
        let teddyCaption = document.createElement("img"); // create a new image element
        let teddyName = document.createElement("figcaption"); // create a new figcaption element
        let teddyPrice = document.createElement("b"); // create a new b element 

        linkToTeddy.href = "../../public/pages/produit.html"+"?id="+data[i]._id ;  // on hover, show produits's page and id. Added ?id= for query parameter  
        teddyCaption.src = data[i].imageUrl; // fill img created element with imageUrl
        teddyName.innerHTML = data[i].name; // fill the figcaption created element with name 
        teddyPrice.innerHTML = data[i].price / 100 +" euros"; // fill the b created element with price

        listItem.appendChild(linkToTeddy); // add clickable link a to catalogue ID
        linkToTeddy.appendChild(figure); // add figure in a 
        figure.appendChild(teddyCaption); // add img to clickable link a and figure 
        figure.appendChild(teddyName); // add figcaption to figure
        figure.appendChild(teddyPrice); // add price to figure

    }
  }














