
import {Router} from 'express';
import {ProductController} from '../controllers/productController.js';
import {authentication} from '../middlewares/authentication.js';

const productsRouter = Router();

productsRouter.get('/', ProductController.getProducts);
productsRouter.get('/:id',  ProductController.getProductById);
productsRouter.post('/create', authentication, ProductController.createProduct);
productsRouter.delete('/:id', authentication, ProductController.deleteProduct);
productsRouter.put('/id', authentication, ProductController.updateProduct);

export default productsRouter;

