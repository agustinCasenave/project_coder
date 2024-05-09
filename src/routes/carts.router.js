import { Router } from "express";
import { CartManager } from "../manager/carts.manager.js"
import { middleware_addProdCart } from "../middlewares/addProductToCart.middleware.js";

const router = Router();
const cartManager = new CartManager("./src/data/carts.json");

router.post('/', async (req,res) => {                     //Create Cart. Data on body. Id Autogenerated.
    try {
        const cart = await cartManager.createCart();
        if(!cart) res.status(404).json({"msg": "Cart not created"});
        else res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);           
    }
})

router.get('/:cid', async (req, res) => {                 //Get Products on cart CId.
    try {
        const { cid } = req.params
        const products = await cartManager.getCartById(cid)
        if(!products) res.status(404).json({msg: "Cart not found"})
        else {
            res.status(200).json(products)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);   
    }
})

router.post('/:cid/product/:pid', middleware_addProdCart, async (req, res) => {  //Add Product PId to cart CId. 
    try {
        const { cid } = req.params
        const { pid } = req.params
        const cart = await cartManager.addProductToCart(cid, pid);
        if (!cart) res.status(404).json({"msg": "Cart not found"});
        else res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);   
    }
})


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