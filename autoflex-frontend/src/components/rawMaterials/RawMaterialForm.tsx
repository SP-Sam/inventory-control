import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { INewRawMaterial } from '../../interfaces/rawMaterialsInterfaces';
import { createNewRawMaterial } from '../../redux/rawMaterialSlice';
import { postRawMaterial } from '../../utils/fetchRawMaterials';

export function RawMaterialForm() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (name.length < 4 || Number(quantity) < 1) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [name, quantity]);

  function changeName({ target }: ChangeEvent<HTMLInputElement>) {
    setName(target.value);
  }

  function changeQuantity({ target }: ChangeEvent<HTMLInputElement>) {
    if (Number(target.value) < 1) {
      setQuantity('');
    } else {
      setQuantity(target.value);
    }
  }

  function createRawMaterial(
    event: FormEvent<HTMLFormElement>,
    rm: INewRawMaterial,
  ) {
    event.preventDefault();
    postRawMaterial(rm)
      .then(res => {
        dispatch(createNewRawMaterial(res));
      })
      .catch(({ response: { data } }) => {
        alert(data.message);
      });
  }

  return (
    <form
      method="post"
      onSubmit={e => createRawMaterial(e, { name, quantity: Number(quantity) })}
      className="w-11/12 border border-gray-400 flex flex-col p-2 rounded-md mb-4 text-gray-800 md:w-3/4 xl:w-[1024px]"
    >
      <input
        type="text"
        id="rm-name"
        placeholder="Name of raw material"
        onChange={changeName}
        value={name}
        className="border border-gray-400 focus:outline-none focus:ring focus:ring-gray-400 p-1.5 text-gray-800 rounded-md mb-1.5"
      />
      <input
        type="number"
        id="quantity"
        onChange={changeQuantity}
        value={quantity}
        placeholder="Quantity of raw material"
        className="border border-gray-400 focus:outline-none focus:ring focus:ring-gray-400 p-1.5 text-gray-800 rounded-md mb-1.5"
      />
      <button
        type="submit"
        disabled={isButtonDisabled}
        className="border rounded-md font-bold bg-gray-700 text-white py-2 hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Register Raw Material
      </button>
    </form>
  );
}
