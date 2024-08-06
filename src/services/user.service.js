import {userDao} from '../daos/mongo/user.dao.js';
import {cartDao} from '../daos/mongo/cart.dao.js';

class UserService {
    registerUser = async (user) => {
        try {
            const cartId = await cartDao.createCart();
            return await userDao.registerUser({...user, role: "user", cart: cartId});
        } catch (error) {
            throw new Error(error);
        }
    }

    getUserByEmail = async (email) => {
        try {
            return await userDao.getUserByEmail(email);
        } catch (error) {
            throw new Error(error);
        }
    }

    getUserById = async (id) => {
        try {
            return await userDao.getUserById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteUser = async (id) => {
        try {
            return await userDao.deleteUser(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    updateUser = async (id, user) => {
        try {
            return await userDao.updateUser(id, user);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const userService = new UserService();