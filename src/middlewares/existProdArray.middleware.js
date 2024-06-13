import * as serviceProd from "../services/product.services.js";

const prod = async (req,res,next) => {
   try {
     const products = req.body.products;
     for (let i = 0; i < products.length; i++) {
            const product = await serviceProd.getProductById(products[i].product)
            if(!product){
                res.status(400).json({ msg: "Product doesn´t exist" });
                return;
            }
        }
     next()
    } catch (error) {
        res.status(400).json({ msg: "Product doesn´t exist" });
    }
}

export const middleware_existProdArray = prod