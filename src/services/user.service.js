import UserDaoMongo from '../daos/mongo/user.dao.js';
import CartDaoMongo from '../daos/mongo/cart.dao.js';

const userDao = new UserDaoMongo();
const cartDao = new CartDaoMongo();

export const registerUser = async (user) => {
    try {
        const cartId = await cartDao.createCart();
        return await userDao.registerUser({...user, role: "user", cart: cartId});
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserByEmail = async (email) => {
    try {
        return await userDao.getUserByEmail(email);
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserById = async (id) => {
    try {
        return await userDao.getUserById(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteUser = async (id) => {
    try {
        return await userDao.deleteUser(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateUser = async (id, user) => {
    try {
        return await userDao.updateUser(id, user);
    } catch (error) {
        throw new Error(error);
    }
}