
    fetch("http://localhost:3000/api/teddies") // get data from API
    .then((res) => {
        if(res.ok){
            return res.json(); // get response in JSON
            
        } else {
            throw new Error("Problème de serveur")
        }
    })    
    .then((data) => {
        showTeddies(data);  // invoke function 
    })

function showTeddies(data) {
    let listItem = document.getElementById("catalogue"); // target where in HTML page we want to insert items
    for (let i = 0; i < data.length; i++) { // get every object in our list of JSON object
      let p = document.createElement("p"); // create a new p element
      let img = document.createElement("img"); // create a new image element
      p.innerHTML = data[i].name + " " +data[i].price / 100 +" euros"; // fill the p element with name and price
      img.src = data[i].imageUrl; // fill img element with imageUrl
      listItem.appendChild(img); // add it to catalogue ID
      listItem.appendChild(p);
    }
  }








