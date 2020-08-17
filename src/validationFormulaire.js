import {API} from './config.js'

const API_URL = `${API._HOST + API._DIR + API._CATEGORY}`;

export function validationFormulaire() {

    var regex = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    var regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
    var regexCP = /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/;

    var formValid = document.getElementById('boutton_envoi');

    var nom = document.getElementById('nom');
    var nomValid = regex;

    var prenom = document.getElementById('prenom');
    var prenomValid = regex;

    var inputEmail = document.getElementById('inputEmail');
    var inputEmailValid = regexEmail;

    var Adresse = document.getElementById('Adresse');

    var CP = document.getElementById('CP');
    var CPValid = regexCP;

    var ville = document.getElementById('ville');
    var villeValid = regex;

    formValid.addEventListener('click', validation);

    function validation(event) {

        var error = false;
        //Nom
        if (nom.validity.valueMissing) {
            error = true;
            nom.setCustomValidity('Nom manquant');
            nom.checkValidity();
        } else if (nomValid.test(nom.value) === false) {
            error = true;
            nom.setCustomValidity('Format incorrect');
            nom.checkValidity();
        }
        //Prenom
        if (prenom.validity.valueMissing) {
            error = true;
            prenom.setCustomValidity('Prénom manquant');
            prenom.checkValidity();

        } else if (prenomValid.test(prenom.value) === false) {
            error = true;
            prenom.setCustomValidity('Format incorrect');
            prenom.checkValidity();
        }

        //Email
        if (inputEmail.validity.valueMissing) {
            error = true;
            inputEmail.setCustomValidity('Email manquant');
            inputEmail.checkValidity();
        } else if (inputEmailValid.test(inputEmail.value) === false) {
            error = true;
            inputEmail.setCustomValidity('Format incorrect');
            inputEmail.checkValidity();
        }

        //Adresse
        if (Adresse.validity.valueMissing) {
            error = true;
            Adresse.setCustomValidity('Adresse manquante');
            Adresse.checkValidity();
        }

        //Code postal
        if (CP.validity.valueMissing) {
            error = true;
            CP.setCustomValidity('Code postal manquant');
            CP.checkValidity();
        } else if (CPValid.test(CP.value) === false) {
            error = true;
            CP.setCustomValidity('Format incorrect');
            CP.checkValidity();
        }

        //Ville
        if (ville.validity.valueMissing) {
            error = true;
            ville.setCustomValidity('Ville manquante');
            ville.checkValidity();
        } else if (villeValid.test(ville.value) === false) {
            error = true;
            ville.setCustomValidity('Format incorrect');
            ville.checkValidity();
        }

        // finir coordonnées bancaire



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
                    if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                        resolve(JSON.parse(this.responseText));
                    } else if (this.readyState == XMLHttpRequest.DONE && this.status != 201) {
                        reject(this.responseText);
                    }
                };
                request.open("POST", API_URL + '/order');
                request.setRequestHeader('Content-Type','application/json');
                request.send(JSON.stringify(panier));
                //request.send(data);
            });
            envoiPanier.then((result) => {
                console.log(result);

                sessionStorage.clear();
                    if(sessionStorage.getItem("validation") == null){

                        sessionStorage.setItem("validation", JSON.stringify([]));
                    }
                    var validation = JSON.parse(sessionStorage.getItem("validation"));

                    panier.push(result);
                    sessionStorage.setItem("validation",JSON.stringify(validation));
              //  window.location = "confirmation.html";
            });
            envoiPanier.catch((reject) => {
                console.log(reject);
            });
        }
    }
}
validationFormulaire();
