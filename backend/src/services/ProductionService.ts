import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';
import { IProduction } from '../interfaces/productionInterfaces';
import { ProductService } from './ProductService';
import { RawMaterialService } from './RawMaterialService';

class ProductionService {
  private db: PrismaClient;
  private rawMaterialService: RawMaterialService;
  private productService: ProductService;

  constructor() {
    this.db = prismaClient;
    this.rawMaterialService = new RawMaterialService();
    this.productService = new ProductService();
  }

  public async getProduction(): Promise<IProduction[]> {
    const rawMaterials = await this.rawMaterialService.findAll();

    const products = await this.productService.findAll();

    const rawMaterialsOnProducts =
      await this.db.rawMaterialsOnProducts.findMany();

    const result = products.map((product) => {
      const quantities = [];

      for (const row of rawMaterialsOnProducts) {
        if (row.productId === product.code) {
          for (const rm of rawMaterials) {
            if (rm.code === row.rawMaterialId) {
              quantities.push(Math.floor(rm.quantity / row.quantity));
            }
          }
        }
      }
      const production = Math.min(...quantities);
      if (production < 1) return null;

      return {
        productName: product.name,
        price: Number(product.price),
        productsAmount: production,
        totalProductionValue: Number(product.price) * production,
      };
    });

    return result;
  }
}

export { ProductionService };
