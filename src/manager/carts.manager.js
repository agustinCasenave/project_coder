import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

export class CartManager {
    constructor(path){
        this.path = path;
    }
    
    async getCarts(){
        try {
            if(fs.existsSync(this.path)){
               const cartsFile = await fs.promises.readFile(this.path, "utf8");
               return JSON.parse(cartsFile)
            } else return [];   
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(id){
        try {
            const cartsFile = await this.getCarts()
            if(cartsFile.some(cart => cart.id == id)){
                return cartsFile.find(cart => cart.id == id);
            } else {
                return null
            }  
        } catch (error) {
            console.log(error);
            return null
        }
    }
    #getNextId(){
        return uuidv4()
    }

    async createCart(){
        try {
            const cartsFile = await this.getCarts()
            const newCart = {
                id: this.#getNextId(),
                products: []
            }
            cartsFile.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
            return newCart;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async addProductToCart(id, productId){
        try {
                
            const cartsFile = await this.getCarts()
            const cart = cartsFile.find(cart => cart.id == id);
            console.log(cart.products);
            if (cart){
                if(!cart.products.some(product => product.id == productId)){                                                   //If not product, add it
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

                    const indexCart = cartsFile.findIndex(cart => cart.id == id);
                    cartsFile[indexCart] = cart
                }
                await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
                return cart;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }
}