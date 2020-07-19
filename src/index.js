import {API} from './config.js'

const API_URL = `${API._HOST + API._DIR + API._CATEGORY}`;

async function retrieveContent() {


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

    const response = await fetch(API_URL);
    return response.json();
}

async function showContent() {
    try {
        const listeProduit = await retrieveContent();
        console.log(listeProduit);
        let elt = document.getElementById('card');
        for ( let produit of listeProduit) {
            var card = document.createElement("div");
            card.setAttribute("class", "card");

            var img = document.createElement("img");
            img.setAttribute("class", "card-img-top");
            img.setAttribute("src", produit.imageUrl);

            var cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");

            var title = document.createElement("h5");
            title.setAttribute("class", "card-title");
            title.innerHTML = "Adoptez "+ produit.name;
            cardBody.append(title);

            var textDescription = document.createElement("p");
            textDescription.setAttribute("class", "card-text");
            textDescription.innerHTML = produit.description;
            cardBody.append(textDescription);

            var textPrix = document.createElement("p");
            textPrix.setAttribute("class", "card-text prix");
            textPrix.innerHTML = " Prix tout doux de : "+produit.price / 100 + " €";
            cardBody.append(textPrix);

            var lienProduit = document.createElement("a");
            lienProduit.setAttribute("class", "btn btn-outline-success");
            lienProduit.setAttribute("href", "produit.html?id=" + produit._id);
            lienProduit.innerHTML = "Plus de détail sur " + produit.name;
            cardBody.append(lienProduit);

            card.append(img);
            card.append(cardBody);
            elt.append(card);

        }
    } catch (e) {
        console.log('Error', e);
    }
}

async function Carousel() {
    try {
        const listeProduit = await retrieveContent();
        let elt = document.getElementById('carousel');

        var inner = document.createElement("div");
        inner.setAttribute("class", "carousel-inner");

        var active = document.createElement("div");
        active.setAttribute("class", "carousel-item active");

        var imgActive = document.createElement("img");
        imgActive.setAttribute("class", "d-block ");
        imgActive.setAttribute("src", listeProduit[0].imageUrl);

        imgActive.setAttribute("alt", "First slide");
        active.append(imgActive);

        var item1 = document.createElement("div");
        item1.setAttribute("class", "carousel-item");

        var imgItem1 = document.createElement("img");
        imgItem1.setAttribute("class", "d-block ");
        imgItem1.setAttribute("src", listeProduit[1].imageUrl);
        imgItem1.setAttribute("alt", "First slide");
        item1.append(imgItem1);

        var item2 = document.createElement("div");
        item2.setAttribute("class", "carousel-item");

        var imgItem2 = document.createElement("img");
        imgItem2.setAttribute("class", "d-block ");
        imgItem2.setAttribute("src", listeProduit[2].imageUrl);
        imgItem2.setAttribute("alt", "First slide");
        item2.append(imgItem2);

        var item3 = document.createElement("div");
        item3.setAttribute("class", "carousel-item");

        var imgItem3 = document.createElement("img");
        imgItem3.setAttribute("class", "d-block ");
        imgItem3.setAttribute("src", listeProduit[3].imageUrl);
        imgItem3.setAttribute("alt", "First slide");
        item3.append(imgItem3);

        var item4 = document.createElement("div");
        item4.setAttribute("class", "carousel-item");

        var imgItem4 = document.createElement("img");
        imgItem4.setAttribute("class", "d-block ");
        imgItem4.setAttribute("src", listeProduit[4].imageUrl);
        imgItem4.setAttribute("alt", "First slide");
        item4.append(imgItem4);

        inner.append(active);
        inner.append(item1);
        inner.append(item2);
        inner.append(item3);
        inner.append(item4);
        elt.append(inner);


    } catch (e) {
        console.log('Error', e);
    }
}

showContent();
Carousel();


