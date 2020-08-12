function validationFormulaire() {
    /*
    *  https://www.pierre-giraud.com/javascript-apprendre-coder-cours/validation-formulaire/
    */
    var regex = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    var regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/ ;
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
        }
        //Adresse
        if (Adresse.validity.valueMissing) {
            event.preventDefault();
            AdresseVide.textContent = 'Adresse manquante';
            AdresseVide.style.color = 'red';
        } else {
            AdresseVide.textContent = '';
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
        }  else {
            CPVide.textContent = '';
        }

        //Ville
        if (ville.validity.valueMissing) {
            event.preventDefault();
            villeVide.textContent = 'Ville manquante';
            villeVide.style.color = 'red';
        } else if (villeValid.test(ville.value) === false) {
            event.preventDefault();
            villeVide.textContent = 'Format incorrect';
            villeVide.style.color = 'orange';
        } else {
            villeVide.textContent = '';
        }
    }


}
validationFormulaire();
