import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongo {
    async getCarts(){
        try {
            return await CartModel.find({})
        } catch (error) {
            throw new Error(error);
        }
    }

    async getCartById(id){
        try {
            return await CartModel.findById(id);
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
            }).populate('products.product');
        } catch (error) {
            throw new Error(error);
        }
    }

    async addExistingProductToCart (id, productId){
        return await CartModel.findOneAndUpdate(
            { _id: id, 'products.product': productId },
            { $inc: { 'products.$.quantity': 1 } },
            { new: true }
        ).populate('products.product');
    }
}