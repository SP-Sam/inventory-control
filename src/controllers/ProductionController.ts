import { NextFunction, Request, Response } from 'express';
import { ProductionService } from '../services/ProductionService';

class ProductionController {
  public async getProduction(req: Request, res: Response, next: NextFunction) {
    const productionService = new ProductionService();

    try {
      const production = await productionService.getProduction();

      return res.status(200).json(production);
    } catch (err) {
      next(err);
    }
  }
}

export { ProductionController };
