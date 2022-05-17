import { PrismaClient, Product } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';
import { IProduct } from '../interfaces/productInterfaces';
import { IRawMaterial } from '../interfaces/rawMaterialInterfaces';
import { RawMaterialService } from './RawMaterialService';

class ProductService {
  private db: PrismaClient;
  private rawMaterialService: RawMaterialService;

  constructor() {
    this.db = prismaClient;
    this.rawMaterialService = new RawMaterialService();
  }

  public async create(newProduct: IProduct): Promise<Product | null | string> {
    const productExists = await this.findByName(newProduct.name);
    if (productExists) return null;

    const rawMaterials: IRawMaterial[] = newProduct.rawMaterials.map(
      (item) => ({
        name: item.name,
        quantity: item.quantity,
      })
    );

    const isRawMaterialsValid = await this.verifyRawMaterials(rawMaterials);

    if (!isRawMaterialsValid) return 'All raw-materials must be registered';

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
      include: {
        rawMaterials: true,
      },
    });

    return createdProduct;
  }

  private async findByName(name: string): Promise<boolean> {
    const foundProduct = await this.db.product.findFirst({ where: { name } });

    if (foundProduct) return true;

    return false;
  }

  private async verifyRawMaterials(
    rawMaterials: IRawMaterial[]
  ): Promise<boolean> {
    const hasAllRawMaterials = [];

    for (const item of rawMaterials) {
      const rawMaterialExists = await this.rawMaterialService.findByName(
        item.name
      );
      hasAllRawMaterials.push(rawMaterialExists);
    }

    const isRawMaterialsValid = hasAllRawMaterials.every(
      (item) => item === true
    );

    return isRawMaterialsValid;
  }
}

export { ProductService };
