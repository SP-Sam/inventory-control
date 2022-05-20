import { Link } from 'react-router-dom';
import { HeaderLink } from './HeaderLink';

export function Header() {
  return (
    <header>
      <nav className="flex items-center bg-gray-800 p-5 text-white">
        <Link to="/">
          <h1 className="font-bold">Autoflex</h1>
        </Link>
        <ul className="flex flex-col gap-3 items-end text-xs w-full mobile-g2:text-base mobile-g2:flex-row mobile-g:justify-end">
          <li>
            <HeaderLink to="/">Raw Materials</HeaderLink>
          </li>

          <li>
            <HeaderLink to="/products">Products</HeaderLink>
          </li>

          <li>
            <HeaderLink to="/production">Production</HeaderLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
