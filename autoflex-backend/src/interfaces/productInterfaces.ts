import { IRawMaterial } from './rawMaterialInterfaces';

export interface IProduct {
  code?: number;
  name: string;
  price: number;
  rawMaterials: IRawMaterial[];
}
