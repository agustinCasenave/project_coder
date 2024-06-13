import * as serviceProd from "../services/product.services.js";

const prod = async (req,res,next) => {
   try {
     const product = await serviceProd.getProductById(req.params.pid)
     if(product){
         next()
     } else {
         res.status(400).json({ msg: "Product doesn´t exist" });
     }
   } catch (error) {
        res.status(400).json({ msg: "Product doesn´t exist" });
   }
}

export const middleware_existProd = prod;