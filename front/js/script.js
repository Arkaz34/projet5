//---------------------------------
//fetch récupére les données de l'api sur le serveur 3000
//---------------------------------
fetch('http://localhost:3000/api/products')
    //la promesse a pour réponse (transforme en JSON)
    .then(function (res) {
        //analyse la réponse en JSON
        return res.json();
    })
    //retourne la réponse en tant qu’objet FormData
    .then(function (data) {
        console.log(data);
        //sélection élément HTML ou afficher produits
        let section = document.querySelector("#items")
        // parcour le tableau data et on donne une key à chaque élément 'canape'
        data.forEach(function (canape) {
//---------------------------------
//création des éléments html
//---------------------------------
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
