import { Link } from 'react-router-dom';

export function Header() {
  return (
    <>
      <header>
        <nav className="flex items-center bg-gray-800 p-6 text-white">
          <Link to="/">
            <h1 className="font-bold">Autoflex</h1>
          </Link>
          <ul className="flex flex-col gap-3 items-end text-xs w-full mobile-g2:text-base mobile-g2:flex-row mobile-g:justify-end">
            <li className="">
              <Link
                to="/"
                className="border px-4 py-1 rounded-md hover:text-gray-800 hover:bg-white transition-all"
              >
                Raw Materials
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="border px-4 py-1 rounded-md hover:text-gray-800 hover:bg-white transition-all"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                to="/production"
                className="border px-4 py-1 rounded-md hover:text-gray-800 hover:bg-white transition-all"
              >
                Production
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
