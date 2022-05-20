import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

type Props = {
  code: number;
  name: string;
  quantity: number;
};

export function RawMaterial({ code, name, quantity }: Props) {
  return (
    <div className="flex justify-around items-center w-11/12 py-2 my-1 rounded-md bg-gray-700 text-white md:w-3/4 xl:w-[1024px]">
      <div className="bg-white text-sm text-black px-2 rounded-full mobile-g:text-base">
        {code < 10 ? `#00${code}` : `#0${code}`}
      </div>

      <div className="w-2/5 flex flex-col center text-sm mobile-g:text-base">
        <h3>
          <strong>{name}</strong>
        </h3>
        <p>
          in stock: <strong>{quantity}</strong>
        </p>
      </div>

      <div className="w-1/5 flex justify-around md:w-20">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="text-lg hover:text-yellow-200 hover:cursor-pointer transition-all duration-150 mobile-g:text-2xl"
        />
        <FontAwesomeIcon
          icon={faTrashCan}
          className="text-lg text-red-400 hover:text-red-600 hover:cursor-pointer transition-all duration-150 mobile-g:text-2xl"
        />
      </div>
    </div>
  );
}
