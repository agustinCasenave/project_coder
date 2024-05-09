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
            console.log(error);
        }
    }

    #getNextId(){
        return uuidv4()
    }


    async createProduct(title, description, code, price, stock, category, thumbnails ){
        try {
            const productsFile = await this.getProducts();
            if(!productsFile.some(product => product.code == code)){
                let thumbnails1 = []
                if (thumbnails){ 
                    thumbnails1 =  thumbnails
                }
                let product = {
                    "id": this.#getNextId(),
                    "title": title,
                    "description":  description,
                    "code":  code,
                    "price":  price,
                    "status": true,
                    "stock":  stock,
                    "category": category,
                    "thumbnails":  thumbnails1
                }
                productsFile.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                return product;
            } else{
                return null;
            }
        } catch (error) {
            console.log(error);
            return null
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
            console.log(error);
            return null
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
                return 1
            } else {
                return null
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async deleteProduct(id){
        try{
            const productsFile = await this.getProducts();
            if(productsFile.some(product => product.id == id)){
                const index = productsFile.findIndex(product => product.id == id);
                productsFile.splice(index, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                return 1
            } else {
                return null
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }
}