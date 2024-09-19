import { faker } from "@faker-js/faker";
import { createHash } from "../utils/hash.js";
faker.locale = "es";

export const generateUser = async (cartId) => {
	const hashPassword = await createHash("coder123");
	return {
		first_name: faker.person.firstName(),
		last_name: faker.person.lastName(),
		age: faker.number.int({ min: 18, max: 60 }),
		cartId: cartId,
		password: hashPassword,
		role: "user",
		pets: [],
		email: faker.internet.email(),
	};
};

export const generatePets = (cant) => {
	const pets = [];
	for (let i = 0; i < cant; i++) {
		pets.push({
			name: faker.person.firstName(),
			type: faker.animal.type(),
		});
	}
	return pets;
};
