import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const JWT_SECRET = config.JWT_SECRET;

export const generateToken = (user) => {
	const payload = {
		user,
		sub: user.id,
	};
	return jwt.sign(payload, JWT_SECRET, { expiresIn: "10m" });
};

//Función para verificar token
export function verifyToken(token) {
	try {
		const decoded = jwt.verify(token, JWT_SECRET);

		return decoded;
	} catch (error) {
		console.log(error);
		throw new Error("Token no valido");
	}
}
