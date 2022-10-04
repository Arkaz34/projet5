async function recup_produits () {
    // on envoi une requête au serveur, on attend qu'il nous réponde, un fois qu'il nous a répondu, on stacke la réponse dans la variable data
    const data = await fetch("http://localhost:3000/api/products/");
    console.log("data : ", data.body);
    const products = data.body;
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        console.log("nom du produit : ", product.name);
    }
}

recup_produits();