import { mailService } from "../services/mail.service.js";
import { cartDao } from "../daos/mongo/cart.dao.js";
import { productDao } from "../daos/mongo/product.dao.js";
import { ticketDao } from "../daos/mongo/ticket.dao.js";
import { get } from "mongoose";

class CartService {
	getCarts = async () => {
		try {
			return await cartDao.getCarts();
		} catch (error) {
			throw new Error(error);
		}
	};

	getCartById = async (id) => {
		try {
			return await cartDao.getCartById(id);
		} catch (error) {
			throw new Error(error);
		}
	};

	createCart = async () => {
		try {
			return await cartDao.createCart();
		} catch (error) {
			throw new Error(error);
		}
	};

	addProductToCart = async (id, productId) => {
		try {
			const cart = await cartDao.getCartById(id);
			if (cart) {
				const existeProd = cart.products.find(
					(p) => p.product._id.toString() === productId.toString()
				);
				if (!existeProd)
					return await cartDao.addNewProductToCart(id, productId);
				else
					return await cartDao.addExistingProductToCart(
						id,
						productId
					);
			} else {
				return null;
			}
		} catch (error) {
			throw new Error(error);
		}
	};

	deleteProductFromCart = async (id, productId) => {
		try {
			return await cartDao.deleteProductFromCart(id, productId);
		} catch (error) {
			throw new Error(error);
		}
	};

	updateQuantity = async (id, productId, quantity) => {
		try {
			if (quantity <= 0)
				return await cartDao.deleteProductFromCart(id, productId);
			return await cartDao.updateQuantity(id, productId, quantity);
		} catch (error) {
			throw new Error(error);
		}
	};

	deleteCart = async (id) => {
		try {
			return await cartDao.deleteCart(id);
		} catch (error) {
			throw new Error(error);
		}
	};

	updateCart = async (id, cart) => {
		try {
			return await cartDao.update(id, cart);
		} catch (error) {
			throw new Error(error);
		}
	};

	purchaseCart = async (id, user) => {
		try {
			const cart = await cartDao.getCartById(id);
			if (!cart) return null;

			/*Check and update stocks*/
			const productsSinStock = cart.products.filter((p) => {
				return p.product.stock < p.quantity;
			});
			if (productsSinStock.length > 0) {
				return {
					msg: `No hay stock para los productos ${productsSinStock
						.map((p) => p.product.title)
						.join(", ")}`,
				};
			}

			cart.products.forEach(async (p) => {
				let product = await productDao.reduceStock(
					p.product._id,
					p.quantity
				);
			});

			cart.products.forEach(async (p) => {
				p.product.stock -= p.quantity;
				await productDao.updateProduct(p.product._id, p.product);
			});

			await cartDao.deleteCart(id);

			const ticket = await ticketDao.createTicket(user, cart);
			await mailService.sendMail({
				to: user.email,
				subject: "Compra de productos",
				type: "ticket",
				content: ticket,
			});
			const populatedTicket = await ticketDao.getTicketById(ticket._id);
			return populatedTicket;
		} catch (error) {
			throw new Error(error);
		}
	};
}

export const cartService = new CartService();
