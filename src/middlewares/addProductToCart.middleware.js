// import { ProductManager } from "../daos/filesystem/product.dao.js"
// import {__dirname} from "../utils.js"
// const productManager = new ProductManager(`${__dirname}/daos/filesystem/products.json`);

import * as serviceProd from "../services/product.services.js";

const prod = async (req,res,next) => {
    const product = await serviceProd.getProductById(req.params.pid)
    console.log(product);
    if(product){
        console.log("next")
        next()
    } else {
        res.status(400).json({ msg: "Product doesn´t exist" });
    }
}

export const middleware_addProdCart = prod;