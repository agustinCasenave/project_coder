import { ProductManager } from "../manager/products.manager.js"
import {__dirname} from "../utils.js"
const productManager = new ProductManager(`${__dirname}/db/products.json`);

const prod = async (req,res,next) => {
    const product = await productManager.getProductById(req.params.pid)
    console.log(product);
    if(product){
        console.log("next")
        next()
    } else {
        res.status(400).json({ msg: "Product doesn´t exist" });
    }
}

export const middleware_addProdCart = prod;