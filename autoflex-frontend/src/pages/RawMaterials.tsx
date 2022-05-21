import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RawMaterialCard } from '../components/rawMaterials/RawMaterialCard';
import { RawMaterialForm } from '../components/rawMaterials/RawMaterialForm';
import {
  initRawMaterials,
  selectRawMaterials,
} from '../redux/rawMaterialSlice';
import { getRawMaterials } from '../utils/fetchRawMaterials';

export function RawMaterials() {
  const dispatch = useDispatch();
  const rawMaterials = useSelector(selectRawMaterials);

  useEffect(() => {
    getRawMaterials().then(data => {
      dispatch(initRawMaterials(data));
    });
  }, []);

  return (
    <main className="h-full pt-32 mobile-g2:pt-20 pb-4 flex flex-col items-center">
      <RawMaterialForm />

      <ul className="w-full">
        {rawMaterials.map(rm => (
          <li key={rm.code} className="flex justify-center">
            <RawMaterialCard
              code={rm.code}
              name={rm.name}
              quantity={rm.quantity}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
