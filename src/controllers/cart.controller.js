import { cartService } from "../services/cart.service.js";

class CartController {
	getCarts = async (req, res) => {
		try {
			return await cartService.getCarts();
		} catch (error) {
			throw new Error(error);
		}
	};

	getCartById = async (req, res) => {
		try {
			const { cid } = req.params;
			const cart = await cartService.getCartById(cid);
			if (!cart) res.status(404).json({ msg: "Cart not found" });
			else {
				res.status(200).json(cart);
			}
		} catch (error) {
			throw new Error(error);
		}
	};
	createCart = async (req, res) => {
		try {
			const cart = await cartService.createCart();
			if (!cart) res.status(404).json({ msg: "Cart not created" });
			else res.status(200).json(cart);
		} catch (error) {
			throw new Error(error);
		}
	};

	addProductToCart = async (req, res) => {
		try {
			const { cid } = req.params;
			const { pid } = req.params;
			const user = req.user;
			// if (!user) return res.status(401).json({"msg": "No autorizado"})

			// if (user.cartId !== cid) return res.status(401).json({"msg": "No tienes permisos"})

			const cart = await cartService.addProductToCart(cid, pid);
			if (!cart) res.status(404).json({ msg: "Cart not found" });
			else res.status(200).json(cart);
		} catch (error) {
			throw new Error(error);
		}
	};

	deleteProductFromCart = async (req, res) => {
		try {
			const { cid } = req.params;
			const { pid } = req.params;
			const cart = await cartService.deleteProductFromCart(cid, pid);
			if (!cart) res.status(404).json({ msg: "Cart not found" });
			else res.status(200).json(cart);
		} catch (error) {
			throw new Error(error);
		}
	};

	updateQuantity = async (req, res) => {
		try {
			const { cid } = req.params;
			const { pid } = req.params;
			const { quantity } = req.body;
			const cart = await cartService.updateQuantity(cid, pid, quantity);
			if (!cart) res.status(404).json({ msg: "Cart not found" });
			else res.status(200).json(cart);
		} catch (error) {
			throw new Error(error);
		}
	};

	deleteCart = async (req, res) => {
		try {
			const { cid } = req.params;
			const cart = await cartService.deleteCart(cid);
			if (!cart) res.status(404).json({ msg: "Cart not found" });
			else res.status(200).json(cart);
		} catch (error) {
			throw new Error(error);
		}
	};

	updateCart = async (req, res) => {
		try {
			const { cid } = req.params;
			const products = req.body;
			const cart = await cartService.updateCart(cid, products);
			if (!cart) res.status(404).json({ msg: "Cart not found" });
			else res.status(200).json(cart);
		} catch (error) {
			throw new Error(error);
		}
	};
}

export const cartController = new CartController();
