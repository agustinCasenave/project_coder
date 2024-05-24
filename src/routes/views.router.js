import { Router } from "express";
import {__dirname} from "../utils.js"
import { ProductManager } from "../manager/products.manager.js"
const productManager = new ProductManager(`${__dirname}/db/products.json`);

const router = Router();

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts')
});

const products = await productManager.getProducts();
router.get('/home', (req, res) => {
    res.render('home', { products })
});

export default router;