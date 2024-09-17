import { UserModel } from "./models/user.model.js";

class UserDaoMongo {
	async registerUser(user) {
		try {
			return await UserModel.create(user);
		} catch (error) {
			throw new Error(error);
		}
	}

	async getUsers() {
		try {
			return await UserModel.find();
		} catch (error) {
			throw new Error(error);
		}
	}

	async getUserByEmail(email) {
		try {
			return await UserModel.findOne({ email });
		} catch (error) {
			throw new Error(error);
		}
	}

	async getUserById(id) {
		try {
			return await UserModel.findById(id);
		} catch (error) {
			throw new Error(error);
		}
	}

	async deleteUser() {
		try {
			return await UserModel.findOneAndDelete({ email });
		} catch (error) {
			throw new Error(error);
		}
	}

	async updateUser(id, user) {
		try {
			return await UserModel.findByIdAndUpdate(id, user, {
				new: true,
			});
		} catch (error) {
			throw new Error(error);
		}
	}
}

export const userDao = new UserDaoMongo();
