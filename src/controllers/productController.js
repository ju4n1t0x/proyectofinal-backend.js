import {ProductService} from '../services/productService.js';

export class ProductController{
    
static getProducts = async(req, res) =>{
    try{
        const products = await ProductService.getAll();
        if(products.length === 0){
            return res.status(404).json({message: "No se encontraron productos disponibles"});
        }
        // Si hay productos, los devolvemos
        res.status(200).json({message: "Listado de productos", payload: products});
    }catch (error){
        res
        .status(500)
        .json({message: "Error interno del servidor", error: error.message});
    }
};

static getProductById = async (req, res) =>{
    try{
        const product = await ProductService.getProductById(req.params.id);
        res.status(200).json({message: "Producto encontrado", payload: product});
    }catch (error){
        res
        .status(500)
        .json({message: "Error interno del servidor", error: error.message});
    }
};

static createProduct = async (req, res) => {
    try{
        const { nombre, precio, disponible} = req.body;
        if( !nombre || !precio || !disponible){
            return res.status(400).json({message: "Faltan campos obligatorios"});
        }
        if (typeof precio !== 'number' || typeof disponible !== 'boolean') {
            return res.status(400).json({message: "Tipo de dato incorrecto"});
        }
        const newProduct = await ProductService.createProduct(req.body);
        res.status(201).json({message: "Producto creado con exito", payload: {id: newProduct.id, ...newProduct.body}});
    }catch (error){
        res
        .status(500)
        .json({message: "Error interno del servidor", error: error.message});
    }
}

static deleteProduct = async (req, res) => {
    try{
        const product = await ProductService.deleteProduct(req.params.id);
        if (!product) {
            return res.status(400).json({message: "Producto no encontrado"});
        }
        res.status(200).json({message: "Producto eliminado con exito", payload: product});
    }catch (error){
        res
        .status(500)
        .json({message: "Error interno del servidor", error: error.message});
    }
    
};

static updateProduct = async (req, res) => {
    try{
        const {precio, disponible, nombre} = req.body;
       if (typeof precio !== 'undefined' && typeof precio !== 'number') {
            return res.status(400).json({message: "Tipo de dato incorrecto para precio"});
        }
        if (typeof disponible !== 'undefined' && typeof disponible !== 'boolean') {
            return res.status(400).json({message: "Tipo de dato incorrecto para disponible"});
        }
        if (typeof nombre !== 'undefined' && typeof nombre !== 'string') {
            return res.status(400).json({message: "Tipo de dato incorrecto para nombre"});
        }
        const product = await ProductService.updateProduct(req.params.id, req.body);
        
        if (!product) {
            return res.status(404).json({message: "Producto no encontrado"});
        }
        
        res.status(200).json({message: "Producto actualizado con exito", payload: product});
    }catch (error){
        res
        .status(500)
        .json({message: "Error interno del servidor", error: error.message});
    }
    
};
    
}

