import {getProduit} from './function.js'

function affichePrixTotalPanier(prixPanier){

    let tbody= document.getElementById('bodyPanier');

    let tr = document.createElement("tr");

    let td = document.createElement("td");
    td.setAttribute("colspan", "5");
    td.setAttribute("class", "prixTotalPanier");
    td.innerHTML = "Le prix total de votre panier est de " + prixPanier + "€";

    tr.append(td)
    tbody.append(tr)
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
function affichePanierVide(){
    let tbody= document.getElementById('bodyPanier');

    let tr = document.createElement("tr");

    let td= document.createElement("td");
    td.setAttribute("colspan", "5");
    td.innerHTML = "Votre panier est vide";

    tr.append(td)
    tbody.append(tr)
}

//création du panier avec mise à jour de la quantité et du prix total par ligne et pour le panier complet
async function chargementPanier() {
    // Récupérer des données depuis sessionStorage
    var data = JSON.parse(sessionStorage.getItem('panier'));
    // verifie que le panier n'est pas vide
    if (data !== null) {
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
        affichePrixTotalPanier(prixPanier);
        if(sessionStorage.getItem("totalPrixPanier") == null){
            sessionStorage.setItem("totalPrixPanier", JSON.stringify([]));
        }
        sessionStorage.setItem("totalPrixPanier", JSON.stringify([prixPanier]));
    } else {
        affichePanierVide();
    }
}
chargementPanier();