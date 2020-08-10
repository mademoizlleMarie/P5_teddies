import {API} from './config.js'

const API_URL = `${API._HOST + API._DIR + API._CATEGORY}/`;

var url = new URL(window.location);
var id = url.searchParams.get("id");

function getProduit(id){
    return new Promise((resolve,reject)=>{
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            }else if(this.readyState == XMLHttpRequest.DONE && this.status != 200 ){
                reject(this.responseText);
            }
        };
        request.open("GET",API_URL+id);
        request.send();
    });
}

getProduit(id).then((result)=>{
    showProduit(result);
});
getProduit(id).catch((result)=>{
});

function showProduit(produit) {
        let elt = document.getElementById('produit');

        var card = document.createElement("div");
        card.setAttribute("class", "card");

        var img = document.createElement("img");
        img.setAttribute("class", "card-img-top");
        img.setAttribute("src", produit.imageUrl);

        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        var title = document.createElement("h5");
        title.setAttribute("class", "card-title");
        title.innerHTML = produit.name;
        cardBody.append(title);

        var textDescription = document.createElement("p");
        textDescription.setAttribute("class", "card-text");
        textDescription.innerHTML = produit.description;
        cardBody.append(textDescription);

        var select = document.createElement("select");
        select.setAttribute("class", "custom-select");

        var optionDefault = document.createElement("option");
        optionDefault.innerHTML = "Selectionnez la couleur de " + produit.name ;
        select.append(optionDefault);
        for ( let color of produit.colors) {
            var option = document.createElement("option");
            option.innerHTML = color;
            select.append(option);
        }
        cardBody.append(select);

        var lienProduit = document.createElement("button");
        lienProduit.addEventListener('click',function (){
            addToBasket(produit._id);
        });
        lienProduit.setAttribute("class", "btn btn-outline-success");
        lienProduit.innerHTML = "Adopter "+ produit.name +" pour "+ produit.price / 100 + " €";
        cardBody.append(lienProduit);

        card.append(img);
        card.append(cardBody);
        elt.append(card);
}

function addToBasket(id) {
    if(sessionStorage.getItem("panier") == null){

        sessionStorage.setItem("panier", JSON.stringify([]));
    }
    var panier = JSON.parse(sessionStorage.getItem("panier"));

    panier.push(id);
    sessionStorage.setItem("panier",JSON.stringify(panier));
    window.location = "panier.html";
}