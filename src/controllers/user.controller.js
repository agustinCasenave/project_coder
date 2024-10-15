import { userService } from "../services/user.service.js";
import { createUserDTO } from "../middlewares/validation.middleware.js";
import { createHash } from "../utils/hash.js";

class UserController {
	registerUser = async (req, res, next) => {
		try {
			const { email, password, first_name, last_name, age } = req.body;

			const hashPassword = await createHash(password);

			const newUser = {
				email,
				password: hashPassword,
				first_name,
				last_name,
				age,
			};
			const user = await userService.registerUser(newUser);
			const userPlain = user.toObject();
			const userPublic = createUserDTO(userPlain);
			if (!user)
				return res.status(404).json({ msg: "Error create user" });
			else {
				return res.status(200).json(userPublic);
			}
		} catch (error) {
			throw new Error(error);
		}
	};

	getUserByEmail = async (req, res, next) => {
		try {
			const { email } = req.params;
			const user = await userService.getUserByEmail(email);
			if (!user) return res.status(404).json({ msg: "User not found" });

			const userPlain = user.toObject();

			const userPublic = createUserDTO(userPlain);

			return res.status(200).json(userPublic);
		} catch (error) {
			throw new Error(error);
		}
	};

	deleteUser = async (req, res, next) => {
		try {
			const { email } = req.params;
			const user = await userService.deleteUser(email);
			if (!user) return res.status(404).json({ msg: "User not found" });
			else return res.status(200).json(user);
		} catch (error) {
			throw new Error(error);
		}
	};

	updateUser = async (req, res, next) => {
		try {
			const { email } = req.params;
			console.log(email);
			
			const user = await userService.updateUser(email, req.body);
			const userPlain = user.toObject();
			const userPublic = createUserDTO(userPlain);
			if (!user) return res.status(404).json({ msg: "User not found" });
			else return res.status(200).json(userPublic);
		} catch (error) {
			throw new Error(error);
		}
	};
}

export const userController = new UserController();
