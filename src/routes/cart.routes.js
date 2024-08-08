import { Router } from "express";
import { middleware_existCart } from "../middlewares/existeCart.middleware.js";
import { middleware_existProd } from "../middlewares/existProd.middleware.js";
import { middleware_existProdInCart } from "../middlewares/existProdInCart.middleware.js";
import { middleware_existProdArray } from "../middlewares/existProdArray.middleware.js";
import { middleware_isMyCart } from "../middlewares/isMyCart.middleware.js";
import { cartDto } from "../dtos/cart.dto.js";
import { cartController } from "../controllers/cart.controller.js";
import { validate } from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/", validate(cartDto), cartController.createCart); //Create Cart. Data on body. Id Autogenerated.

router.get(
	"/:cid",
	middleware_isMyCart,
	middleware_existCart,
	cartController.getCartById
); //Get Products on cart CId.

router.post(
	"/:cid/products/:pid",
	middleware_existProd,
	middleware_existCart,
	cartController.addProductToCart
); //Add Product PId to cart CId.

router.delete(
	"/:cid/products/:pid",
	middleware_existCart,
	middleware_existProd,
	middleware_existProdInCart,
	cartController.deleteProductFromCart
); //Delete Product

router.put("/:cid", middleware_existProdArray, cartController.updateCart); // actualizar el carrito con un arreglo de productos con el formato especificado

router.put(
	"/:cid/products/:pid",
	middleware_existProd,
	middleware_existCart,
	middleware_existProdInCart,
	cartController.updateQuantity
); //update quantity from body

router.post(
	"/:cid/purchase",
	middleware_existCart,
	cartController.purchaseCart
);

router.delete("/:cid", middleware_existCart, cartController.deleteCart);

export default router;

/*Cart data:
        {
            id:
            products: Array de Products
        }
    */
/*Product in cart format:
        {
            product: productId
            quantity: (add 1 every time method is called)
        }
    */
