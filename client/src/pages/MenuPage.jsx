import React, { useState, useEffect } from "react";
import { Box, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const MenuPage = () => {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ["All", "Starters", "Main Course", "Desserts", "Beverages"];

  /* =============================
     FETCH DISHES FROM BACKEND
     ============================= */
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        // Try to use cached dishes for instant display
        const cached = localStorage.getItem("ar-menu-dishes-cache");
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed?.dishes)) {
              setDishes(parsed.dishes);
              setFilteredDishes(parsed.dishes);
              setLoading(false);
            }
          } catch (e) {
            // Ignore cache parse errors
          }
        } else {
          setLoading(true);
        }

        const response = await fetch(`${API_BASE_URL}/api/dishes`);

        if (!response.ok) {
          throw new Error("Failed to fetch dishes");
        }

        const data = await response.json();

        setDishes(data);
        setFilteredDishes(data);

        // Update cache with fresh data
        try {
          localStorage.setItem(
            "ar-menu-dishes-cache",
            JSON.stringify({ dishes: data, cachedAt: Date.now() })
          );
        } catch (e) {
          // Ignore cache write errors
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dishes. Please try again later.");
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  /* =============================
     SEARCH + CATEGORY FILTER
     ============================= */
  useEffect(() => {
    let result = dishes;

    if (selectedCategory !== "All") {
      result = result.filter(
        (dish) => dish.category === selectedCategory
      );
    }

    if (searchQuery.trim() !== "") {
      result = result.filter(
        (dish) =>
          dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dish.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDishes(result);
  }, [searchQuery, selectedCategory, dishes]);

  const handleViewInAR = (dishId) => {
    navigate(`/ar/${dishId}`);
  };

  /* =============================
     LOADING STATE
     ============================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading delicious dishes...</p>
        </div>
      </div>
    );
  }

  /* =============================
     ERROR STATE
     ============================= */
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 hero-gradient text-white rounded-lg shadow-lg hover:shadow-xl transition-all border-0"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* =============================
     MAIN UI
     ============================= */
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-down">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Menu
          </h1>
          <p className="text-base sm:text-lg text-gray-600 px-4">
            Explore our delicious dishes and view them in AR
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 sm:mb-8 animate-fade-in animation-delay-200">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-10 sm:pl-12 text-base sm:text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-amber-500 shadow-md transition-all duration-300"
            />
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 sm:mb-12 flex flex-wrap justify-center gap-2 sm:gap-3 animate-fade-in animation-delay-400">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-semibold shadow-md hover:shadow-lg transition-all ${
                selectedCategory === category
                  ? "hero-gradient text-white border-0"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold">No dishes found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((dish, index) => (
              <div
                key={dish._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image with Category Badge */}
                <div className="relative h-56 bg-gray-200 overflow-hidden group">
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110">
                    {dish.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  {/* Dish Name */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {dish.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 min-h-[40px]">
                    {dish.description}
                  </p>

                  {/* Price */}
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-3 sm:mb-4">
                    ₹{dish.price.toFixed(2)}
                  </div>

                  {/* View in AR Button */}
                  <button
                    onClick={() => handleViewInAR(dish._id)}
                    className="w-full hero-gradient text-white font-semibold py-3 sm:py-3.5 px-4 sm:px-6 text-sm sm:text-base rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl border-0 group"
                  >
                    <Box className="w-4 h-4 sm:w-5 sm:h-5" />
                    View in AR
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
