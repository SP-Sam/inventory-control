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

  private async findByCode(code: number): Promise<boolean> {
    const foundRawMaterial = await this.db.rawMaterial.findUnique({
      where: { code },
    });

    if (foundRawMaterial) return true;

    return false;
  }

  public async findByName(name: string): Promise<boolean> {
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

  public async update(
    code: number,
    rawMaterial: IRawMaterial
  ): Promise<RawMaterial | null> {
    const rawMaterialExists = await this.findByCode(code);
    if (!rawMaterialExists) return null;

    const changedRawMaterial = await this.db.rawMaterial.update({
      where: { code },
      data: {
        name: rawMaterial.name,
        quantity: rawMaterial.quantity,
      },
    });

    return changedRawMaterial;
  }

  public async remove(code: number): Promise<RawMaterial> {
    const rawMaterialExists = await this.findByCode(code);
    if (!rawMaterialExists) return null;

    const rawMaterial = await this.db.rawMaterial.delete({ where: { code } });

    return rawMaterial;
  }
}

export { RawMaterialService };
