import { Router } from 'express';
import { RawMaterialController } from '../controllers/RawMaterialController';

const rawMaterialRouter = Router();

const rawMaterialController = new RawMaterialController();

rawMaterialRouter.post('/', rawMaterialController.create);

export { rawMaterialRouter };
