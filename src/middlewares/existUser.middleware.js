import { userService } from "../services/user.service.js";

const existUser = async (req, res, next) => {
	try {
		const { email } = req.body;
		const user = await userService.getUserByEmail(email);
		if (user) {
			return res.status(400).json({ msg: "User already exists" });
		} else {
			next();
		}
	} catch (error) {
		res.status(400).json({
			msg: "Error searching for user",
			details: error.message,
		});
	}
};

export const middleware_existUser = existUser;
