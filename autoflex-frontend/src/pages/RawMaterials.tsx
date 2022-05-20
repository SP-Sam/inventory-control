import { useEffect, useState } from 'react';
import { RawMaterial } from '../components/RawMaterial';
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
    <ul className="my-4">
      {rawMaterials.map(rm => (
        <li key={rm.code} className="flex justify-center">
          <RawMaterial code={rm.code} name={rm.name} quantity={rm.quantity} />
        </li>
      ))}
    </ul>
  );
}
