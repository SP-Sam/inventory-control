import { NextFunction, Request, Response } from 'express';
import { RawMaterialService } from '../services/RawMaterialService';
import { IRawMaterial } from '../interfaces/rawMaterialInterfaces';

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

  public async findAll(_req: Request, res: Response, next: NextFunction) {
    const rawMaterialService = new RawMaterialService();

    try {
      const rawMaterials = await rawMaterialService.findAll();

      return res.status(200).json(rawMaterials);
    } catch (err) {
      next(err);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const rawMaterialService = new RawMaterialService();

    try {
      const { code } = req.params;
      const { name, quantity }: IRawMaterial = req.body;

      const changedRawMaterial = await rawMaterialService.update(Number(code), {
        name,
        quantity,
      });

      if (!changedRawMaterial) {
        return res
          .status(404)
          .json({ message: `raw-material with the code "${code}" not found` });
      }

      return res.status(200).json(changedRawMaterial);
    } catch (err) {
      next(err);
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    const rawMaterialService = new RawMaterialService();

    try {
      const { code } = req.params;
      const removedRawMaterial = await rawMaterialService.remove(Number(code));

      if (!removedRawMaterial) {
        return res
          .status(404)
          .json({ message: `raw-material with the code "${code}" not found` });
      }

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}

export { RawMaterialController };
