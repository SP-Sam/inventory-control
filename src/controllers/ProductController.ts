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
      if (typeof newProduct === 'string') {
        return res.status(400).json({ message: newProduct });
      }

      return res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  }

  public async findAll(_req: Request, res: Response, next: NextFunction) {
    const productService = new ProductService();

    try {
      const products = await productService.findAll();

      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    const productService = new ProductService();

    try {
      const { code } = req.params;

      const product = await productService.remove(Number(code));
      if (!product) {
        return res
          .status(400)
          .json({ message: `Product with the code "${code}" not found` });
      }

      return res
        .status(200)
        .json({ message: `"${product.name}" deleted successfully` });
    } catch (err) {
      next(err);
    }
  }
}

export { ProductController };
