import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: ReactNode;
  to: string;
};

export function HeaderLink({ children, to }: Props) {
  return (
    <Link
      to={to}
      className="border px-4 py-1 rounded-md hover:text-gray-800 hover:bg-white transition-all"
    >
      {children}
    </Link>
  );
}
