async function retrieveContent() {
    const url = "http://localhost:3000/api/teddies"

    /* //On crée un objet XMLHttpRequest
      let xhr = new XMLHttpRequest()  /*
  //On initialise notre requête avec open()
      xhr.open("GET", url);

  //On veut une réponse au format JSON
      xhr.responseType = "json";

  //On envoie la requête
      xhr.send();

  //Dès que la réponse est reçue...
      xhr.onload = function () {
          //Si le statut HTTP n'est pas 200...
          if (xhr.status != 200) {
              //...On affiche le statut et le message correspondant
              console.log("Erreur " + xhr.status + " : " + xhr.statusText);
              //Si le statut HTTP est 200, on affiche le nombre d'octets téléchargés et la réponse
          } else {
              console.log (xhr.response);
              return (xhr.response);
          }
      };
  //Si la requête n'a pas pu aboutir...
      xhr.onerror = function () {
          alert("La requête a échoué");
      };*/

    /*var request = new XMLHttpRequest();

   request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
        }
    };
    request.open("GET", url);
    request.send();
    console.log(request);*/

    const response = await fetch(url);
    console.log(response);

    return response.json();
}

async function showContent() {
    try {

        const listeProduit = await retrieveContent();
        console.log(listeProduit);
        let elt = document.getElementById('card');
        for ( let produit of listeProduit) {

            var card = document.createElement("div");
            card.setAttribute("class","card");

            var img = document.createElement("img");
            img.setAttribute("class","card-img-top");
            img.setAttribute("src",produit.imageUrl);

            var cardBody = document.createElement("div");
            cardBody.setAttribute("class","card-body");

            var title = document.createElement("h5");
            title.setAttribute("class","card-title");
            title.innerHTML = produit.name;
            cardBody.append(title);

            var textDescription = document.createElement("p");
            textDescription.setAttribute("class","card-text");
            textDescription.innerHTML = produit.description;
            cardBody.append(textDescription);

            var textPrix= document.createElement("p");
            textPrix.setAttribute("class","card-text");
            textPrix.innerHTML = produit.price/100;
            cardBody.append(textPrix);

            var lienProduit = document.createElement("a");
            lienProduit.setAttribute("class","btn btn-primary");
            lienProduit.setAttribute("href","produit.html?id=" + produit._id);
            lienProduit.innerHTML = "voir le produit";
            cardBody.append(lienProduit);

            card.append(img);
            card.append(cardBody);
            elt.append(card);

          /*  elt.innerHTML +=
                " <div  class=\"card\" style=\"width: 18rem;\">\n"+
                "  <img class=\"card-img-top\" src="+ produit[id].imageUrl +">\n" +
                "  <div class=\"card-body\">\n" +
                "    <h5 class=\"card-title\">" + produit[id].name + "</h5>\n" +
                "    <p class=\"card-text\">" + produit[id].description + " </p>\n" +
                "    <p class=\"card-text\">" + produit[id].price/100 + " €</p>\n" +
                "    <a href=\"#\" id='produit' class=\"btn btn-primary\">voir le produit</a>\n" +
                "  </div>\n"+
                "  </div>";*/
        }
       /* document.getElementsByTagName('body')[0].appendChild(elt);*/
    } catch (e) {
        console.log('Error', e);
    }
}

showContent();


