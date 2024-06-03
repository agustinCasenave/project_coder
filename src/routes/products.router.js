import { Router } from "express";
import { ProductManager } from "../manager/products.manager.js"
import {__dirname} from "../utils.js"
import { middleware_createProd } from "../middlewares/createProduct.midleware.js";
import { middleware_updProd } from "../middlewares/updateProd.midleware.js";
import { socketServer } from "../server.js";

const productManager = new ProductManager(`${__dirname}/db/products.json`);
const router = Router();

router.get('/', async (req, res) => {                 //Get ALL products
    try {
        console.log("get all products");
        const limit = parseInt(req.query.limit)
        const products = await productManager.getProducts();
        if (limit) res.status(200).json(products.slice(0, limit))
        else return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
    
})

router.get('/:pid', async (req, res) => {             //Get PId Product
    try {
        const { pid } = req.params
        console.log(pid);
        const product = await productManager.getProductById(pid)
        if(!product) return res.status(404).json({msg: "Product not found"})
        else return res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
})

router.post('/', middleware_createProd,async (req, res) => {               //Create Product. Data on body. Id Autogenerated
    try {
        let title = req.body.title
        let description = req.body.description
        let price = req.body.price
        let thumbnails = req.body.thumbnails
        let code = req.body.code
        let stock = req.body.stock
        let category = req.body.category
        const product = await productManager.createProduct(title, description, code, price, stock, category, thumbnails )
        if (!product) return res.status(404).json({ msg: "Product already exists" });
        else {
            socketServer.emit("newProduct", product);
            return res.status(200).json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
})

router.put('/:pid', middleware_updProd, async (req, res) => {            //Update Product. Data on body. Id unchanged.
    try {
        const { pid } = req.params;
        const response = await productManager.updateProduct(pid, req.body);
        if (!response) return res.status(404).json({ msg: "Product not found" });
        else {
            const products = await productManager.getProducts();                    
            socketServer.emit("updProductList", products);
            return res.status(200).json({"msg": "Product updated successfully"})    
        };
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);        
    }
})

router.delete('/:pid', async (req, res) => {          //Delete Product. 
    try {
        const { pid } = req.params;
        const response = await productManager.deleteProduct(pid);
        if (!response) return res.status(404).json({ msg: "Product not found" });
        else {
            const products = await productManager.getProducts();         
            socketServer.emit("updProductList", products);
            return res.status(200).json({"msg": "Product deleted successfully"})   
        };
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);        
    }
})

export default router;


        /*Product data:
            {   
                id:
                title: 
                description:
                code: 
                price:
                status: 
                stock:
                category:
                thumbnail: []   //Array of thumbnail paths
            }    
        */