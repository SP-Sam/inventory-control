import { PrismaClient, RawMaterial } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';
import { IRawMaterial } from '../interfaces/rawMaterialInterfaces';

class RawMaterialService {
  private db: PrismaClient;

  constructor() {
    this.db = prismaClient;
  }

  public async create(
    newRawMaterial: IRawMaterial
  ): Promise<RawMaterial | null> {
    const rawMaterialExists = await this.findByName(newRawMaterial.name);
    if (rawMaterialExists) return null;

    const createdRawMaterial = await this.db.rawMaterial.create({
      data: {
        name: newRawMaterial.name,
        quantity: newRawMaterial.quantity,
      },
    });

    return createdRawMaterial;
  }

  private async findByName(name: string): Promise<boolean> {
    const foundRawMaterial = await this.db.rawMaterial.findFirst({
      where: { name },
    });

    if (foundRawMaterial) return true;

    return false;
  }

  public async findAll(): Promise<RawMaterial[] | null> {
    const rawMaterials = await this.db.rawMaterial.findMany();

    return rawMaterials;
  }

  public async remove(code: number): Promise<RawMaterial> {
    const rawMaterialExists = await this.findByCode(code);
    if (!rawMaterialExists) return null;

    const rawMaterial = await this.db.rawMaterial.delete({ where: { code } });

    return rawMaterial;
  }

  private async findByCode(code: number): Promise<boolean> {
    const foundRawMaterial = await this.db.rawMaterial.findUnique({
      where: { code },
    });

    if (foundRawMaterial) return true;

    return false;
  }
}

export { RawMaterialService };
