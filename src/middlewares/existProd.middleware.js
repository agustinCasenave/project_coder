import { productService } from "../services/product.service.js";

const prod = async (req, res, next) => {
	try {
		const product = await productService.getProductById(req.params.pid);
		if (product) {
			next();
		} else {
			res.status(400).json({ msg: "Product doesn´t exist" });
		}
	} catch (error) {
		res.status(400).json({ msg: "Product doesn´t exist" });
	}
};

export const middleware_existProd = prod;
