//récupération des données du local storage
let panier = JSON.parse(window.localStorage.getItem("panier"))
//console.log(panier)

const fetchProduit = async function (_id) {
}
//affichage des éléments du panier
function afficherPanier() {
    //si panier vide
    if (panier === null || panier.length == 0) {
        document.querySelector("h1").textContent += " est vide !";
    }
    else {
        //si le panier n'est pas vide alors on affiche ce qu'il y a dans le localS
        //apelle API pour récup les info
        panier.forEach(canape => {
            //console.log(canape);
            fetch(`http://localhost:3000/api/products/${canape.id}`)
                //la promesse a pour réponse (transforme en JSON)
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    produitApi = data;
                    console.log(produitApi);
                    //création templete html + insertion des données
                    //récupére l'id de la section de cart.html
                    let section = document.querySelector("#cart__items")
                    let article = document.createElement("article")
                    article.className = "cart__item"
                    console.log(article);

                    /*let divImg = document.createElement("div")
                    divImg.className = "cart__item__img"
                    let img = document.createElement("img")
                    img.src = "http://localhost:3000/images/kanap04.jpeg"
                    img.alt = "altTxt"

                    let divContent = document.createElement("div")
                    divContent.className = "cart__item__content"

                    let divDescription = document.createElement("div")
                    divDescription.className = "cart__item__content__description"
                    let h2 = document.createElement("h2")
                    h2.textContent = canape.name
                    let pColor = document.createElement("p")
                    pColor.textContent = canape.description
                    let pPrice = document.createElement("p")
                    pPrice.textContent = canape.price

                    let divSetting = document.createElement("div")
                    divSetting.className = "cart__item__content__settings"
                    
                    let divQt = document.createElement("div")
                    divQt.className = "cart__item__content__settings__quantity"
                    let pQt = document.createElement("p")
                    pQt.textContent = canape.pt
                    let input = document.createElement("input")
                    input.className = "itemQuantity"
                    let divDelete = document.createElement("div")
                    divDelete.className = "cart__item__content__settings__delete"
                    let pDelete = document.createElement("p")
                    pDelete.className = "deleteItem"
                    //ajoute un nœud à la fin de la liste des enfants d'un nœud parent spécifié
                    */section.appendChild(article)
                    /*article.appendChild(divImg);
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
                    divDelete.appendChild(pDelete);*/
                })
        });
    };
};

afficherPanier();
