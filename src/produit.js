var url = new URL(window.location);
var id = url.searchParams.get("id");

async function getproduit()
{
    const url2 = "http://localhost:3000/api/teddies"
    const response = await fetch(url2+"/"+id);
    return response.json();
}

getproduit()

async function showProduit() {
    try {
        const produit = await getproduit();
        console.log(produit);
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

        var textPrix = document.createElement("p");
        textPrix.setAttribute("class", "card-text");
        textPrix.innerHTML = produit.price / 100 + " €";
        cardBody.append(textPrix);

        var lienProduit = document.createElement("a");
        lienProduit.setAttribute("class", "btn btn-primary");
        lienProduit.setAttribute("href", "produit.html?id=" + produit._id);
        lienProduit.innerHTML = "voir le produit";
        cardBody.append(lienProduit);

        card.append(img);
        card.append(cardBody);
        elt.append(card);

    } catch (e) {
        console.log('Error', e);
    }
}

showProduit();