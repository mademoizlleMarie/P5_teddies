import {API} from './config.js'

const API_URL = `${API._HOST + API._DIR + API._CATEGORY}`;

export function validationFormulaire() {

    const regex = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    const regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
    const regexCP = /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/;

    const formValid = document.getElementById('boutton_envoi');

    const nom = document.getElementById('nom');
    const nomValid = regex;

    const prenom = document.getElementById('prenom');
    const prenomValid = regex;

    const inputEmail = document.getElementById('inputEmail');
    const inputEmailValid = regexEmail;

    const Adresse = document.getElementById('Adresse');

    const CP = document.getElementById('CP');
    const CPValid = regexCP;

    const ville = document.getElementById('ville');
    const villeValid = regex;

    formValid.addEventListener('click', validation);

    function validation(event) {

        var error = false;
        // vide les messages d'erreurs
        nom.setCustomValidity('');
        prenom.setCustomValidity('');
        inputEmail.setCustomValidity('');
        Adresse.setCustomValidity('');
        CP.setCustomValidity('');
        ville.setCustomValidity('');
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

        // si pas d'erreur lors de la saisi du formulaire envoi des données au serveur
        if (!error) {
            event.preventDefault();
            var panier =
                {
                    "contact": {
                        "firstName": nom.value,
                        "lastName": prenom.value,
                        "address": Adresse.value,
                        "city": ville.value,
                        "email": inputEmail.value
                    },
                    "products": JSON.parse(sessionStorage.getItem('panier')),
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
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify(panier));
            });
            envoiPanier.then((result) => {

                if (sessionStorage.getItem("validation") == null) {

                    sessionStorage.setItem("validation", JSON.stringify([]));
                }
                var validation = JSON.parse(sessionStorage.getItem("validation"));

                validation.push(result);
                sessionStorage.setItem("validation", JSON.stringify(validation));
                window.location = "confirmation.html";
            });
            envoiPanier.catch((reject) => {
                console.log(reject);
            });
        }
    }
}
validationFormulaire();
