import {db} from '../config/dotEnv.js';


const productsCollection = db.collection('products');


export class Producto{
    
    constructor(id, nombre, precio, disponible){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.disponible = disponible;
    }
  

static getAllProducts = async () => {
    const getAllProducts = await productsCollection.get();
    const products = getAllProducts.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return products;
};

static getProductById = async (id) => {
    const docRef = productsCollection.doc(id);
    const productById = await docRef.get();
    if (!productById.exists) {
        throw new Error('Producto no encontrado');
    }
    return productById.data();
};

static createProduct = async (product) => {
    
    const docRef = await productsCollection.add(product);
    return {id: docRef.id, ...product};
};

static deleteProduct = async (id) =>{
    const docRef = productsCollection.doc(id);
    const productById = await docRef.get();

    if(!productById.exists){
        return false;
    }
    await docRef.delete();
    return true;
};


};


