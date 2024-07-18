import { ProductModel } from "../../models/product.model.js";

export default class ProductDaoMongo{
    async getProducts(limit = 10, page = 1, query={}, sort={}){
        try {
            /*Agregar sort y query*/
            console.log(query, limit, page, sort);
            return await ProductModel.paginate(query,{
                limit,
                page,
                sort
            });
        
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