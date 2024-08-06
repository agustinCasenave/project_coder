import { productService } from "../services/product.service.js";

class ProductController {
	getProducts = async (req, res, next) => {
		try {
			const limit = parseInt(req.query.limit);
			const page = parseInt(req.query.page);
			const category = req.query.category;
			const sort = req.query.sort;
			const response = await productService.getProducts(
				limit,
				page,
				category,
				sort
			);
			res.json(response);
		} catch (error) {
			throw new Error(error);
		}
	};
	createProduct = async (req, res, next) => {
		try {
			const product = await productService.createProduct(req.body);
			if (!product)
				return res.status(404).json({ msg: "Error create product" });
			else {
				return res.status(200).json(product);
			}
		} catch (error) {
			throw new Error(error);
		}
	};
	getProductById = async (req, res, next) => {
		try {
			const { pid } = req.params;
			const product = await productService.getProductById(pid);
			if (!product)
				return res.status(404).json({ msg: "Product not found" });
			else return res.status(200).json(product);
		} catch (error) {
			throw new Error(error);
		}
	};
	getProductById = async (req, res, next) => {
		try {
			const { pid } = req.params;
			const product = await productService.getProductById(pid);
			if (!product)
				return res.status(404).json({ msg: "Product not found" });
			else return res.status(200).json(product);
		} catch (error) {
			throw new Error(error);
		}
	};
	updateProduct = async (req, res, next) => {
		try {
			const { pid } = req.params;
			const response = await productService.updateProduct(pid, req.body);
			if (!response)
				return res.status(404).json({ msg: "Product not found" });
			else {
				const products = await productService.getProducts();
				return res.status(200).json(response);
			}
		} catch (error) {
			throw new Error(error);
		}
	};
	deleteProduct = async (req, res, next) => {
		try {
			const { pid } = req.params;
			const response = await productService.deleteProduct(pid);
			if (!response)
				return res.status(404).json({ msg: "Product not found" });
			else {
				const products = await productService.getProducts();
				return res.status(200).json(response);
			}
		} catch (error) {
			throw new Error(error);
		}
	};
}

export const productController = new ProductController();
