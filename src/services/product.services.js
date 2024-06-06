import ProductDaoMongo from '../daos/mongodb/product.dao.js';
const prodDao = new ProductDaoMongo();

// import { __dirname } from '../utils.js';
// import ProductDaoFS from '../daos/filesystem/product.dao.js';
// const prodDao = new ProductDaoFS(`${__dirname}/daos/filesystem/products.json`);

export const getProducts = async (limit) => {
    try {
        return await prodDao.getProducts(limit);
    } catch (error) {
        throw new Error(error);
    }
}

export const createProduct = async (obj) => {
    try {
        return await prodDao.createProduct(obj);
    } catch (error) {
        throw new Error(error);
    }
}

export const getProductById = async (id) => {
    try{
        return await prodDao.getProductById(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProduct = async (id, product) => {
    try{
        return await prodDao.updateProduct(id, product);            
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProduct  = async (id) => {
    try{
        return await prodDao.deleteProduct(id);
    } catch (error) {
        throw new Error(error);
    }
}