import * as service from "../services/cart.services.js";

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
        console.log(error);
        res.status(500).send(error.message);   
    }
}

export const createCart = async (req,res) => {
    try {
        const cart = await service.createCart();
        if(!cart) res.status(404).json({"msg": "Cart not created"});
        else res.status(200).json(cart);
    } catch (error) {
        res.status(500).send(error.message);           
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
        res.status(500).send(error.message);   
    }
}