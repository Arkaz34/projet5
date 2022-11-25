    //on renvoi un objet avec une chaîne de requette. 
    const recupParametre = new URLSearchParams(window.location.search).get('id');
    orderId.textContent = recupParametre;
    //une fois la commande passé on supprime les produits du panier
    window.localStorage.clear();
