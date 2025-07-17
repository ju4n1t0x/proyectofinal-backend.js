import {Producto} from "../models/productModels.js";


export class ProductService{
    
static getAll = async() => {
    return await Producto.getAllProducts();
}

static getProductById = async(id) => {
    return await Producto.getProductById(id);
};

static createProduct = async(product) => {
    return await Producto.createProduct(product);
};

static deleteProduct = async(id) => {
    return await Producto.deleteProduct(id);
};



}