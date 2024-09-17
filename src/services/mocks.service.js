import { userDao } from "../daos/mongo/user.dao.js";
import { cartDao } from "../daos/mongo/cart.dao.js";
import { generateUser } from "../utils/mocks.utils.js";

export const createUsersMock = async (cant = 20) => {
	try {
		const usersArray = [];
		for (let i = 0; i <= cant; i++) {
			let cartId = await cartDao.createCart();
			const user = await generateUser(cartId);
			usersArray.push(user);
		}
		console.log(usersArray);

		return await userDao.registerUser(usersArray);
	} catch (error) {
		throw new Error(error);
	}
};

export const mockingUsers = async () => {
	const usersArray = [];
	for (let i = 0; i <= 50; i++) {
		let user = await generateUser(i);
		usersArray.push(user);
	}
	return usersArray;
};

export const getUsers = async () => {
	try {
		return await userDao.getUsers();
	} catch (error) {
		throw new Error(error);
	}
};
