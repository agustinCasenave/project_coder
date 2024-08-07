import { productService } from "../services/product.service.js";

const prod = async (req, res, next) => {
	try {
		const products = req.body.products;
		for (let i = 0; i < products.length; i++) {
			const product = await productService.getProductById(
				products[i].product
			);
			if (!product) {
				res.status(400).json({ msg: "Product doesn´t exist" });
				return;
			}
		}
		next();
	} catch (error) {
		res.status(400).json({ msg: "Product doesn´t exist" });
	}
};

export const middleware_existProdArray = prod;
