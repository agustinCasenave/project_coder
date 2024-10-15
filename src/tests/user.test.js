import { userDao } from "../daos/mongo/user.dao.js";
import { cartDao } from "../daos/mongo/cart.dao.js";
import { generateUser } from "../utils/mocks.utils.js";
import { expect, assert } from "chai";
import { initMongoDB } from "../daos/mongo/connection.js";

describe("Test Users", () => {
	before(async () => {
		initMongoDB();
	});

	it("Register User", async () => {
		const cartId = await cartDao.createCart();
		const user = await generateUser(cartId);
		const response = await userDao.registerUser(user);
		expect(response.email).to.be.equal(user.email);
		expect(response.first_name).to.be.equal(user.first_name);
		expect(response.last_name).to.be.equal(user.last_name);
		expect(response.age).to.be.equal(user.age);
		expect(response.password).to.be.equal(user.password);
		expect(response.role).to.be.equal(user.role);
	});

	it("Get User By Email", async () => {
		const cartId = await cartDao.createCart();
		const user = await generateUser(cartId);
		const response = await userDao.registerUser(user);
		const responseGet = await userDao.getUserByEmail(user.email);
		expect(responseGet.email).to.be.equal(user.email);
	});

	it("Delete User", async () => {
		const cartId = await cartDao.createCart();
		const user = await generateUser(cartId);
		const response = await userDao.registerUser(user);
		const responseDelete = await userDao.deleteUser(response.email);
		expect(responseDelete.email).to.be.equal(user.email);
		const responseGet = await userDao.getUserByEmail(user.email);
		assert.isNull(responseGet);
	});

	it("Update User", async () => {
		const cartId = await cartDao.createCart();
		const user = await generateUser(cartId);
		const response = await userDao.registerUser(user);
		const newUser = {
			first_name: "newFirstName",
			last_name: "newLastName",
			age: 20,
			email: "newEmail@gmail.com",
		};
		const responseUpdate = await userDao.updateUser(response._id, newUser);
		expect(responseUpdate.first_name).to.be.equal(newUser.first_name);
		expect(responseUpdate.last_name).to.be.equal(newUser.last_name);
		expect(responseUpdate.age).to.be.equal(newUser.age);
		expect(responseUpdate.email).to.be.equal(newUser.email);
	});
});
