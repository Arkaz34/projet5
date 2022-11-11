//---------------------------------
//récupération des données du local storage
//---------------------------------
let panier = JSON.parse(window.localStorage.getItem("panier"))
//---------------------------------
//affichage des éléments du panier
//---------------------------------
function afficherPanier() {
    //si panier et égale à nul ou '||' le nombre d'élément est de 0 alors affiche est vide ! 
    if (panier === null || panier.length == 0) {
        document.querySelector("h1").textContent += " est vide !";
    }
    //sinon 
    else {
        //on parcour le panier( localstorage ) on donne une fonction à chaque objet du tableau qui s'appelle 'canape'
        panier.forEach(function(canape) {
            //fetch récupére le produit de l'api du serveur 3000
            fetch(`http://localhost:3000/api/products/${canape.id}`)
                //la promesse a pour réponse (transforme en JSON)
                .then(function (res) {
                    //analyse la réponse en JSON
                    return res.json();
                })
                //retourne la réponse en tant qu’objet FormData
                .then(function (data) {
                    produitApi = data;
//---------------------------------
//création des éléments html
//---------------------------------
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
                    //interface configure une fonction de type change qui sera appelée 
                    //chaque fois que l'événement spécifié est livré à la cible
                    input.addEventListener('change', function (e) {
                        // forEach est une fonction qui permer de parcourir un tableau (localstorage)
                        panier.forEach(function (changeQtProduit) {
                            /*récupérer l'id, couleur et qt
                            closest traverse l'élément courant et ses parents jusqu'à trouver 
                            //un nœud qui correspond aux sélecteurs exprimés*/
                            if (input.closest(".cart__item").dataset.color == changeQtProduit.color && input.closest(".cart__item").dataset.id == changeQtProduit.id) {
                                changeQtProduit.qt = input.value;
                            }
                        })
                        total()
                        qtProduit()
                        //sauvegarde des modifications des QT produit du panier
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
//suppréssion des produits du panier
//---------------------------------
                    pDelete.addEventListener('click', function (e) {
                        panier.forEach(function (deleteProduit, index) {
                            //récupérer l'id, couleur du produit et qt
                            if (input.closest(".cart__item").dataset.color == deleteProduit.color && input.closest(".cart__item").dataset.id == deleteProduit.id) {
                                panier.splice(index, 1);
                                window.localStorage.setItem("panier", JSON.stringify(panier));
                                input.closest(".cart__item").remove();
                            }
                            //récupérer message panier vide
                        })
                        total()
                        qtProduit()
                    })
//---------------------------------
//suppréssion des produits du panier fin
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
        .then(reponse => reponse.json()
            .then(data => {
                // forEach est une fonction qui permer de parcourir un tableau
                // parcourir = boucler sur chaque élément du tableau
                let totalPrix = 0; // on initialise notre variable
                data.forEach(function (canape) {
                    const panierFiltre = panier.filter((el) => {
                        return el.id == canape._id;
                    });
                    if (panierFiltre.length > 0) {
                        const canapeDuPanier = panierFiltre[0];
                        totalPrix += (canape.price * parseInt(canapeDuPanier.qt));
                    }
                })
                // affichage du prix total dans la page panier
                document.querySelector("#totalPrice").textContent = totalPrix;
            })
        )
}
total()
qtProduit()
console.log(panier);
//----------------------
//affichage prix total fin
//----------------------


// créer un tableau de couverts


// Filtrer les couverts pour ne récuéprer que les fourchettes


// Parcourir tous les couverts et les afficher dans la console


