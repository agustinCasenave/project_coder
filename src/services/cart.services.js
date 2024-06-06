import CartDaoMongo from '../daos/mongodb/cart.dao.js';
const cartDao = new CartDaoMongo();

// import { __dirname } from '../utils.js';
// import CartDaoFS from '../daos/filesystem/cart.dao.js';
// const cartDao = new cartDaoFS(`${__dirname}/daos/filesystem/cart.json`);

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
        console.log(cart);
        if (cart) {
            const existeProd = cart.products.find(p => p.product._id.toString() === productId.toString());
            console.log(existeProd);
            if (!existeProd) return await cartDao.addNewProductToCart(id, productId)
            else return await cartDao.addExistingProductToCart(id, productId)
        } else {
            return null
        }
    } catch (error) {
        throw new Error(error);
    }
}