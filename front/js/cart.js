//---------------------------------
//récupération des données du localStorage
//---------------------------------
//JSON.parse convertit la valeur au format JSON
let panier = JSON.parse(window.localStorage.getItem("panier"))
if (panier == null) {
    //alors le tableau reste vide
    panier = []
}
//---------------------------------
//affichage des éléments du panier
//---------------------------------
function afficherPanier() {
    //si panier et égale à nul ou le nombre d'élément est de 0 alors affiche est vide ! 
    if (panier === null || panier.length == 0) {
        document.querySelector("h1").textContent += " est vide !";
    }
    //sinon 
    else {
        //on parcourt le panier( localStorage ) on donne une fonction à chaque objet du tableau qui s'appelle 'canape'
        panier.forEach(function (canape) {
            //fetch récupére l'id du produit 
            fetch(`http://localhost:3000/api/products/${canape.id}`)
                //la promesse a pour réponse (transforme en JSON)
                .then(function (res) {
                    //analyse la réponse en JSON
                    return res.json();
                })
                //retourne la réponse en tant qu’objet Form Data
                .then(function (data) {
                    produitApi = data;
                    //---------------------------------
                    //création des éléments html
                    //---------------------------------
                    /*création des éléments HTML avec leur identifiant "id ou class" 
                    et on leur donne les attributs correspondant*/
                    let section = document.querySelector("#cart__items")
                    let article = document.createElement("article")
                    article.className = "cart__item"
                    article.dataset.id = canape.id
                    article.dataset.color = canape.color
                    let divImg = document.createElement("div")
                    divImg.className = "cart__item__img"
                    let img = document.createElement("img")
                    img.src = produitApi.imageUrl
                    img.alt = produitApi.altTxt
                    let divContent = document.createElement("div")
                    divContent.className = "cart__item__content"
                    let divDescription = document.createElement("div")
                    divDescription.className = "cart__item__content__description"
                    let h2 = document.createElement("h2")
                    h2.textContent = produitApi.name
                    let pColor = document.createElement("p")
                    pColor.textContent = canape.color
                    let pPrice = document.createElement("p")
                    pPrice.textContent = produitApi.price + " €"
                    let divSetting = document.createElement("div")
                    divSetting.className = "cart__item__content__settings"
                    let divQt = document.createElement("div")
                    divQt.className = "cart__item__content__settings__quantity"
                    let pQt = document.createElement("p")
                    pQt.textContent = "Qté :"
                    let input = document.createElement("input")
                    input.type = "number"
                    input.className = "itemQuantity"
                    input.min = "1"
                    input.max = "100"
                    input.value = canape.qt
                    //---------------------------------
                    //modification qt produit
                    //---------------------------------
                    /*addEventListener configure une fonction de type change qui sera appelée 
                    chaque fois que l'événement spécifié est livré à la cible*/
                    input.addEventListener('change', function () {
                        // forEach est une fonction qui permer de parcourir un tableau (localstorage)
                        panier.forEach(function (changeQtProduit) {
                            /*closest traverse l'élément courant et ses parents 
                            jusqu'à trouver un nœud qui correspond aux sélecteurs exprimés ".cart_item"*/
                            /*si  l'id et la couleur sont identique alors on garde cette valeur et on ajoute la valeur à la quantité*/
                            if (input.closest(".cart__item").dataset.id == changeQtProduit.id && input.closest(".cart__item").dataset.color == changeQtProduit.color) {
                                changeQtProduit.qt = input.value;
                            }
                        })
                        total()
                        qtProduit()
                        //sauvegarde les modifications des QT produit du panier dans le localStorage
                        window.localStorage.setItem("panier", JSON.stringify(panier));
                    })
                    //---------------------------------
                    //modification qt produit fin
                    //---------------------------------
                    let divDelete = document.createElement("div")
                    divDelete.className = "cart__item__content__settings__delete"
                    let pDelete = document.createElement("p")
                    pDelete.className = "deleteItem"
                    pDelete.textContent = "Supprimer"
                    //---------------------------------
                    //suppression des produits du panier
                    //---------------------------------
                    /*addEventListener configure une fonction de type click qui sera appelée 
                    chaque fois que l'événement spécifié est livré à la cible*/
                    pDelete.addEventListener('click', function () {
                        panier.forEach(function (deleteProduit, index) {
                            //si le client click sur "pDelete" on suprime l'id produit et la couleur
                            if (input.closest(".cart__item").dataset.color == deleteProduit.color && input.closest(".cart__item").dataset.id == deleteProduit.id) {
                                //splice permet de retirer un élément du tableau
                                panier.splice(index, 1);
                                input.closest(".cart__item").remove();
                            }
                            //mettre la quantité à null si plus de produit dans le panier et afficher "est vide"
                            let qtProduit = "";
                            if (panier === null || panier.length == 0) {
                                document.querySelector("#totalQuantity").textContent = qtProduit;
                                document.querySelector("h1").textContent += " est vide !";
                                }
                        })
                        total()
                        qtProduit()
                        window.localStorage.setItem("panier", JSON.stringify(panier));
                    })
                    // function produitMax() {
                    //     if (condition) {
                            
                    //     }
                    // }
                    //---------------------------------
                    //suppression des produits du panier fin
                    //---------------------------------
                    //ajoute un nœud à la fin de la liste des enfants d'un nœud parent spécifié
                    section.appendChild(article)
                    article.appendChild(divImg);
                    divImg.appendChild(img);
                    article.appendChild(divContent);
                    divContent.appendChild(divDescription);
                    divDescription.appendChild(h2);
                    divDescription.appendChild(pColor);
                    divDescription.appendChild(pPrice);
                    divContent.appendChild(divSetting);
                    divSetting.appendChild(divQt);
                    divQt.appendChild(pQt);
                    divQt.appendChild(input);
                    divSetting.appendChild(divDelete);
                    divDelete.appendChild(pDelete);
                });
        });
    };
};
afficherPanier();
//---------------------------------
//création des éléments html fin
//---------------------------------
//---------------------------------
//ajout sommes des produits du panier
//---------------------------------
function qtProduit() {
    let quantityProduit = 0;
    for (let id in panier) {
        quantityProduit += parseInt(panier[id].qt);
        document.querySelector("#totalQuantity").textContent = quantityProduit;
    }
}
qtProduit()
total()

