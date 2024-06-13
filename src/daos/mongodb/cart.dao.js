import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongo {
    async getCarts(){
        try {
            return await CartModel.find({})
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(cartId, cart){
        try {
            console.log(cart);
            return await CartModel.findByIdAndUpdate(cartId, cart, {new: true})
        } catch (error) {
            throw new Error(error);
        }
    }

    async getCartById(id){
        try {
            const cart = await CartModel.findById(id).populate("products.product");
            return cart
        } catch (error) {
            throw new Error(error);
        }
    }

    async createCart(){
        try {
            const obj = {
                products: []
            }
            return await CartModel.create(obj);
        } catch (error) {
            throw new Error(error);
        }
    }

    async addNewProductToCart(id, productId){
        try {
            return await CartModel.findByIdAndUpdate(id,{
                        $push: {
                            products: {
                                product: productId
                            }
                        }
                    }, {
                        new: true,
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    async addExistingProductToCart (id, productId){
        return await CartModel.findOneAndUpdate(
            { _id: id, 'products.product': productId },
            { $inc: { 'products.$.quantity': 1 } },
            { new: true }
        )
    }

    async deleteProductFromCart(id, productId){
        try {
            return await CartModel.findByIdAndUpdate(id,{
                $pull: {
                    products: {
                        product: productId
                    }
                }
            }, {
                new: true,
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateQuantity(id, productId, quantity) {
        try {
            return await CartModel.findOneAndUpdate(
                { _id: id, 'products.product': productId },
                { $set: { 'products.$.quantity': quantity } },
                { new: true }
            )
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteCart(id){
        try{
            return await CartModel.findOneAndUpdate(
                { _id: id},
                { $set: { 'products': [] } },
                { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }
}