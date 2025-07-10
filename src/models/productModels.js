import {db} from '../config/dotEnv.js';
import {collection, getDocs, getDoc, setDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';

const productsCollection = collection(db, 'products');


export class Producto{
    
    constructor(id, nombre, precio, disponible){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.disponible = disponible;
    }
  

static getAllProducts = async () => {
    const getAllProducts = await getDocs(productsCollection);
    const products = getAllProducts.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return products;
};

static getProductById = async (id) => {
    const productById = await getDoc(doc(productsCollection, id));
    return productById.data();
};

static createProduct = async (product) => {
    if(!product.id){
        throw new Error('El id del producto es invalido');
    }
     await setDoc(doc(productsCollection, product.id.toString()), product);
    return product;
};

static deleteProduct = async (id) =>{
    const productById = await getDoc(doc(productsCollection, id));
    if(!productById.exists()){
        throw new Error('Producto no encontrado');
    }
    await deleteDoc(doc(productsCollection, id));
    return true;
};

static updateProduct = async (id, product) =>{
    const productById = await getDoc(doc(productsCollection, id));
    if(!productById.exists()){
        throw new Error('Producto no encontrado');
    }
    await updateDoc(doc(productsCollection, id), product);
    return true;
}
};