//---------------------------------
//ajout sommes des produits du panier fin
//---------------------------------
//----------------------
//affichage prix total
//----------------------
function total() {
    fetch('http://localhost:3000/api/products')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            // forEach est une fonction qui permer de parcourir un tableau
            // parcourir = boucler sur chaque élément du tableau
            let totalPrix = 0; // on initialise notre variable
            data.forEach(function (canape) {
                panier.forEach(function (el) {
                    if (canape._id == el.id) {
                        totalPrix += (canape.price * parseInt(el.qt));
                    }
                })
            })
            // affichage du prix total dans la page panier
            document.querySelector("#totalPrice").textContent = totalPrix;
        })
}
total()
qtProduit()
//----------------------
//affichage prix total fin
//----------------------

/*---------------------- contact ----------------------*/
//sélection du bouton envoyé du contact
const btnEnvoyerCommande = document.getElementById("order");
//addeventlistener du btnEnvoyerCommande
btnEnvoyerCommande.addEventListener("click", function (e) {
    e.preventDefault();
    //----------------------
    /*Récupérer et analyser les données saisies par l’utilisateur dans la variable "contact".
    les mettres dans le localstorage*/
    //----------------------
    let contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
    }
    window.localStorage.setItem("contact", JSON.stringify(contact));
    let valideForm = true;
    //----------------------
    //gestion validation du contact
    //----------------------
    //contôle de la validité des champ de l'objet "contact"
    //indiquer le prénom
    let theFirstName = contact.firstName;
    if (/^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(theFirstName)) {
        document.getElementById("firstNameErrorMsg").textContent = ""
        //mettre l'objet "contactValue" dans le local storage
    } else {
        valideForm = false
        document.getElementById("firstNameErrorMsg").textContent = "Veuillez indiquer votre prénom !"
    };
    //indiquer le nom
    let theLastName = contact.lastName;
    if (/^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(theLastName)) {
        document.getElementById("lastNameErrorMsg").textContent = ""
    } else {
        valideForm = false
        document.getElementById("lastNameErrorMsg").textContent = "Veuillez indiquer votre nom !"
    };
    //indiquer l'address
    let theAddress = contact.address;
    if (/^[0-9 A-Za-z]{3,30}$/.test(theAddress)) {
        document.getElementById("addressErrorMsg").textContent = ""
    } else {
        valideForm = false
        document.getElementById("addressErrorMsg").textContent = "Veuillez indiquer votre adresse !"
    };
    //indiquer la ville
    let theCity = contact.city;
    if (/^([A-Za-z]{3,20})?([/]{0,1})?([A-Za-z]{3,20})$/.test(theCity)) {
        document.getElementById("cityErrorMsg").textContent = ""
    } else {
        valideForm = false
        document.getElementById("cityErrorMsg").textContent = "Veuillez indiquer votre ville !"
    };
    //indiquer l'Email
    let theEmail = contact.email;
    if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(theEmail))) {
        document.getElementById("emailErrorMsg").textContent = ""
    } else {
        valideForm = false
        document.getElementById("emailErrorMsg").textContent = "Veuillez indiquer une adresse Email valide !"
    };
    //si panier "localStorage" et vide, message d'erreur "Aucun produit sélectionné"
    if (panier == "") {
        alert("Aucun produit sélectionné")
    } else {
        //création tableau products
        let products = []
        panier.forEach(function (el) {
            products.push(el.id)
            //mettre les produits sélectionner et le contact dans un objet à envoyer vers le serveur
            const envoiDonnees = {
                products,
                contact,
            }
            //envoie de l'objet vers le serveur
            const options = {
                //le client indique au serveur quel type de données a réellement été envoyé
                method: 'POST',
                //convertit une valeur "envoiDonnees" JavaScript en chaîne JSON. 
                body: JSON.stringify(envoiDonnees),
                /*Content-Type indique au client le type de contenu réellement renvoyé,
                 et un type MIME spécifique pour gérer le document JSON*/
                headers: { 'Content-Type': 'application/json' },
            }
            if(valideForm) {
                //envoi de la commande à l'api
                fetch('http://localhost:3000/api/products/order', options)
                    .then(function (res) {
                        res.json()
                            .then(function (data) {
                                //on retourne l'id + orderId
                                window.location.href = 'confirmation.html?id=' + data.orderId;
                            })
                    })
            } else {
                // si le formulaire n'est pas valide alors "alert"
                alert("Formulaire non valide !")
            }
        })
    }
});
//----------------------
//gestion validation du contact fin
//----------------------
//----------------------
//mettre les données du localstorage dans les champs du contact
//----------------------
//récupérer la key dans le localStorage et la mettre dans une variable
let dataLocalStorage = localStorage.getItem("contact");
if (dataLocalStorage) {
    //convertir la chaîne de caractère en objet
    let dataLocalStorageObjet = JSON.parse(dataLocalStorage);
    //mettre les valeurs du localstorage dans les champs du contact
    document.querySelector("#firstName").value = dataLocalStorageObjet.firstName;
    document.getElementById("lastName").value = dataLocalStorageObjet.lastName;
    document.getElementById("address").value = dataLocalStorageObjet.address;
    document.getElementById("city").value = dataLocalStorageObjet.city;
    document.getElementById("email").value = dataLocalStorageObjet.email;
}
