import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    navigate('/menu');
  };

  const handleHowItWorks = () => {
    navigate('/how-it-works');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 px-4 py-16 sm:px-6 lg:px-8">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto text-center">
        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          See Your Meal
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
            Before You Order
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
          Experience the future of dining with augmented reality
        </p>
        
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Visualize every dish in stunning 3D detail right on your table. No surprises, just delicious food you can see, rotate, and explore before making your choice.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleViewMenu}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            View Menu
          </button>
          
          <button
            onClick={handleHowItWorks}
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out border-2 border-gray-200 hover:border-amber-500"
          >
            How It Works
          </button>
        </div>

        {/* Features highlight */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Scan QR Code</h3>
            <p className="text-gray-600 text-sm">Simply scan the code on your table to get started</p>
          </div>
          
          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl mb-3">🍽️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">View in 3D</h3>
            <p className="text-gray-600 text-sm">See realistic 3D models of every dish</p>
          </div>
          
          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Confidently</h3>
            <p className="text-gray-600 text-sm">Know exactly what you're getting</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;