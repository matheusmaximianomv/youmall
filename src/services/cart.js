export const CART = "@cart";

export const insertInCart = (product) => {

    const productForCart = {
        id: product.id, imgUrl: product.data.imgUrl, name: product.data.name, price: product.data.preco, quantityMax: product.data.quantidade, quantidade : 1, priceTotal : product.data.preco * 1
    }
    console.log(productForCart.priceTotal);
    try{
        if(!!JSON.parse(window.atob(localStorage.getItem(CART))))
            localStorage.setItem(CART, window.btoa(JSON.stringify([...JSON.parse(window.atob(localStorage.getItem(CART))), productForCart])));
    } catch (err) {
        localStorage.setItem(CART, window.btoa(JSON.stringify([productForCart])));
    }
}

export const removeFromCart = (productId) => {
    try {
        const products = JSON.parse(window.atob(localStorage.getItem(CART)));
        products.splice(productId, 1);
        localStorage.removeItem(CART);
        try {
            if(products.length === 1) {
                localStorage.setItem(CART, window.btoa(JSON.stringify(products)));
            } else if(products.length > 1) {
                localStorage.setItem(CART, window.btoa(JSON.stringify(products)));
            }
        } catch (err) {
            return false;
        }
    } catch (err) {
        return false;
    }
}

export const cancelPurchase = () => {
    localStorage.removeItem(CART);
}

export const getCart = () => {
    try {
        return JSON.parse(window.atob(localStorage.getItem(CART)));
    } catch (error) {
        return null;
    }
}