import { useEffect, useState } from 'react';
import { getRawMaterials } from '../utils/fetchRawMaterials';

interface IRawMaterial {
  code: number;
  name: string;
  quantity: number;
}

export function RawMaterials() {
  const [rawMaterials, setRawMaterials] = useState<IRawMaterial[]>([]);

  useEffect(() => {
    getRawMaterials().then(data => {
      setRawMaterials(data);
    });
  }, []);

  return (
    <ul>
      {rawMaterials.map(rm => {
        return (
          <li key={rm.code}>
            <p>Nome: {rm.name}</p>
            <p>Código: {rm.code}</p>
            <p>Quantity: {rm.quantity}</p>
          </li>
        );
      })}
    </ul>
  );
}
