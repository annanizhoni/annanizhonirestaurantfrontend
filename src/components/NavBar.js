import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext'; // Make sure this path is correct based on your project structure
import { PiShoppingCartSimpleThin } from 'react-icons/pi';

const NavBar = () => {
  const { cartCount } = useCart(); // Get cartCount from the context

  return (
    <nav className="flex items-center justify-between flex-wrap p-6 bg-gradient-to-b from-neutral-400 to-white">
      <div className="flex items-center flex-shrink-0 text-neutral-600 mr-6">
      <Link to="/" className="font-semibold text-xl tracking-tight">The Yucca Blossom</Link>
      </div>
      <div className="block lg:flex lg:items-center lg:w-auto">
        <div>
          <Link to="/menu" className="inline-block text-black hover:text-white mr-4">
            Menu
          </Link>
          <Link to="/about" className="inline-block text-black hover:text-white mr-4">
            About
          </Link>
          <Link to="/contact" className="inline-block text-black hover:text-white mr-4">
            Contact
          </Link>
          <Link to="/cart" className="inline-block text-black hover:text-white relative top-1">
  <PiShoppingCartSimpleThin className="h-6 w-6" />
  {cartCount > 0 && (
    <span className="absolute top-0 right-0 block h-2 w-2 bg-red-600 rounded-full"></span>
  )}
</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
