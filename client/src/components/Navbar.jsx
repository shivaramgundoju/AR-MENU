import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-md animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-primary hover:scale-105 transition-transform duration-300">
            AR Menu
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-all duration-300 hover:scale-110">
              Home
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-primary transition-all duration-300 hover:scale-110">
              Menu
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-all duration-300 hover:scale-110">
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={closeMenu}
                className="text-gray-700 hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                Home
              </Link>
              <Link
                to="/menu"
                onClick={closeMenu}
                className="text-gray-700 hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                Menu
              </Link>
              <Link
                to="/about"
                onClick={closeMenu}
                className="text-gray-700 hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;