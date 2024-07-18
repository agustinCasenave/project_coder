import * as serviceCart from "../services/cart.service.js";

const cart = async (req,res,next) => {
   try {
     const cart = await serviceCart.getCartById(req.params.cid)
     if(cart){
         next()
     } else {
         res.status(400).json({ msg: "Cart doesn´t exist" });
     }
   } catch (error) {
        res.status(400).json({ msg: "Cart doesn´t exist" });
   }
}

export const middleware_existCart = cart;