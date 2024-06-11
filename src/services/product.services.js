import ProductDaoMongo from '../daos/mongodb/product.dao.js';
const prodDao = new ProductDaoMongo();

export const getProducts = async (limit, page, query, sort) => {
    try {
        let sortFilter = {};
        if (sort === `asc`) sortFilter= {price: `asc`};
        else if (sort === `desc`) sortFilter= {price: `desc`};

        let queryFilter = {}
        if (query) queryFilter = {category: `${query}` }        //Categoria o disponibilidad??
        const products = await prodDao.getProducts(limit, page, queryFilter, sortFilter);
        const status = 'success'

        const baseUrl = 'http://localhost:8080/api/products';
        
        const createLink = (page) => {
            const params = new URLSearchParams({ 
                limit,
                page,
                sort,
                query 
            });
            return `${baseUrl}?${params.toString()}`;
        };
        

        if(!products) status = 'error'
        let response = {
            status: status,
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? createLink(products.prevPage) : null,
            nextLink: products.hasNextPage ? createLink(products.nextPage) : null

        }
        
        return response

        
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