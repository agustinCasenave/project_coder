import { Router } from "express";
import { middleware_addProdCart } from "../middlewares/addProductToCart.middleware.js";
import * as controller from "../controllers/cart.controller.js";

const router = Router();

router.post('/', controller.createCart)                  //Create Cart. Data on body. Id Autogenerated.

router.get('/:cid', controller.getCartById)                //Get Products on cart CId.

router.post('/:cid/product/:pid', middleware_addProdCart, controller.addProductToCart)  //Add Product PId to cart CId. 


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