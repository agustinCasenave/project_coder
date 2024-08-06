import { cartService } from "../services/cart.service.js";
import mongoose from "mongoose";

const cart = async (req, res, next) => {
	try {
		let { cid } = req.params;
		cid = new mongoose.Types.ObjectId(cid);
		if (cid.equals(req.user.cart)) {
			next();
		} else {
			return res
				.status(400)
				.json({ msg: "You don't have access to this cart" });
		}
	} catch (error) {
		res.status(400).json({
			msg: "Error in execution",
			details: error.message,
		});
	}
};

export const middleware_isMyCart = cart;
