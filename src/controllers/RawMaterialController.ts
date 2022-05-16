import { NextFunction, Request, Response } from 'express';
import { IRawMaterial } from '../interfaces/rawMaterialInterfaces';
import { RawMaterialService } from '../services/RawMaterialService';

class RawMaterialController {
  public async create(req: Request, res: Response, next: NextFunction) {
    const rawMaterialService = new RawMaterialService();

    try {
      const { name, quantity }: IRawMaterial = req.body;
      const newRawMaterial = await rawMaterialService.create({
        name,
        quantity,
      });

      if (!newRawMaterial) {
        return res.status(400).json({
          message: `The raw-material "${name}" is already registered`,
        });
      }

      return res.status(201).json(newRawMaterial);
    } catch (err) {
      next(err);
    }
  }
}

export { RawMaterialController };
