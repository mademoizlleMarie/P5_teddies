import {API} from './config.js'

const API_URL = `${API._HOST + API._DIR + API._CATEGORY}`;

// Récupérer des données depuis sessionStorage
var data = sessionStorage.getItem('panier');
console.log(data);

var getAllProduit = new Promise((resolve,reject)=>{
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            resolve(JSON.parse(this.responseText));
        }else if(this.readyState == XMLHttpRequest.DONE && his.status != 200 ){
            reject(this.responseText);
        }
    };
    request.open("GET",API_URL);
    request.send();
});

getAllProduit.then((result)=>{
    showPanier();
});
getAllProduit.catch((result)=>{
});

function getProduit(e) {
console.log(e);
    var getProduit = new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            } else if (this.readyState == XMLHttpRequest.DONE && his.status != 200) {
                reject(this.responseText);
            }
        };
        request.open("GET", API_URL);
        request.send();
    });

    getProduit.then((result) => {

    });
    getProduit.catch((result) => {
    });
}
function showPanier(listeProduit) {

    let elt = document.getElementById('Panier');

    var table = document.createElement("table");

    var thead = document.createElement("thead");

    var tr = document.createElement("tr");

    var thImg = document.createElement("th");
    thImg.innerHTML = "image";
    tr.append(thImg);

    var thNom = document.createElement("th");
    thNom.innerHTML = "Nom";
    tr.append(thNom);

    var thQte = document.createElement("th");
    thQte.innerHTML = "Quantité";
    tr.append(thQte);

    var thPrix = document.createElement("th");
    thPrix.innerHTML = "Prix";
    tr.append(thPrix);

    var tbody = document.createElement("tbody");
    data.forEach( data => getProduit(data));
        
        var trB = document.createElement("tr");

        var tdImg = document.createElement("td");
        tdImg.innerHTML = "image";
        trB.append(tdImg);

        var tdNom = document.createElement("td");
        tdNom.innerHTML = "Nom";
        trB.append(tdNom);

        var tdQte = document.createElement("td");
        tdQte.innerHTML = "Quantité";
        trB.append(tdQte);

        var tdPrix = document.createElement("td");
        tdPrix.innerHTML = "Prix";
        trB.append(tdPrix);

        tbody.append(trB);
);
    thead.append(tr);
    table.append(thead);
    table.append(tbody);
    elt.append(table);
}
