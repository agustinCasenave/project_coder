import { Faker, es } from "@faker-js/faker";
import { createHash } from "../utils/hash.js";
const customFaker = new Faker({ locale: [es] });

export const generateUser = async (cartId) => {
	const hashPassword = await createHash("coder123");
	return {
		first_name: customFaker.person.firstName(),
		last_name: customFaker.person.lastName(),
		age: customFaker.number.int({ min: 18, max: 60 }),
		cartId: cartId,
		password: hashPassword,
		role: "user",
		pets: [],
		email: customFaker.internet.email(),
	};
};

export const generatePets = (cant) => {
	const pets = [];
	for (let i = 0; i < cant; i++) {
		pets.push({
			name: customFaker.person.firstName(),
			type: customFaker.animal.type(),
		});
	}
	return pets;
};
