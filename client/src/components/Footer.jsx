import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="animate-fade-in-up animation-delay-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">AR Menu</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Experience food in augmented reality. See your meal before you order.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up animation-delay-400">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/menu" 
                  className="text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm inline-block"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm inline-block"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="animate-fade-in-up animation-delay-600">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#faq" 
                  className="text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm inline-block"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="#help" 
                  className="text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm inline-block"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a 
                  href="#privacy" 
                  className="text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm inline-block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#terms" 
                  className="text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm inline-block"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fade-in-up animation-delay-800">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="text-gray-600 text-sm">abc Restaurant</li>
              <li className="text-gray-600 text-sm">Hyderabad</li>
              <li>
                <a 
                  href="mailto:contact@armenu.com" 
                  className="text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm inline-block"
                >
                  contact@armenu.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+919876543210" 
                  className="text-gray-600 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm inline-block"
                >
                  +91 9876543210
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 animate-fade-in animation-delay-800">
          <p className="text-center text-gray-500 text-sm">
            © 2025 AR Menu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;