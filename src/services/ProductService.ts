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

    const isRawMaterialsValid = await this.verifyRawMaterials(
      newProduct.rawMaterials
    );
    if (!isRawMaterialsValid) return 'All raw-materials must be registered';

    const createdProduct = await this.db.product.create({
      data: {
        name: newProduct.name,
        price: newProduct.price,
        rawMaterials: {
          create: newProduct.rawMaterials.map((item) => {
            const rawMaterial = {
              connect: {
                name: item.name,
              },
            };

            return { rawMaterial, quantity: item.quantity };
          }),
        },
      },
    });

    return createdProduct;
  }

  public async findAll(): Promise<Product[]> {
    const products = await this.db.product.findMany({
      include: {
        rawMaterials: {
          select: {
            rawMaterialId: true,
            quantity: true,
          },
        },
      },
    });

    return products;
  }

  public async update(
    code: number,
    newProduct: { name: string; price: number }
  ): Promise<Product | null> {
    const productExists = await this.findByCode(code);
    if (!productExists) return null;

    const changedProduct = await this.db.product.update({
      where: { code },
      data: {
        name: newProduct.name,
        price: newProduct.price,
      },
    });

    return changedProduct;
  }

  public async remove(code: number): Promise<Product | null> {
    const productExists = await this.findByCode(code);
    if (!productExists) return null;

    const product = await this.db.product.delete({ where: { code } });

    return product;
  }

  private async findByName(name: string): Promise<boolean> {
    const foundProduct = await this.db.product.findFirst({ where: { name } });

    if (foundProduct) return true;

    return false;
  }

  private async findByCode(code: number): Promise<boolean> {
    const foundProduct = await this.db.product.findUnique({ where: { code } });

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
