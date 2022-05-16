import { PrismaClient, Product } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';
import { IProduct } from '../interfaces/productInterfaces';
import { IRawMaterial } from '../interfaces/rawMaterialInterfaces';

class ProductService {
  private db: PrismaClient;

  constructor() {
    this.db = prismaClient;
  }

  public async create(newProduct: IProduct): Promise<Product> {
    const rawMaterials: IRawMaterial[] = newProduct.rawMaterials.map(
      (item) => ({
        name: item.name,
        quantity: item.quantity,
      })
    );

    const createdProduct = await this.db.product.create({
      data: {
        name: newProduct.name,
        price: newProduct.price,
        rawMaterials: {
          create: rawMaterials.map((item) => {
            const rawMaterial = {
              create: {
                name: item.name,
                quantity: item.quantity,
              },
            };

            return { rawMaterial };
          }),
        },
      },
    });

    return createdProduct;
  }
}

export { ProductService };
