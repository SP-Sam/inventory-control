import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const productRouter = Router();

const productController = new ProductController();

productRouter.post('/', productController.create);
productRouter.get('/', productController.findAll);
productRouter.put('/:code', productController.update);
productRouter.delete('/:code', productController.remove);

export { productRouter };
