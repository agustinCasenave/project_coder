import mongoose from "mongoose";
import { config } from "../../config/config.js";

const MONGO_URI = config.MONGO_URI;

export const initMongoDB = async () => {
	try {
		mongoose.set("strictQuery", false);
		await mongoose.connect(MONGO_URI);
		console.log("Conectado a la base de datos de MONGODB");
	} catch (error) {
		console.log(error);
	}
};
