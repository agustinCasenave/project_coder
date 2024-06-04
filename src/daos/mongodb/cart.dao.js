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

    async addProductToCart(id, productId){
        try {
            const cart = await CartModel.findById(id)
            if (cart) {
                if(!cart.products.some(product => product.id == productId)){    //If not product, add it
                    cart.products.push({
                        id: productId,
                        quantity: 1
                    });
                } else {                                                        //If product, +1 quantity                
                    const indexProd = cart.products.findIndex(product => product.id == productId);
                    cart.products[indexProd] = {
                        id: productId,
                        quantity: cart.products[indexProd].quantity + 1
                    };
                }
                return await cart.save()
            } else {
                return null
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}