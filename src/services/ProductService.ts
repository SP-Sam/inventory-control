import { PrismaClient, Product } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';
import { IProduct } from '../interfaces/productInterfaces';
import { IRawMaterial } from '../interfaces/rawMaterialInterfaces';

class ProductService {
  private db: PrismaClient;

  constructor() {
    this.db = prismaClient;
  }

  public async create(newProduct: IProduct): Promise<Product | null> {
    const productExists = await this.findByName(newProduct.name);
    if (productExists) return null;

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
              connect: {
                name: item.name,
              },
            };

            return { rawMaterial };
          }),
        },
      },
    });

    return createdProduct;
  }

  private async findByName(name: string): Promise<boolean> {
    const foundProduct = await this.db.product.findFirst({ where: { name } });

    if (foundProduct) return true;

    return false;
  }
}

export { ProductService };