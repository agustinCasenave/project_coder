import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

export class ProductManager{
    constructor(path){
        this.path = path;
    }

    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
               const productsFile = await fs.promises.readFile(this.path, "utf8");
               return JSON.parse(productsFile)
            } else return [];   
        } catch (error) {
            throw new Error(error);
        }
    }

    #getNextId(){
        return uuidv4()
    }


    async createProduct(obj){
        try {
            const productsFile = await this.getProducts();
            if(!productsFile.some(product => product.code == obj.code)){
                let thumbnails1 = []
                if (obj.thumbnails){ 
                    thumbnails1 =  thumbnails
                }
                productsFile.push(obj);
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                return product;
            } else{
                return null;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getProductById(id){
        try{
            const productsFile = await this.getProducts();
            if(productsFile.some(product => product.id == id)){
                return productsFile.find(product => product.id == id);
            } else {
                return null
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(id, product){
        try{
            const productsFile = await this.getProducts();
            if(productsFile.some(product_cb => product_cb.id === id)){
                const index = productsFile.findIndex(product => product.id == id);
                const existingProduct = productsFile[index]
                productsFile[index] = {
                    ...existingProduct,
                    ...product,
                    id: id,
                };
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                return productsFile[index]
            } else {
                return null
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProduct(id){
        try{
            const productsFile = await this.getProducts();
            if(productsFile.some(product => product.id == id)){
                const index = productsFile.findIndex(product => product.id == id);
                product = productsFile.splice(index, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                return product
            } else {
                return null
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}