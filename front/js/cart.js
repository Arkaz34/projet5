//récupération des données du local storage
let panier = JSON.parse(window.localStorage.getItem("panier"))
//---------------------------------
//affichage des éléments du panier
//---------------------------------
function afficherPanier() {
    //si panier vide, affiche "est vide"
    if (panier === null || panier.length == 0) {
        document.querySelector("h1").textContent += " est vide !";
    }
    //sinon 
    else {
        //si le panier n'est pas vide alors on affiche ce qu'il y a dans le localStorage
        //apelle API pour récup les l'id produit
        panier.forEach(canape => {
            //fetch pour récupérer l'id dans le back
            fetch(`http://localhost:3000/api/products/${canape.id}`)
                //la promesse a pour réponse (transforme en JSON)
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    produitApi = data;
                    //création templete html + insertion des données
                    //récupére l'id de la section de cart.html
                    let section = document.querySelector("#cart__items")
                    //créer l'article avec les éléments correspondant
                    let article = document.createElement("article")
                    article.className = "cart__item"
                    article.dataset.id = canape.id
                    article.dataset.color = canape.color
                    //créer div avec les éléments correspondant
                    let divImg = document.createElement("div")
                    divImg.className = "cart__item__img"
                    let img = document.createElement("img")
                    img.src = produitApi.imageUrl
                    img.alt = produitApi.altTxt
                    //créer div avec les éléments correspondant
                    let divContent = document.createElement("div")
                    divContent.className = "cart__item__content"
                    //créer div avec les éléments correspondant
                    let divDescription = document.createElement("div")
                    divDescription.className = "cart__item__content__description"
                    let h2 = document.createElement("h2")
                    h2.textContent = produitApi.name
                    let pColor = document.createElement("p")
                    pColor.textContent = canape.color
                    let pPrice = document.createElement("p")
                    pPrice.textContent = produitApi.price
                    //créer div avec les éléments correspondant
                    let divSetting = document.createElement("div")
                    divSetting.className = "cart__item__content__settings"
                    //créer div avec les éléments correspondant
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
                    //function change sur le input type number du panier
                    input.addEventListener('change', function (e) {
                        panier.forEach(function (changeQtProduit) {
                            //récupérer l'id, couleur du produit et qt
                            if (input.closest(".cart__item").dataset.color == changeQtProduit.color && input.closest(".cart__item").dataset.id == changeQtProduit.id) {
                                changeQtProduit.qt = input.value;
                            }
                        })
                        //sauvegarde des modifications des QT produit du panier
                        window.localStorage.setItem("panier", JSON.stringify(panier));
                    })
                    //créer div avec les éléments correspondant
                    let divDelete = document.createElement("div")
                    divDelete.className = "cart__item__content__settings__delete"
                    let pDelete = document.createElement("p")
                    pDelete.className = "deleteItem"
                    pDelete.textContent = "Supprimer"
                    //---------------------------------
                    //suppréssion des produits du panier
                    //---------------------------------
                    //
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
                    })
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
//ajout sommes des produits du panier
//---------------------------------
let quantityProduit = 0;
for (let id in panier) {
    quantityProduit += parseInt(panier[id].qt);
    document.querySelector("#totalQuantity").textContent = quantityProduit;
    console.log(quantityProduit);
}
//---------------------------------
//ajout sommes des prix du panier
//---------------------------------
let prixProduit = 0;