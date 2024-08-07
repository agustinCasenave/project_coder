import {productDao} from "../daos/mongo/product.dao.js";

class ProductService {
	getProducts = async (limit, page, category, sort) => {
		try {
			let sortFilter = {};
			if (sort === `asc`) sortFilter = { price: `asc` };
			else if (sort === `desc`) sortFilter = { price: `desc` };

			let queryFilter = {};
			if (category) queryFilter = { category: `${category}` };
			const products = await productDao.getProducts(
				limit,
				page,
				queryFilter,
				sortFilter
			);
			const status = "success";

			const baseUrl = "http://localhost:8080/api/products";

			const createLink = (page) => {
				let url = `${baseUrl}?page=${page}&`;
				if (limit) url += `limit=${limit}&`;
				if (sort) url += `sort=${sort}&`;
				if (category) url += `category=${category}&`;

				return url.slice(0, -1); //borra el ultimo caracter
			};

			if (!products) status = "error";
			let response = {
				status: status,
				payload: products.docs,
				totalPages: products.totalPages,
				prevPage: products.prevPage,
				nextPage: products.nextPage,
				page: products.page,
				hasPrevPage: products.hasPrevPage,
				hasNextPage: products.hasNextPage,
				prevLink: products.hasPrevPage
					? createLink(products.prevPage)
					: null,
				nextLink: products.hasNextPage
					? createLink(products.nextPage)
					: null,
			};

			return response;
		} catch (error) {
			throw new Error(error);
		}
	};

	createProduct = async (obj) => {
		try {
			return await productDao.createProduct(obj);
		} catch (error) {
			throw new Error(error);
		}
	};

	getProductById = async (id) => {
		try {
			return await productDao.getProductById(id);
		} catch (error) {
			throw new Error(error);
		}
	};

	updateProduct = async (id, product) => {
		try {
			return await productDao.updateProduct(id, product);
		} catch (error) {
			throw new Error(error);
		}
	};

	deleteProduct = async (id) => {
		try {
			return await productDao.deleteProduct(id);
		} catch (error) {
			throw new Error(error);
		}
	};
}

export const productService = new ProductService();
