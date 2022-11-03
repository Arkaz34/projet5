fetch('http://localhost:3000/api/products')
    .then(reponse => reponse.json()
        .then(data => {
            console.log(data);
            //sélection élément HTML ou afficher produits
            let section = document.querySelector("#items")
            // affichage des produits sur la page d'acceuil
            data.forEach(canape => {
                
                //creation de l'element "a"
                let a = document.createElement('a')
                a.href = "./product.html?id=" + canape._id
                //creation de l'element "article"
                let article = document.createElement("article")
                //creation de l'element "img"
                let img = document.createElement("img")
                img.src = canape.imageUrl
                img.alt = canape.altTxt
                //creation du titre "h3"
                let h3 = document.createElement("h3")
                h3.class = "productName"
                h3.textContent = canape.name
                //creation de l'element "p"
                let p = document.createElement("p")
                p.class = "productDescription"
                p.textContent = canape.description
                //
                article.appendChild(p)
                article.appendChild(img)
                article.appendChild(h3)
                a.appendChild(article)
                section.appendChild(a)
            });
        }))