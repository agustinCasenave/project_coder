import { userDao } from "../daos/mongo/user.dao.js";
import { cartDao } from "../daos/mongo/cart.dao.js";
import { generateUser } from "../utils/mocks.utils.js";
import { generatePets } from "../utils/mocks.utils.js";

export const createUsersMock = async (cantUsers = 20, cantPets = 3) => {
	try {
		const usersArray = [];
		for (let i = 0; i <= cantUsers; i++) {
			let cartId = await cartDao.createCart();
			const user = await generateUser(cartId);
			const pets = generatePets(cantPets);
			user.pets = pets;
			usersArray.push(user);
		}

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
