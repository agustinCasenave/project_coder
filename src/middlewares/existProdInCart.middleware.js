import mongoose from "mongoose";
import { cartService } from "../services/cart.service.js";

const cart = async (req, res, next) => {
	try {
		const cart = await cartService.getCartById(req.params.cid);
		const pid = new mongoose.Types.ObjectId(req.params.pid);
		const product = cart.products.find((p) => p.product._id.equals(pid));
		if (product) {
			next();
		} else {
			res.status(400).json({ msg: "Product isn't in the cart" });
		}
	} catch (error) {
		res.status(400).json({ msg: "Error in execution" });
	}
};

export const middleware_existProdInCart = cart;
