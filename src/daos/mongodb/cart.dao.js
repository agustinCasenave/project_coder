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
            obj = {
                products: []
            }
            return await CartModel.create(obj);
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProductToCart(id, productId){
        try {
            const obj = await CartModel.findById(id)
            if (obj) {
                obj.products.push(productId);
                return await obj.save()
            } else {
                return null
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}