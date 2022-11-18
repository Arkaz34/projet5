//---------------------------------
//fetch permet de récupérer les données de l'API du "Catalogue de canapés"
//---------------------------------
fetch('http://localhost:3000/api/products')
    //la promesse a pour réponse (transforme en JSON)
    .then(function (res) {
        //analyse la réponse en JSON
        return res.json();
    })
    //retourne la réponse en tant qu’objet Data (contenant tous les canapés)
    .then(function (data) {
        /*getElementById renvoie un objet représentant l'élément dont la propriété "id" correspond 
        à la chaîne de caractères spécifiée (section du fichier index.html)*/
        let section = document.getElementById("items");
        //forEach permet d'exécuter une fonction donnée sur chaque élément du tableau.
        data.forEach(function (canape) {
            //---------------------------------
            //création des éléments HTML
            //---------------------------------
            /*création des éléments HTML avec leur identifiant "id ou class" 
            et on leur donne les attributs correspondant*/
            let a = document.createElement('a')
            a.href = "./product.html?id=" + canape._id
            let article = document.createElement("article")
            let img = document.createElement("img")
            img.src = canape.imageUrl
            img.alt = canape.altTxt
            let h3 = document.createElement("h3")
            h3.class = "productName"
            h3.textContent = canape.name
            let p = document.createElement("p")
            p.class = "productDescription"
            p.textContent = canape.description
            //ajoute un nœud à la fin de la liste des enfants d'un nœud parent spécifié
            article.appendChild(p)
            article.appendChild(img)
            article.appendChild(h3)
            a.appendChild(article)
            section.appendChild(a)
        });
    })
//---------------------------------
//création des éléments html fin
//---------------------------------
