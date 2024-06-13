import CartDaoMongo from '../daos/mongodb/cart.dao.js';
const cartDao = new CartDaoMongo();

export const getCarts = async () =>{
    try {
        return await cartDao.getCarts()
    } catch (error) {
        throw new Error(error);
    }
}

export const getCartById = async (id) => {
    try {
        return await cartDao.getCartById(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const createCart = async () => {
    try {
        return await cartDao.createCart();
    } catch (error) {
        throw new Error(error);
    }
}

export const addProductToCart = async (id, productId) => {
    try {
        const cart = await cartDao.getCartById(id)
        if (cart) {
            const existeProd = cart.products.find(p => p.product._id.toString() === productId.toString());
            if (!existeProd) return await cartDao.addNewProductToCart(id, productId)
            else return await cartDao.addExistingProductToCart(id, productId)
        } else {
            return null
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProductFromCart = async (id, productId) => {
    try {
        return await cartDao.deleteProductFromCart(id, productId)
    } catch (error) {
        throw new Error(error);
    }
}

export const updateQuantity = async (id, productId, quantity) => {
    try {
        if (quantity <= 0) return await cartDao.deleteProductFromCart(id, productId)
        return await cartDao.updateQuantity(id, productId, quantity)
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteCart = async (id) => {
    try {
        return await cartDao.deleteCart(id)
    } catch (error) {
        throw new Error(error);
    }
}

export const updateCart = async (id, cart) => {
    try {
        return await cartDao.update(id, cart)
    } catch (error) {
        throw new Error(error);
    }
}