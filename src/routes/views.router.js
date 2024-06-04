import { Router } from "express";
import {__dirname} from "../utils.js"
import { ProductManager } from "../daos/filesystem/product.dao.js"
const productManager = new ProductManager(`${__dirname}/daos/filesystem/products.json`);

const router = Router();

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts')
});

const products = await productManager.getProducts();
router.get('/', (req, res) => {
    res.render('home', { products })
});

export default router;