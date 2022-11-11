//---------------------------------
//récupération des paramètres de l'URL (depuis document.location) 
//---------------------------------
// document location renvoie un objet qui contient des informations sur l'URL du document et fournit
let params = new URL(document.location).searchParams;
// on récupère la valeur du paramètre 'id' depuis les paramètres de l'URL,
//on la stocke dans la variable idProduit
const idProduit = params.get("id");
/* donc à partir de là on sait que la variable 'idProduit' contient
l'identifiant du produit que l'on doit afficher*/
let produit = null;
/*Maintenant qu'on connait l'identifiant du produit à afficher (idProduit),
nous devons demander à une source de vérité (le serveur) de nous donner les attributs du produit.
 Pour cela nous envoyons donc une requête HTTP au serveur (via la fonction fetch(url_du_serveur) */
//async function définit une fonction qui renvoie un objet  
const fetchProduit = async function () {
    //récupération de l'idProduit avec l'url 
    await fetch(`http://localhost:3000/api/products/${idProduit}`)
        //la promesse a pour réponse (transforme en JSON)
        .then(function (res) {
            return res.json();
        })
        //retourne la réponse en tant qu’objet FormData
        .then(function (data) {
            produit = data;
        });
};
//---------------------------------
//affichage du produit 
//---------------------------------
const afficherLeProduit = async function () {
    //récupération des produits
    await fetchProduit();
    let choixColor = document.querySelector("#colors");
    document.querySelector(".item__img").innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
    document.getElementById("title").textContent = produit.name;
    document.getElementById("price").textContent = produit.price;
    document.getElementById("description").textContent = produit.description;
    produit.colors.forEach((option) => {
        choixColor.innerHTML += `<option value="${option}">${option}</option>`;
    });
};
afficherLeProduit();
//---------------------------------
//affichage du produit fin
//---------------------------------
//---------------------------------
//ajout au click 
//---------------------------------
//récupérer l'id du bouton(#addToCart), créer l'événement click
const bouton = document.querySelector('#addToCart').addEventListener('click', function (event) {
    //récupérer la valeur des champs colors et la valeur de l'id quantity
    if (document.getElementById("colors").value == "" || document.getElementById("quantity").value <= 0) {
        //Message d'alert pour indiquer à l'utilisateur que la couleur et la qt n'est pas selectionner
        alert("Veuilliez choisir une couleur et une quantité");
        //l'évènement n'est pas explicitement géré,
        //l'action par défaut ne devrait pas être exécutée comme elle l'est normalement.
        event.preventDefault();
    }
    //si la couleur et la quantité sont sélectionnés alors tu exécute cette condition
    else {
        //convertit la valeur au format JSON
        let panier = JSON.parse(window.localStorage.getItem("panier"))
        //mais si la valeur est nul la prochaine selection envoie toute les valeurs du produit 
        if (panier == null) {
            //alors le tableau reste vide
            panier = []
            //créer la variable "productToLocalStorage" avec les objets id, color, qt
            let productToLocalStorage = {
                id: idProduit,
                color: document.getElementById("colors").value,
                qt: document.getElementById("quantity").value,
            }
            //envoi du "productToLocalStorage" dans le local storage
            panier.push(productToLocalStorage)
        } else {
            /*sinon on indique que le produit est déjà stocker mais 
            on vérifie la couleur et le produit */ 
            var doublon = false;
            panier.forEach(function (value, index) /*on donne des instructions à la fonction*/{
                //vérifie si la couleur ou le produit est indentique et l'ajoute au panier.
                if (value.color == document.getElementById("colors").value && value.id == idProduit) {
                    doublon = true;
                    /*La fonction parseInt() analyse une chaîne de caractère fournie en argument et 
                    renvoie un entier exprimé dans une base donnée. 
                    Ici celà permet de définir la valeur de base et d'additionner la quantité demandée */
                    value.qt = parseInt(value.qt) + parseInt(document.getElementById("quantity").value);
                    //à définir!!!!!-----------------
                    panier[index] = value;
                }
            });
                //sinon tu renvoies le produit complet à ajouter au panier
                if (doublon === false){
                    //à définir!!!------------------- la raison pour laquelle on remet cette variable
                    let productToLocalStorage = {
                        id: idProduit,
                        color: document.getElementById("colors").value,
                        qt: document.getElementById("quantity").value,
                    }
                    //ajoute des éléments au tableau
                    panier.push(productToLocalStorage)
                }
        }
        //méthode convertit une valeur JavaScript en chaîne JSON
        window.localStorage.setItem("panier", JSON.stringify(panier))
    }
});
//---------------------------------
//ajout au click fin
//---------------------------------