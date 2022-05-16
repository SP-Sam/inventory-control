import { NextFunction, Request, Response } from 'express';
import { IProduct } from '../interfaces/productInterfaces';
import { ProductService } from '../services/ProductService';

class ProductController {
  public async create(req: Request, res: Response, next: NextFunction) {
    const productService = new ProductService();

    try {
      const { name, price, rawMaterials }: IProduct = req.body;

      const newProduct = await productService.create({
        name,
        price,
        rawMaterials,
      });

      if (!newProduct) {
        return res
          .status(400)
          .json({ message: `The product "${name}" is already registered` });
      }

      return res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  }
}

export { ProductController };
