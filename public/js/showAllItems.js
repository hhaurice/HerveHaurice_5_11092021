
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
        let a = document.createElement("a"); //create a new link element
        let figure = document.createElement("figure"); // create a new figure element
        let img = document.createElement("img"); // create a new image element
        let figcaption = document.createElement("figcaption"); // create a new p element
        figcaption.innerHTML = data[i].name + " " +data[i].price / 100 +" euros"; // fill the p element with name and price
        img.src = data[i].imageUrl; // fill img element with imageUrl
        a.href = "../pages/produit.html">+data[i]._id; // on hover, show produits's page and id. if true, show product details, if false, create page doesn't exist
        listItem.appendChild(a); // add clickable link a to catalogue ID
        a.appendChild(figure); // add figure in it
        figure.appendChild(img); // add img to clickable link a and figure 
        figure.appendChild(figcaption); // add figcaption to figure
    }
  }








