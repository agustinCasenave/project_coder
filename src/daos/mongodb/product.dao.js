import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongo{
    async getProducts(limit){
        try {
            return await ProductModel.find({}).limit(limit);
        } catch (error) {
            throw new Error(error);
        }
    }

    async createProduct(obj){
        try {
            return await ProductModel.create(obj);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getProductById(id){
        try{
            return await ProductModel.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(id, product){
        try{
            return await ProductModel.findByIdAndUpdate(id, product, {
                new: true,
              });            
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProduct(id){
        try{
            return await ProductModel.findByIdAndDelete(id, {
                new: true,
              });
        } catch (error) {
            throw new Error(error);
        }
    }
}