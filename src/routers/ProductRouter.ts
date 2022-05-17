import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const productRouter = Router();

const productController = new ProductController();

productRouter.post('/', productController.create);
productRouter.delete('/:code', productController.remove);

export { productRouter };
