import * as service from "../services/cart.service.js";

export const getCarts = async (req,res) =>{
    try {
        return await cartDao.getCarts()
    } catch (error) {
        throw new Error(error);
    }
}

export const getCartById = async (req,res) => {
    try {
        const { cid } = req.params
        const cart = await service.getCartById(cid)
        if(!cart) res.status(404).json({msg: "Cart not found"})
        else {
            res.status(200).json(cart)
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const createCart = async (req,res) => {
    try {
        const cart = await service.createCart();
        if(!cart) res.status(404).json({"msg": "Cart not created"});
        else res.status(200).json(cart);
    } catch (error) {
        throw new Error(error);          
    }
}

export const addProductToCart = async (req,res) => {
    try {
        const { cid } = req.params
        const { pid } = req.params
        const cart = await service.addProductToCart(cid, pid);
        if (!cart) res.status(404).json({"msg": "Cart not found"});
        else res.status(200).json(cart);
    } catch (error) {
        throw new Error(error);  
    }
}

export const deleteProductFromCart = async (req,res) => {
    try {
        const { cid } = req.params
        const { pid } = req.params
        const cart = await service.deleteProductFromCart(cid, pid);
        if (!cart) res.status(404).json({"msg": "Cart not found"});
        else res.status(200).json(cart);
    } catch (error) {
        throw new Error(error); 
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const { cid } = req.params
        const { pid } = req.params
        const { quantity } = req.body
        const cart = await service.updateQuantity(cid, pid, quantity);
        if (!cart) res.status(404).json({"msg": "Cart not found"});
        else res.status(200).json(cart);
    } catch (error) {
        throw new Error(error); 
    }
}

export const deleteCart = async (req,res) => {
    try {
        const { cid } = req.params
        const cart = await service.deleteCart(cid);
        if (!cart) res.status(404).json({"msg": "Cart not found"});
        else res.status(200).json(cart);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateCart = async (req, res) =>{
    try {
        const { cid } = req.params
        const products = req.body
        const cart = await service.updateCart(cid, products);
        if (!cart) res.status(404).json({"msg": "Cart not found"});
        else res.status(200).json(cart);
    } catch (error) {
        throw new Error(error); 
    }
}