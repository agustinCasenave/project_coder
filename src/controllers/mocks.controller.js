import * as mockService from "../services/mocks.service.js";

export const createUser = async (req, res, next) => {
	try {
		const { users } = req.query;

		const response = await mockService.createUsersMock(users);
		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

export const mockingUsers = async (req, res, next) => {
	try {
		const response = await mockService.mockingUsers();
		res.json(response);
	} catch (error) {
		next(error);
	}
};

export const getUsers = async (req, res, next) => {
	try {
		const response = await mockService.getUsers();
		res.json(response);
	} catch (error) {
		next(error);
	}
};
