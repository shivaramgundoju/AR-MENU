import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import WhyChooseUs from '../components/WhyChooseUs';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const Home = () => {
  const navigate = useNavigate();
  const [popularDishes, setPopularDishes] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [popularError, setPopularError] = useState(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoadingPopular(true);
        const response = await fetch(`${API_BASE_URL}/api/dishes/popular?limit=3`);
        if (!response.ok) {
          throw new Error('Failed to fetch popular dishes');
        }
        const data = await response.json();
        setPopularDishes(data);
        setLoadingPopular(false);
      } catch (err) {
        setPopularError('Unable to load recommendations right now.');
        setLoadingPopular(false);
      }
    };

    fetchPopular();
  }, []);

  const handleViewInAR = (dishId) => {
    navigate(`/ar/${dishId}`);
  };

  return (
    <div>
      <HeroSection />

      {/* Most Ordered / Recommended Section */}
      <section className="bg-gray-50 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Most Ordered Dishes</h2>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                Recommended based on what customers view and order the most.
              </p>
            </div>
            <button
              onClick={() => navigate('/menu')}
              className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              View Full Menu
            </button>
          </div>

          {loadingPopular ? (
            <div className="text-center py-10 text-gray-500 text-sm">
              Loading recommendations...
            </div>
          ) : popularError ? (
            <div className="text-center py-10 text-red-500 text-sm">
              {popularError}
            </div>
          ) : popularDishes.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-sm">
              Recommendations will appear here once customers start exploring dishes.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularDishes.map((dish) => (
                <div
                  key={dish._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {dish.imageUrl && (
                    <div className="h-44 bg-gray-200 overflow-hidden">
                      <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{dish.name}</h3>
                      {dish.category && (
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">
                          {dish.category}
                        </span>
                      )}
                    </div>
                    {dish.description && (
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {dish.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-amber-600">₹{dish.price?.toFixed(2)}</span>
                      <button
                        onClick={() => handleViewInAR(dish._id)}
                        className="text-sm font-semibold text-primary hover:text-amber-700"
                      >
                        View in AR
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <WhyChooseUs />
    </div>
  );
};

export default Home;