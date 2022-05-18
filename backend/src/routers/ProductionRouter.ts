import { Router } from 'express';
import { ProductionController } from '../controllers/ProductionController';

const productionRouter = Router();

const productionController = new ProductionController();

productionRouter.get('/', productionController.getProduction);

export { productionRouter };
