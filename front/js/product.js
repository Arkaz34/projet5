//---------------------------------
//récupération des paramètres de l'URL (depuis document.location) 
//---------------------------------
//document location renvoie un objet qui contient des informations sur l'URL du document
let params = new URL(document.location).searchParams;
/*on récupère la valeur du paramètre 'id' depuis les paramètres de l'URL,
on la stocke dans la variable idProduit*/
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
            //analyse la réponse en JSON
            return res.json();
        })
        //retourne la réponse en tant qu’objet Form Data
        .then(function (data) {
            produit = data;
        });
};
//---------------------------------
//affichage du produit 
//---------------------------------
/*créer on constante qui contient les éléments du produit à afficher*/
const afficherLeProduit = async function () {
    //récupération des produits
    await fetchProduit();
    //innerHTML récupère ou définit la syntaxe HTML décrivant les descendants de l'élément.
    document.querySelector(".item__img").innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
    //dans l'id title on met le nom correspondant au produit
    document.getElementById("title").textContent = produit.name;
    //dans l'id price on met le prix correspondant au produit
    document.getElementById("price").textContent = produit.price;
    //dans l'id description on met la description correspondant au produit
    document.getElementById("description").textContent = produit.description;
    //dans l'id colors on montre les différentes couleurs que le client peut choisir par produit
    let choixColor = document.querySelector("#colors");
    ////forEach permet d'exécuter une fonction "option" donnée sur chaque élément du tableau de couleur. 
    produit.colors.forEach((option) => {
        //avec la variable "choixColors" on implémente la couleur en fonction du produit choisi à l'id "colors"
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
    //récupérer la valeur des champs "colors" et de l'id "quantity"
    //si la valeur de la couleur est égale à rien ou la valuer de la quantité est égale à 0
    if (document.getElementById("colors").value == "" || document.getElementById("quantity").value <= 0) {
        //on envoie un message d'alert pour indiquer à l'utilisateur que la couleur et ou la qt n'est pas selectionner
        alert("Veuilliez choisir une couleur et une quantité");
        /*l'évènement n'est pas explicitement géré,
        l'action par défaut ne devrait pas être exécutée comme elle l'est normalement.*/
        event.preventDefault();
    }
    //si la couleur et la quantité sont sélectionnés alors tu exécutes cette condition
    //sinon
    else {
        //création variable panier qui regroupe l'objet "produit" sélectionné par le client
        //JSON.parse convertit la valeur au format JSON
        let panier = JSON.parse(window.localStorage.getItem("panier"))
        //mais si la valeur est nul la prochaine selection envoie toute les valeurs du produit 
        if (panier == null) {
            //alors le tableau reste vide
            panier = []
            //créer la variable "productToLocalStorage" qui contient les valeurs de l'id, color et qt sélectionné
            let productToLocalStorage = {
                id: idProduit,
                color: document.getElementById("colors").value,
                qt: document.getElementById("quantity").value,
            }
            /*push le panier dans le local storage pour 
            sauvegarder le produit sélectionné par le client*/
            panier.push(productToLocalStorage)
        } else {
            /*sinon on indique que le produit est déjà stocker mais 
            on vérifie le produit et la couleur*/
            var doublon = false;
            /*on donne des instructions à la fonction*/
            panier.forEach(function (value, index) {
                //vérifie si le produit ou la couleur est indentique et l'ajoute au panier.
                if (value.id == idProduit && value.color == document.getElementById("colors").value) {
                    doublon = true;
                    /*La fonction parseInt() analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé
                    dans une base donnée. Ici celà permet de définir la valeur de base et d'additionner la quantité demandée */
                    value.qt = parseInt(value.qt) + parseInt(document.getElementById("quantity").value);
                    panier[index] = value;
                }
            });
            //si pas de doublon on envoie le produit complet à ajouter au panier
            if (doublon === false) {
                //la variable "productToLocalStorage" qui contient les valeurs de l'id, color et qt sélectionné
                let productToLocalStorage = {
                    id: idProduit,
                    color: document.getElementById("colors").value,
                    qt: document.getElementById("quantity").value,
                }
                    /*push le panier dans le local storage pour 
                sauvegarder le produit sélectionné par le client*/
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