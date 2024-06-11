import * as service from "../services/product.services.js";

export const getProducts = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit)
        const page = parseInt(req.query.page)
        const query = req.query.query
        const sort = req.query.sort
        const response = await service.getProducts(limit, page, query, sort)        
        res.json(response)
    } catch (error) {
        next(error);
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const product = await service.createProduct(req.body);
        if (!product) return res.status(404).json({ msg: "Error create product" });
        else {
            return res.status(200).json(product);
        }
    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req, res, next) => {
    try{
        const { pid } = req.params
        const product = await service.getProductById(pid)
        if(!product) return res.status(404).json({msg: "Product not found"})
        else return res.status(200).json(product)
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req, res, next) => {
    try{
        const { pid } = req.params;
        const response = await service.updateProduct(pid, req.body);
        if (!response) return res.status(404).json({ msg: "Product not found" });
        else {
            const products = await service.getProducts();          
            return res.status(200).json(response)    
        };        
    } catch (error) {
        next(error);
    }
}

export const deleteProduct  = async (req, res, next) => {
    try{
        const { pid } = req.params;
        const response = await service.deleteProduct(pid);
        if (!response) return res.status(404).json({ msg: "Product not found" });
        else {
            const products = await service.getProducts();         
            return res.status(200).json(response)   
        };;
    } catch (error) {
        next(error);
    }
}