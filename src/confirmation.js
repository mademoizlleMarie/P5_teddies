
async function afficheConfirmation() {

    var validation = JSON.parse(sessionStorage.getItem('validation'));
    var orderId = validation[0].orderId;
    var totalPrixPanier = JSON.parse(sessionStorage.getItem('totalPrixPanier'))[0];

        let span = document.getElementById('Confirmation');

        let p = document.createElement("p");
        p.innerHTML = "Le prix total de votre commande est de "+ totalPrixPanier +" €. ";
        span.append(p)

        let p2 = document.createElement("p");
        p2.innerHTML = "Le numéro de votre commande est le "+ orderId +" . ";
        span.append(p2)
}
afficheConfirmation();

var RetourAccueil = document.getElementById("RetourAccueil");
RetourAccueil.addEventListener("click",sessionStorage.clear())