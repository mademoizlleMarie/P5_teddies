import {API} from './config.js'

const API_URL = `${API._HOST + API._DIR + API._CATEGORY}`;

// recherche d'un produit
function getProduit(id) {
    return new Promise((resolve,reject)=>{
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            }else if(this.readyState == XMLHttpRequest.DONE && this.status != 200 ){
                reject(this.responseText);
                console.log((this.responseText))
            }
        };
        request.open("GET",API_URL+'/'+id);
        request.send();
    })
}

async function chargementPanier() {
    // Récupérer des données depuis sessionStorage
    var data = JSON.parse(sessionStorage.getItem('panier'));
    // verifie que le panier n'est pas vide
    if (data !== "") {
            let listeProduit = [];
            for (var idProduit of data) {
                var produit = listeProduit.find(produit => produit.id == idProduit);
                if (produit === undefined) {
                    await getProduit(idProduit).then((produit) => {
                        listeProduit.push({
                            id: produit._id,
                            image: produit.imageUrl,
                            nom: produit.name,
                            prixUnitaire: produit.price / 100,
                            prixTotal : produit.price / 100,
                            quantite: 1
                        });
                    });
                } else {
                    produit.quantite++;
                    produit.prixTotal = produit.quantite * produit.prixUnitaire ;
                }

            }
            let prixTotalProduit = [];
            for (let produit of listeProduit) {
                prixTotalProduit.push(produit.prixTotal);
               var prixPanier = prixTotalProduit.reduce((accumulator, currentValue) => accumulator + currentValue);
                afficheProduitPanier(produit);

            }
            affiche(prixPanier);
    } else {
        reject(data);
    }
}
chargementPanier();

function affiche(prixPanier){
    console.log(prixPanier)
    let tbody= document.getElementById('bodyPanier');

    let trF = document.createElement("tr");

    let tdF = document.createElement("td");
    tdF.setAttribute("colspan", "5");
    tdF.setAttribute("class", "prixTotalPanier");
    tdF.innerHTML = "Le prix total est de " + prixPanier + "€";

    trF.append(tdF)
    tbody.append(trF)
}
function afficheProduitPanier(produit){
    var tbody = document.getElementById('bodyPanier');

    var trB = document.createElement("tr");

    var tdImg = document.createElement("td");

    var img = document.createElement("img");
    img.setAttribute("class", "imgPanier");
    img.setAttribute("src", produit.image);
    tdImg.append(img);
    trB.append(tdImg);

    var tdNom = document.createElement("td");
    tdNom.innerHTML = produit.nom;
    trB.append(tdNom);

    var tdQte = document.createElement("td");
    tdQte.innerHTML = produit.quantite;
    trB.append(tdQte);

    var tdPrixU = document.createElement("td");
    tdPrixU.innerHTML = produit.prixUnitaire + "€";
    trB.append(tdPrixU);

    var tdPrixT = document.createElement("td");
    tdPrixT.innerHTML = produit.prixTotal + "€";
    trB.append(tdPrixT);

    tbody.append(trB);
}

