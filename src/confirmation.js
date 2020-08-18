


async function afficheConfirmation() {
    // Récupérer des données depuis sessionStorage
    var data = JSON.parse(sessionStorage.getItem('validation'));
    // verifie que le panier n'est pas vide
    if (data !== null) {
        console.log(data);
        let span = document.getElementById('Confirmation');
        let p = document.createElement("p");
        p.innerHTML = "Le prix total de vote commande est de "+ data[0] +". ";

        span.append(p)

    }
}
afficheConfirmation();