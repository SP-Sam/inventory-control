import { Router } from 'express';
import { RawMaterialController } from '../controllers/RawMaterialController';

const rawMaterialRouter = Router();

const rawMaterialController = new RawMaterialController();

rawMaterialRouter.post('/', rawMaterialController.create);
rawMaterialRouter.get('/', rawMaterialController.findAll);
rawMaterialRouter.put('/:code', rawMaterialController.update);
rawMaterialRouter.delete('/:code', rawMaterialController.remove);

export { rawMaterialRouter };
