import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-amber-600">
            AR Menu
          </Link>
          <div className="flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-amber-600">
              Home
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-amber-600">
              Menu
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-amber-600">
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;