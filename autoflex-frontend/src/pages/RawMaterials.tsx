import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RawMaterialCard } from '../components/RawMaterialCard';
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
    <main>
      <ul className="my-4">
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
