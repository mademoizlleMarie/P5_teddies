import {API} from './config.js'

const API_URL = `${API._HOST + API._DIR + API._CATEGORY}`;

export function validationFormulaire() {
    /*
    *  https://www.pierre-giraud.com/javascript-apprendre-coder-cours/validation-formulaire/
    */
    var regex = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    var regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
    var regexCP = /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/;

    var formValid = document.getElementById('boutton_envoi');

    var nom = document.getElementById('nom');
    var nomVide = document.getElementById('nomVide');
    var nomValid = regex;

    var prenom = document.getElementById('prenom');
    var prenomVide = document.getElementById('prenomVide');
    var prenomValid = regex;

    var inputEmail = document.getElementById('inputEmail');
    var inputEmailVide = document.getElementById('inputEmailVide');
    var inputEmailValid = regexEmail;

    var Adresse = document.getElementById('Adresse');
    var AdresseVide = document.getElementById('AdresseVide');

    var CP = document.getElementById('CP');
    var CPVide = document.getElementById('CPVide');
    var CPValid = regexCP;

    var ville = document.getElementById('ville');
    var villeVide = document.getElementById('villeVide');
    var villeValid = regex;

    formValid.addEventListener('click', validation);

    function validation(event) {
        //event.preventDefault();
        var error = false;
        //Nom
        if (nom.validity.valueMissing) {

            event.preventDefault();
            nomVide.textContent = 'Nom manquant';
            nomVide.style.color = 'red';
        } else if (nomValid.test(nom.value) === false) {
            event.preventDefault();
            nomVide.textContent = 'Format incorrect';
            nomVide.style.color = 'orange';
        } else {
            nomVide.textContent = '';
           // nomm = true;
        }
        //Prenom
        if (prenom.validity.valueMissing) {
            event.preventDefault();
            prenomVide.textContent = 'Prénom manquant';
            prenomVide.style.color = 'red';
        } else if (prenomValid.test(prenom.value) === false) {
            event.preventDefault();
            prenomVide.textContent = 'Format incorrect';
            prenomVide.style.color = 'orange';
        } else {
            prenomVide.textContent = '';
           // prenomm = true;
        }
        //Email
        if (inputEmail.validity.valueMissing) {
            event.preventDefault();
            inputEmailVide.textContent = 'Email manquant';
            inputEmailVide.style.color = 'red';
        } else if (inputEmailValid.test(inputEmail.value) === false) {
            event.preventDefault();
            inputEmailVide.textContent = 'Format incorrect';
            inputEmailVide.style.color = 'orange';
        } else {
            inputEmailVide.textContent = '';
           // inputEmailm = true;
        }
        //Adresse
        if (Adresse.validity.valueMissing) {
            event.preventDefault();
            AdresseVide.textContent = 'Adresse manquante';
            AdresseVide.style.color = 'red';
        } else {
            AdresseVide.textContent = '';
          //  Adressem = true;
        }
        //Code postal
        if (CP.validity.valueMissing) {
            event.preventDefault();
            CPVide.textContent = 'Code postal manquant';
            CPVide.style.color = 'red';
        } else if (CPValid.test(CP.value) === false) {
            event.preventDefault();
            CPVide.textContent = 'Format incorrect';
            CPVide.style.color = 'orange';
        } else {
            CPVide.textContent = '';
          //  CPm = true;
        }

        //Ville
        if (ville.validity.valueMissing) {
            // event.preventDefault();
            // villeVide.textContent = 'Ville manquante';
            // villeVide.style.color = 'red';
            error = true;
            ville.setCustomValidity('Ville manquante');
            ville.checkValidity();
        } else if (villeValid.test(ville.value) === false) {
            error = true;
            ville.setCustomValidity('Format incorrect');
            event.preventDefault();
            villeVide.textContent = 'Format incorrect';
            villeVide.style.color = 'orange';
        } else {
            villeVide.textContent = '';
          //  villem = true;
        }

        // finir coordonnées bancaire

        //if(!error){}

        if (!error) {
            event.preventDefault();
          /*  var data = new FormData();
            data.append("contact",JSON.stringify({
                "firstName": nom.value,
                "lastName": prenom.value,
                "address": Adresse.value,
                "city": ville.value,
                "email": inputEmail.value}));
            data.append("products",sessionStorage.getItem('panier'));*/
            var panier =
                {
                    "contact": {
                        "firstName": nom.value,
                        "lastName": prenom.value,
                        "address": Adresse.value,
                        "city": ville.value,
                        "email": inputEmail.value
                    },
                    "products": JSON.parse(sessionStorage.getItem('panier'))
                }

            var envoiPanier = new Promise((resolve, reject) => {
                var request = new XMLHttpRequest();

                request.onreadystatechange = function () {
                    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                        resolve(JSON.parse(this.responseText));
                    } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
                        reject(this.responseText);
                    }
                };
                request.open("POST", API_URL + '/order');
                request.setRequestHeader('Content-Type','application/json');
                request.send(JSON.stringify(panier));
                //request.send(data);
            });

            envoiPanier.then((result) => {
                console.log("c'est bon")
            });

        }

    }
}
validationFormulaire();
